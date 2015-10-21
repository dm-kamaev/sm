var models = require('../models'),
    Comment = models.Comment;

var async = require('asyncawait/async');
var await = require('asyncawait/await');


    exports.createComment = async (function  (instance, commentText) {
        if (instance.comment_group_id == null) {
            var newCommentGroup = await (CommentGroup.create());
            await (instance.update({comment_group_id: newCommentGroup.id}))
        }

        var commentGroupId = instance.comment_group_id;

        if (commentGroupId == null){
            console.log('CRITICAL ERROR');
            process.exit();
        }
        //console.log(instance);

        await (Comment.create({
            comment_group_id: commentGroupId,
            text: commentText
        }));
    });

    exports.view = function(req, res) {
        Comment.findById(req.params.id).then(function(comment) {
        var html = '';
        if (comment == null)
            html = "404";
        else {
            html += 'text: '+ comment.text +'<br>';
            html += 'comment_group_id: '+ comment.comment_group_id +'<br>';
        }

            res.header("Content-Type", "text/html; charset=utf-8");
            res.end(html);
        });
    };
