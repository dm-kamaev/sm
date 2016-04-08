var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
var sequelize  = require('../../../../app/components/db');
var sequelizeInclude = require('../../../components/sequelizeInclude');
var Enum = require('../../../components/enum').all;
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
 * @param {number} data.userId
 */
service.create = async(function(data) {
    var params = {
        userType: data.userType,
        yearGraduate: data.yearGraduate ? data.yearGraduate : null,
        classType: data.classType ? data.classType : null,
        key: data.key ? data.key : null,
        username: data.username ? data.username : null,
        userId: data.userId
    };
    return await(models.UserData.create(params));
});

/**
 * Checks if user commented the school
 * @param {number} schoolId
 * @param {string} key - user cookie or poll hash
 * @param {number} userId
 * @return {object|undefined}
 */
service.checkCredentials = async(function(schoolId, key, userId) {
    var commented;
    var relatedRating = await(models.Rating.findAll({
        where: {
            schoolId: schoolId
        }
    }));
    var relatedUserData = await(models.UserData.findAll({
        where: {
            $or: [
                { key: key },
                { userId: userId }
            ]
        }
    }));
    var i = relatedRating.length;
    while (i-- && typeof commented === 'undefined') {
        commented = lodash.find(relatedUserData, function(userData) {
            return userData.id === relatedRating[i].userDataId;
        });
    }

    return commented;
});

/**
 * @param {number} userDataId
 * @param {object} data
 * @return {object}
 */
service.update = async(function(userDataId, data) {
    var userData = await(models.UserData.findById(userDataId));

    await(userData.update(data));

    return userData;
});

/**
 * Sets missing userId's to userData with same key field
 * @param {string} key
 * @param {number} userId
 */
service.actualizeUserIds = async(function(key, userId) {
    var userData = await(models.UserData.findAll({
        where: {
            key: key,
            userId: null
        }
    }));

    if (userData.length) {
        userData.forEach(instance => {
            instance.update({
                userId: userId
            })
        });
    }
});

module.exports = service;
