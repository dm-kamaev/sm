var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize  = require.main.require('./app/components/db');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var Enum = require.main.require('./api/components/enum').all;
var lodash = require('lodash');
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
 * @param {string} data.username
 */
service.create = async(function(data) {
    var params = {
        userType: data.userType,
        yearGraduate: data.yearGraduate ? data.yearGraduate : null,
        classType: data.classType ? data.classType : null,
        key: data.key ? data.key : null,
        username: data.username ? data.username : null
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
    var commented = false;
    var relatedRating = await(models.Rating.findAll({
        where: {
            schoolId: schoolId
        }
    }));
    var relatedUserData = await(models.UserData.findAll({
        where: {
            key: key
        }
    }));
    var i = relatedRating.length;
    while (i-- && !commented) {
        commented = lodash.some(relatedUserData, function(userData) {
            return userData.id === relatedRating[i].userDataId;
        });
    }
    return commented;
});

module.exports = service;
