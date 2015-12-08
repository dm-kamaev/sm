var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;

exports.name = 'comment';
exports.create = async (function(commentGroupId, params, t) {
    try {
        var createParams = {
                comment_group_id: commentGroupId,
                text: params.text,
                userType: params.userType,
            },
            options = {
                transaction: t,
                include: [{
                    model: models.Rating,
                    as: 'rating'
                }]
             };
        if (params.rating)
            createParams.ratingId = params.rating.id;
        var comment = await (models.Comment.create(
            createParams, options        
        ));
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
