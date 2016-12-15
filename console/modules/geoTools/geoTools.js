'use strict';

const await = require('asyncawait/await'),
    axios = require('axios'),
    lodash = require('lodash'),
    GeoPoint = require('geopoint');

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
    restriction(lenKM, coords) {
        return {
            latitude: 1 / GeoTools.LT * lenKM,
            longitude: 1 / (GeoTools.LO * Math.cos(coords[0])) * lenKM
        };
    }


    /**
     * getPointsSouthEastAndNorthWest
     * @param  {Object[]} coords [ 37.587614, 55.753083 ]
     * @param  {Number}   radius 3
     * @return {Object}
     * { southWest: { latitude, longitude }, northEast: { latitude, longitude } }
     */
    getPointsSouthEastAndNorthWest(coords, radius) {
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
                latitude:  northEast.latitude(),
                longitude: northEast.longitude(),
            },
        };
    }

    /**
     * @param {Array<number>} coords
     * @return {string}
     */
    getArea(coords) {
        var response = await(axios.get(GEOCODER, {
                params: {
                    geocode: coords.join(','),
                    kind: 'district',
                    format: 'json'
                }
            })),
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
                ),
            area;

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
    getMetros(coords, searchRadius) {
        const square = this.getPointsSouthEastAndNorthWest(coords, searchRadius);
        const southWest = square.southWest, northEast = square.northEast;

        let geocode = Object.assign([], coords);
        if (/^5/.test(coords[0])) {
            geocode.reverse();
        }
        geocode = geocode.join(',');

        const bbox =
            southWest.latitude+','+southWest.longitude+
            '~'+
            northEast.latitude+','+northEast.longitude;
        const responceGeo = await(axios.get(GEOCODER, {
            params: {
                geocode,
                kind: 'metro',
                format: 'json',
                bbox,
            }
        })).data;
        // console.log(geocode, ' | ', bbox);
        let metros = responceGeo.response.GeoObjectCollection.featureMember;
        metros = metros.map(metro => {
            metro = metro.GeoObject;
            return {
                name: metro.name,
                coords: metro.Point.pos.split(' ')
            };
        });
        let metrosUniq = lodash.uniq(metros, 'name');
        return metrosUniq;
    }


    /**
     * distanceKm
     * @param  {Object} coord1 { latitude, longitude }
     * @param  {Object} coord2 { latitude, longitude }
     * @return {Number}   1200 (kilometres)
     */
    distanceKm(coord1, coord2) {
        console.log(coord1, coord2);
        let coordinate1 = Object.assign({}, coord1);
        let coordinate2 = Object.assign({}, coord2);
        if (/^5/.test(coordinate1.latitude)) {
            let longitude = coordinate1.longitude;
            let latitude = coordinate1.latitude;
            coordinate1.latitude  = longitude;
            coordinate1.longitude = latitude;
        }
        if (/^5/.test(coordinate2.latitude)) {
            let longitude = coordinate2.longitude;
            let latitude = coordinate2.latitude;
            coordinate2.latitude  = longitude;
            coordinate2.longitude = latitude;
        }
        console.log(coordinate1, coordinate2);
        coordinate1 = new GeoPoint(
            parseFloat(coordinate1.latitude),
            parseFloat(coordinate1.longitude)
        );
        coordinate2 = new GeoPoint(
            parseFloat(coordinate2.latitude),
            parseFloat(coordinate2.longitude)
        );
        //kilometers
        return coordinate1.distanceTo(coordinate2, true);
    }


    /**
     * Calculate distance in km
     * @param {Array.<number>} coords1
     * @param {Array.<number>} coords2
     * @return {number}
     */
    distance(coords1, coords2) {
        var lat1 = this.toRad(coords1[0]);
        var lat2 = this.toRad(coords2[0]);
        var lon1 = this.toRad(coords1[1]);
        var lon2 = this.toRad(coords2[1]);

        var sinLat = Math.sin((lat1 - lat2) / 2);
        var sinLon = Math.sin((lon1 - lon2) / 2);
        var cos = Math.cos(lat1) * Math.cos(lat2);

        var arg = sinLat * sinLat +
                sinLon * sinLon * cos;

        return 2 * GeoTools.R * Math.atan2(Math.sqrt(arg), Math.sqrt(1 - arg));
    };

    /**
     * converts to radians
     * @param {number} value
     * @return {number}
     */
    toRad(value) {
        /** Converts numeric degrees to radians */
        return value * Math.PI / 180;
    }
}

module.exports = new GeoTools();
