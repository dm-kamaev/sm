var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;

exports.name = 'comment';
exports.create = async (function(commentGroupId, params) {
    var result = '';
    try {
        var comment = await (models.Comment.create({
            comment_group_id: commentGroupId,
            text: params.text,
            userType: params.userType
        }, {
            include: [{
                model: models.Rating,
                as: 'rating'
            }]
        }));
        console.log('comment', JSON.stringify(comment).blue);
        if (params.rating) {
            //comment.setRating(params.rating)
            params.rating.setComment(comment);
        }
        result = 'success';
    } catch (e) {
        console.log(e);
        result = e.message;
    } finally {
        return result;
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
