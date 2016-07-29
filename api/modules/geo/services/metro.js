var async = require('asyncawait/async');
var await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

const geoView = require('../views/geoView');

exports.name = 'metro';

/**
 * Get coordinates for given metro
 * @param {number} searhDataId
 * @return {Array} metro coordinates
 */
exports.getCoords = async(function(searhDataId) {
    var result;

    if (searhDataId) {
        var metroData = await(models.Metro.findOne({
            attributes: ['coords'],
            where: {id: searhDataId}
        }));

        result = metroData.coords;
    }
    return geoView.coordinatesDefault(result);
});

/**
 * @return {Array<Object>}
 */
exports.getAll = async(function() {
    return await(models.Metro.findAll({
        attributes: ['id', 'name']
    }));
});

/**
 * @param {Array<number>} ids
 * @return {Array<Object>}
 */
exports.getByIds = async(function(ids) {
    return ids.length ?
        await(models.Metro.findAll({
            attributes: ['id', 'name', 'coords'],
            where: {
                id: {
                    $in: ids
                }
            }
        })) :
        [];
});
