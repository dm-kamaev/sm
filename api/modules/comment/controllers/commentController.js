var services = require.main.require('./app/components/services').all,
    commentServices = services.comment;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {get} api/comment/:id Get comment view
 * @apiVersion 0.0.0
 * @apiName View
 * @apiGroup Comment
 * @apiSuccess {Text} text Comment text
 * @apiSuccess {String = "Parent", "Graduate", "Scholar"} userType UserType
 * @apiSuccess {Int[]} score Array[4] of scores.
 * @apiSuccess {Int} comment_group_id Comment group id
 */
exports.view = async(function(req, res) {
    var comment = await(commentServices.get(req.params.id));
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(JSON.stringify(comment));
});

/**
 * @api {get} api/comment Get all the comments
 * @apiVersion 0.0.0
 * @apiGroup Comment
 * @apiName ListAll
 * @apiSuccess {Object[]} comments Very userful documentation here.
 */
/**
 * @api {get} api/comment/group/:id  Get comments for group
 * @apiVersion 0.0.0
 * @apiGroup Comment
 * @apiName List
 * @apiSuccess {Object[]} comments Very userful documentation here.
 */
exports.list = async(function(req, res) {
    var groupID = req.params.id || null;
    var comments = await(commentServices.list(groupID));
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(JSON.stringify(comments));
});


/**
 * @api {post} api/comment/group/:id Create new comment in group
 * @apiVersion 0.0.0
 * @apiGroup Comment
 * @apiName Create
 * @apiParam {Text} text Comment text.
 * @apiParam {String = "Parent", "Graduate", "Scholar"} userType UserType.
 * @apiParam {Int[]} score Array[4] of scores.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "text": "test comment",
 *       "userType": "Parent",
 *       "score": [3, 2, 1, 5]
 *     }
 */
exports.create = async(function(req, res) {
    var groupID = req.params.id;
    var params = req.body;
    var comment = await(commentServices.create(groupID, params));
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(JSON.stringify(comment));
});
