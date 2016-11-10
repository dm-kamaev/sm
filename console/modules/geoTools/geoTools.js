'use strict';

var await = require('asyncawait/await'),
    axios = require('axios'),
    lodash = require('lodash');

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
    };

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
     * @param {Array<number>} coords
     * @param {number} searchRadius
     * @return {Array<Object>}
     */
    getMetros(coords, searchRadius) {
        var restriction = this.restriction(searchRadius, coords),
            response = await(axios.get(GEOCODER, {
                params: {
                    geocode: coords.join(','),
                    kind: 'metro',
                    format: 'json',
                    spn: restriction.longitude + ',' + restriction.latitude
                }
            })),
            metros = response
                .data
                .response
                .GeoObjectCollection
                .featureMember
                .map(featureMember => ({
                    name: featureMember.GeoObject.name,
                    coords: featureMember.GeoObject.Point.pos.split(' ')
                }));

        return lodash.uniq(metros, 'name');
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
