var models = require('../models'),
    Comment = models.Comment;


/**
 * @api {get} /viev Get comment view
 * @apiVersion 0.0.0
 * @apiName Comment
 * @apiGroup Comment
 * @apiParam {Int} id Comment unique ID.
 */
exports.view = function(req, res) {
    Comment.findById(req.params.id).then(function(comment) {
        var html = '404';
        if (comment) {
            html = 'text: '+ comment.text +'<br>';
            html += 'comment_group_id: '+ comment.comment_group_id +'<br>';
        }

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    });
};
