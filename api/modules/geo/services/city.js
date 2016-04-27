var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
exports.name = 'city';

/**
 * @return {object} - moscow instance from city table
 */
exports.getMoscow = async(function() {
    var instArr = await (models.City.findOrCreate({
        where: {
            name: 'Москва'
        }
    }));
    return instArr[0];
});

/**
 * Return city center coordinates
 * @return {Array.<number>}
 */
exports.getCenterCoords = function() {
    return [55.755768, 37.617671];
};
