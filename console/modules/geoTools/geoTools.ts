const axios = require('axios'),
    lodash = require('lodash'),
    GeoPoint = require('geopoint');

const logger = require('../../../app/components/logger/logger.js')
    .getLogger('app');

const GEOCODER = 'http://geocode-maps.yandex.ru/1.x/';

class GeoTools {
    /**
     * ?
     * @type {number}
     */
    static get LT() {
        return 110.574;
    }

    /**
     * ?
     * @type {number}
     */
    static get LO() {
        return 111.320;
    }

    /**
     * Earth radius
     * @type {number}
     */
    static get R() {
        return 6371;
    }

    /**
     * Calculate restriction for point
     * @param {number} lenKM - restriction
     * @param {Array.<number>} coords - point
     * @return {{latitude: number, longitude: number}}
     */
    public restriction(lenKM, coords) {
        return {
            latitude: 1 / GeoTools.LT * lenKM,
            longitude: 1 / (GeoTools.LO * Math.cos(coords[0])) * lenKM
        };
    }


    /**
     * getPointsSouthEastAndNorthWest
     * @param  {Object[]} coords [37.587614, 55.753083]
     * @param  {Number}   radius 3
     * @return {Object}
     * {southWest: {latitude, longitude}, northEast: {latitude, longitude}}
     */
    public getPointsSouthEastAndNorthWest(coords, radius) {
        const latitude = coords[1], longitude = coords[0];
        const coord = new GeoPoint(latitude, longitude);
        // radius search, radius earth, Kilometers
        const squareSearch = coord.boundingCoordinates(radius, null, true);
        const southWest = squareSearch[0];
        const northEast = squareSearch[1];
        return {
            southWest: {
                latitude: southWest.latitude(),
                longitude: southWest.longitude(),
            },
            northEast: {
                latitude: northEast.latitude(),
                longitude: northEast.longitude(),
            },
        };
    }

    /**
     * @param {Array<number>} coords
     * @return {string}
     */
    public async getArea(coords) {
        const response = await axios.get(GEOCODER, {
                params: {
                    geocode: coords.join(','),
                    kind: 'district',
                    format: 'json'
                }
            }),
            areas = response
                .data
                .response
                .GeoObjectCollection
                .featureMember
                .map(featureMember => featureMember.GeoObject.name)
                .filter(name =>
                    ~name.indexOf('район') && // area must contain 'район'
                        !~name.indexOf('микрорайон') &&
                        !~name.indexOf('квартал')
                        // but neither 'микрорайон' or 'квартал'
                );
        let area;

        if (areas.length > 1) {
            throw new Error('Found more than one area: ' + areas);
        } else {
            area = areas[0]
                .replace('район', '')
                .trim();
        }

        return area;
    }

    /**
     * getMetros get metros for point by coordinat
     * @param  {Object[]} coords     [ 37.587614, 55.753083 ]
     * @param  {Number} searchRadius 3
     * @return {Object[]}
     * [ { name: 'метро Смоленская', coords: [ '37.581658', '55.74906' ] }, ]
     */
    public async getMetros(coords, searchRadius) {
        coords = this.toDigitArrayCoord_(coords);
        coords = this.checkSortOrderCoordinate_(coords);
        const square =
            this.getPointsSouthEastAndNorthWest(coords, searchRadius);

        const southWest = square.southWest, northEast = square.northEast;

        const geocode = coords.join(',');
        const bbox =
            southWest.longitude + ',' + southWest.latitude +
            '~' +
            northEast.longitude + ',' + northEast.latitude;

        const responseGeo = await axios.get(GEOCODER, {
            params: {
                geocode,
                kind: 'metro',
                format: 'json',
                bbox,
            }
        });

        let metros = responseGeo
            .data
            .response
            .GeoObjectCollection
            .featureMember;
        metros = metros.map(metro => {
            metro = metro.GeoObject;
            return {
                name: metro.name,
                coords: metro.Point.pos.split(' ')
            };
        });
        const metrosUniq = lodash.uniq(metros, 'name');
        return metrosUniq;
    }


    /**
     * distanceKm
     * @param  {Object} coord1 { latitude, longitude }
     * @param  {Object} coord2 { latitude, longitude }
     * @return {Number}   1200 (kilometres)
     */
    public distanceKm(coord1, coord2) {
        let coordinate1 = Object.assign({}, coord1);
        let coordinate2 = Object.assign({}, coord2);
        coordinate1 = this.toDigitObjectCoord_(coordinate1);
        coordinate2 = this.toDigitObjectCoord_(coordinate2);

        coordinate1 = this.checkOrderCoordinate_(coordinate1);
        coordinate2 = this.checkOrderCoordinate_(coordinate2);

        const latitude1 = coordinate1.latitude;
        const longitude1 = coordinate1.longitude;

        const latitude2 = coordinate2.latitude;
        const longitude2 = coordinate2.longitude;

        coordinate1 = new GeoPoint(latitude1, longitude1);
        coordinate2 = new GeoPoint(latitude2, longitude2);

        // kilometers
        return coordinate1.distanceTo(coordinate2, true);
    }


    /**
     * distanceMetres
     * @param  {Object} coord1 { latitude, longitude }
     * @param  {Object} coord2 { latitude, longitude }
     * @return {Number}   1200 (metres)
     */
    public distanceMetres(coord1, coord2) {
        const distanceKm = this.distanceKm(coord1, coord2);
        return (distanceKm.toFixed(3) * 1000).toFixed(0);
    }

    /**
     * Calculate distance in km
     * @param {Array.<number>} coords1
     * @param {Array.<number>} coords2
     * @return {number}
     */
    public distance(coords1, coords2) {
        const lat1 = this.toRad(coords1[0]);
        const lat2 = this.toRad(coords2[0]);
        const lon1 = this.toRad(coords1[1]);
        const lon2 = this.toRad(coords2[1]);

        const sinLat = Math.sin((lat1 - lat2) / 2);
        const sinLon = Math.sin((lon1 - lon2) / 2);
        const cos = Math.cos(lat1) * Math.cos(lat2);

        const arg = sinLat * sinLat +
                sinLon * sinLon * cos;

        return 2 * GeoTools.R * Math.atan2(Math.sqrt(arg), Math.sqrt(1 - arg));
    }

    /**
     * converts to radians
     * @param {number} value
     * @return {number}
     */
    public toRad(value) {
        /** Converts numeric degrees to radians */
        return value * Math.PI / 180;
    }

    /**
     * toDigitObjectCoord_  coords to digit
     * @param  {Object} coord { latitude, longitude }
     * @return {Object}       { latitude, longitude }
     */
    private toDigitObjectCoord_(coord) {
        const latitude = parseFloat(coord.latitude);
        const longitude = parseFloat(coord.longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            const error =
                'Original coord: ' + JSON.stringify(coord) + '\n' +
                'After parseFloat: ' + JSON.stringify({ latitude, longitude });
            logger.critical(error);
            throw new Error(error).stack;
        }

        return {
            latitude,
            longitude
        };
    }

    /**
     * checkOrderCoordinate_ check sort order coordinates in object
     * !!!ONLY MOSCOW REGION!!!
     * @param  {Object}
     * { latitude: 55.67864138954658, longitude: 37.439709605830046 }
     * @return {Object}
     * { latitude: 37.439709605830046, longitude: 55.67864138954658 }
     */
    private checkOrderCoordinate_(coord) {
        if (coord.latitude < coord.longitude) {
            return {
                latitude: coord.longitude,
                longitude: coord.latitude
            };
        }
        return coord;
    }

    /**
     * checkSortOrderCoordinate_ check sort order coordinates in array
     * !!!ONLY MOSCOW REGION!!!
     * @param  {Object[]}
     * [ 55.67864138954658, 37.439709605830046 ]
     * @return {Object[]}
     * [ 37.439709605830046, 55.67864138954658 ]
     */
    private checkSortOrderCoordinate_(coord) {
        const coordinates = Object.assign([], coord);
        if (coordinates[0] > coordinates[1]) {
            coordinates.reverse();
        }
        return coordinates;
    }

    /**
     * toDigitArrayCoord_  coords to digit
     * @param  {Object} coord [ latitude, longitude ]
     * @return {Object}       [ latitude, longitude ]
     */
    private toDigitArrayCoord_(coord) {
        const latitude = parseFloat(coord[0]);
        const longitude = parseFloat(coord[1]);

        if (isNaN(latitude) || isNaN(longitude)) {
            const error =
                'Original coord: ' + JSON.stringify(coord) + '\n' +
                'After parseFloat: ' + JSON.stringify([ latitude, longitude ]);
            logger.critical(error);
            throw new Error(error).stack;
        }
    }
}

export const geoTools = new GeoTools();
