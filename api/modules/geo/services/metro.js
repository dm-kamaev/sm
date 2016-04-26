var async = require('asyncawait/async');
var await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;

const coordinateView = require('../views/coordinateView');

exports.name = 'metro';

/**
 * Get coordinates for given metro
 * @param {number} searh_data_id
 * @return {Array} metro coordinates
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
    return coordinateView.default(result);
});
