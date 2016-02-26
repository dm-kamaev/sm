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
 * @param {string} data.key
 */
service.create = async(function(data) {
    var params = {
        userType: data.userType,
        yearGraduate: data.yearGraduate ? data.yearGraduate : null,
        classType: data.classType ? data.classType : null,
        key: data.key ? data.key : null
    };
    return await(models.UserData.create(params));
});

/**
 * Checks if user commented the school
 * @param {number} schoolId
 * @param {string} key - user cookie
 * @return {bool}
 */
service.checkKey = async(function(schoolId, key) {
    var foundKeyOnRating = await(models.Rating.findOne({
        where: { schoolId: schoolId }
    }));
    return foundKeyOnRating ? true : false;
});

module.exports = service;
