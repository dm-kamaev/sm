var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
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
