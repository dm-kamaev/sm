'use strict';


class geoTools {
    constructor() {}

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
            latitude: 1 / geoTools.LT * lenKM,
            longitude: 1 / (geoTools.LO * Math.cos(coords[0])) * lenKM
        };
    };

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

        return 2 * geoTools.R * Math.atan2(Math.sqrt(arg), Math.sqrt(1-arg));
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

module.exports = new geoTools();
