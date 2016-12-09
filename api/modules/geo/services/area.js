'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const models = require('../../../../app/components/models').all;
const geoView = require('../views/geoView');
exports.name = 'area';


/**
 * Creates an Area instance and returns it
 * @param {Object} params
 * @param {string} params.name
 * @return {Area}
 */
exports.create = async(function(params) {
    return await(models.Area.findOrCreate({
        where: {
            name: params.name
        }
    }));
});


/**
 * Updates area with given name
 * @param {string} areaName
 * @param {{
 *     name: (string|undefined),
 *     districtId: (number|undefined)
 * }} data
 * @return {boolean}
 */
exports.updateByName = async(function(areaName, data) {
    return await(models.Area.update(data, {
        where: {
            name: areaName
        }
    }));
});

/**
 * @return {Array<Object>}
 */
exports.getAll = async(function() {
    return await(models.Area.findAll({
        attributes: ['id', 'name']
    }));
});

/**
 * @param {Array<number>} ids
 * @return {Array<Object>}
 */
exports.getByIds = async(function(ids) {
    return ids.length ?
        await(models.Area.findAll({
            attributes: ['id', 'name'],
            where: {
                id: {
                    $in: ids
                }
            }
        })) :
        [];
});

/**
 * Updates area with given name
 * @param {string} areaName
 * @return {Area}
 */
exports.getByName = async(function(areaName) {
    var area = await(models.Area.findOne({
        where: {
            name: areaName
        }
    }));
    return area;
});


/**
 * getCenterCoords for area
 * @param  {Number} areaId
 * @return {Object[]} [ 55.733609, 37.633715 ],
 */
exports.getCenterCoords = function (areaId) {
    return await(models.Area.findOne({
        attributes: ['centerCoords'],
        where: {
            id: areaId
        }
    })).centerCoords;
    // sort order value
    // return geoView.coordinatesDefault(area.centerCoords);
};