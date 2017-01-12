'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;

const mapPositionType = require('../enums/mapPositionType');

let service = {
    name: 'map'
};

/**
 * Create map position params from given search parameters
 * @param {{
 *    metroId: number,
 *    areaId: number,
 *    districtId: number
 * }} searchParams
 * @return {{
 *     center: Array<number>,
 *     type: string
 * }}
 */
service.getPositionParams = async(function(searchParams) {
    let isEmptyParams =
        services.entitySearch.isEmptyParams(searchParams);
    let centerCoords;
    let positionType;

    if (isEmptyParams) {
        positionType = mapPositionType.CITY_CENTER;
        centerCoords = this.getCenterPosition(positionType);
    } else if (searchParams.metroId) {
        positionType = mapPositionType.METRO;
        centerCoords = this.getCenterPosition(
            positionType, searchParams.metroId
        );
    } else if (searchParams.areaId) {
        positionType = mapPositionType.AREA;
        centerCoords = this.getCenterPosition(
            positionType, searchParams.areaId
        );
    } else if (searchParams.districtId) {
        positionType = mapPositionType.DISTRICT;
        centerCoords = this.getCenterPosition(
            positionType, searchParams.districtId
        );
    }

    return await({
        center: centerCoords || null,
        type: positionType || null
    });
});

/**
 * Get coordinates of center of geo object of given type with geoObjectId
 * @param {string} positionType
 * @param {number} opt_geoObjectId
 * @return {Array<number>}
 */
service.getCenterPosition = async(function(positionType, opt_geoObjectId) {
    var positionGetters = {
        [mapPositionType.METRO]: services.metro.getCoords,
        [mapPositionType.DISTRICT]: services.district.getCenterCoords,
        [mapPositionType.AREA]: services.area.getCenterCoords,
        [mapPositionType.CITY_CENTER]: services.city.getCenterCoords
    };

    return positionGetters[positionType] ?
        positionGetters[positionType](opt_geoObjectId) :
        null;
});

module.exports = service;
