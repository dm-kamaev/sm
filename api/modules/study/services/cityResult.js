var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;

exports.name = 'cityResult';

/**
 * Getter for all
 */
exports.getAll = async(function() {
    return await(models.CityResult.findAll());
});
