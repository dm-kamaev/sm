var async = require('asyncawait/async');
var await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;

exports.name = 'metro';

/**
 * Get coords metro or area
 * @param {number} searh_data_id
 * @return {Array} coords metro or area
 */
exports.getCoords = async(function(searh_data_id) {
    var result;

    if (searh_data_id) {
        var metroData = await(models.Metro.findOne({
            attributes: ['coords'],
            where: {id: searh_data_id}
        }));

        result = metroData.coords;
    }
    return result;
});