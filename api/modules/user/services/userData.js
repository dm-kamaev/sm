var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize  = require.main.require('./app/components/db');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var Enum = require.main.require('./api/components/enum').all;
var service = {
    name: 'userData'
};

/**
 * Create user data
 * @param {Object} data
 * @param {Enum} data.userType
 * @param {number} data.yearGraduate
 * @param {number} data.classType
 */
service.create = async(function(data) {
    var params = {

    }


    return await(models.UserData.create(params));
});

module.exports = service;