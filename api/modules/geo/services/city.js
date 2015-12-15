var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
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
