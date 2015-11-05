var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var commentServices =
    require.main.require('./api/modules/comment/services').commentServices;


exports.create = async (function(commentGroupId, params) {
    var result = '';
    try {
        //var comment = await (models.Comment.create({
        //    comment_group_id: commentGroupId,
        //    text: params.text,
        //    userType: params.userType,
        //    rating: {
        //        score: params["score[]"]
        //    }
        //}, {
        //    include: [ models.Rating ]
        //}));
        var rt = await (models.Rating.create({
            score: params["score[]"],
            comment: {
                comment_group_id: commentGroupId,
                text: params.text,
                userType: params.userType,
                }
            }, {
            include: [ models.Comment ]
        }))
//        console.log(comment);
//        var rating = await(models.Rating.create({
//            score: params["score[]"]
//        }));
//        rating.addComment(comment);
        result = 'success';
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
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
