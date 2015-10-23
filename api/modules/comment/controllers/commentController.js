var commentServices = require('../services').commentServices;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {get} /viev Get comment view
 * @apiVersion 0.0.0
 * @apiName Comment
 * @apiGroup Comment
 * @apiParam {Int} id Comment unique ID.
 */
exports.view = function(req, res) {
    var comment = commentServices.get(req.params.id);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(comment);
};

/**
 * @api {get} school/:id/comments Gets comments in simple list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName viewComments
 */
exports.list = function(req, res) {
    var groupID = req.params.id;
    var comments = commentServices.list(groupID, params);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end (comments);
}


/**
 * @api {get} school/:id/comments Gets comments in simple list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName viewComments
 */
exports.create = function(req, res) {
    var groupID = req.params.id;
    var params = req.body
    var comment = commentServices.create(groupID, params);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end (comment);
}
