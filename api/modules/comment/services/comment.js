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
 * @param {?string} params.username
 * @param {object||null} params.rating
 * @return {object|| Error} - comment instance or error
 */
exports.create = async (function(commentGroupId, params) {
    try {
        var createParams = {
                comment_group_id: commentGroupId,
                text: params.text,
                userType: params.userType,
                username: params.username
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
                comment_group_id: commentGroupId
            }
        } : {};
        console.log(params);
    var comments = await (models.Comment.findAll(params));
    return comments;
});

exports.get = async (function (commentId) {
    var comment = await (models.Comment.findOne({
        where: {
            id: commentId
        }
    }));
    return comment;
});
