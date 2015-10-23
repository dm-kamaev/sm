var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;

exports.create = async (function(commentGroupId, params) {
    var result = '';
    try {
        await (models.Comment.create({
            comment_group_id: commentGroupId,
            text: params.text,
            score: params["score[]"],
            userType: params.userType
        }));
        result = 'success';
    } catch (e) {
        console.log(e);
        result = e;
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
