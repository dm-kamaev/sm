'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

let service = {
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
 * @param {number} commentGroupId
 * @param {number} userId
 * @return {Object|undefined}
 */
service.checkCredentials = async(function(commentGroupId, userId) {
    let comments = await(services.comment.getComments(commentGroupId)),
        userComments = comments.filter(comment =>
            comment.userData.userId == userId
        ); // only one comment can be left by a user on the page

    return userComments && userComments[0];
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

module.exports = service;
