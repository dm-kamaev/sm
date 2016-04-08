var async = require('asyncawait/async');
var await = require('asyncawait/await');
var logger =require('../../../../app/components/logger/logger').getLogger('app');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
>>>>>>> BP-1054

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
                userDataId: params.userDataId,
                isNoticeSend: false
            };
        if (params.rating)
            createParams.ratingId = params.rating.id;
        var comment = await(
            models.Comment.create(createParams)
        );
        return comment;
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
});

exports.list = async (function (commentGroupId) {
    var params = commentGroupId ?
        {
            where: {
                id: commentGroupId
            }
        } : {};

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


/**
 * Return all comments with not send notification state
 * @return {Array<Object>}
 */
exports.getNotSended = async (function () {
    var comments = await (models.Comment.findAll({
        where: {
            isNoticeSend: false
        }
    }));

    return comments;
});

/**
 * Update instance with data
 * @param {Object||number} comment
 * @param {{
 *     text: string,
 *     isNoticeSend: boolean
 * }}
 */
exports.update = async(function (comment, data) {
    var instance = comment;
    if(typeof comment === 'number') {
        instance = await( models.Comment.findOne({
            where: {id: comment}
        }) );
    }

    if (!instance) {
        throw new Error('Can\'t find comment');
    }

    instance.update(data);

    return instance;
});

/**
 * Delete comment by id
 * Deletes comment, related rating, related userData
 * @param {number} id - comment id
 * @return {bool} was deleted
 */
exports.delete = async(function (commentId) {
    var comment = await(models.Comment.findOne({
        where: { id: commentId }
    }));

    var dataPromises = {
        rating: models.Rating.findOne({
            where: { id: comment.ratingId }
        }),
        userData: models.UserData.findOne({
            where: { id: comment.userDataId }
        })
    };
    var data = await(dataPromises);

    comment.destroy();
    data.rating.destroy();
    data.userData.destroy();

    return commentId;
});
