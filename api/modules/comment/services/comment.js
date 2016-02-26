var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;

exports.name = 'comment';

/**
 * @param {number} commentGroupId
 * @param {object} params
 * @param {string} params.text
 * @param {string} params.userType
 * @param {object||null} params.rating
 * @param {number} params.userDataId
 * @return {object|| Error} - comment instance or error
 */
exports.create = async (function(commentGroupId, params) {
    try {
        var createParams = {
                comment_group_id: commentGroupId,
                text: params.text,
                userDataId: params.userDataId
            };
        if (params.rating)
            createParams.ratingId = params.rating.id;
        var comment = await(
            models.Comment.create(createParams)
        );
        return comment;
    } catch (e) {
        console.log(e.message);
        throw e;
    }
});

exports.list = async (function (commentGroupId) {
    var params = commentGroupId ?
        {
            where: {
                id: commentGroupId
            }
        } : {};
        console.log(params);
    var comments = await (models.Comment.findAll(params));
    return comments;
});

/**
 * @param {number} commentGroupId
 * @return {object} commentGroup with comments with rating and userData
 */
exports.getComments = async(function(commentGroupId) {
    var include =  [
        {
            model: models.Rating,
            as: 'rating'
        },
        {
            model: models.UserData,
            as: 'userData'
        }
    ];

    return models.Comment.findAll({
        where: {
            'comment_group_id': commentGroupId
        },
        include: include
    });
});

exports.get = async (function (commentId) {
    var comment = await (models.Comment.findOne({
        where: {
            id: commentId
        }
    }));
    return comment;
});
