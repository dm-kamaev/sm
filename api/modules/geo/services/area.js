var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
exports.name = 'area';

/**
 * Creates an Area instance and returns it
 * @param {string} name
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
