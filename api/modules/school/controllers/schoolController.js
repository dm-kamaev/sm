var schoolServices = require('../services').schoolServices;
var commentServices = require('../../comment/services').commentServices;

var async = require('asyncawait/async');
var await = require('asyncawait/await');



/**
 * @api {post} api/school/:id/comment Create new comment
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName CreateComment
 * @apiParam {Text} text Comment text.
 * @apiParam {String = "Parent", "Graduate", "Scholar"} userType UserType.
 * @apiParam {Int[]} score Array[4] of scores.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "text": "test comment",
 *       "userType": "Parent",
 *       "score": [3,2,1,5]
 *     }
 */
exports.createComment = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
        result = await(schoolServices.comment(schoolId,params));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(result);
    }
});


/**
 * @api {post} api/school/createschool Creates school (TODO)
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName CreateSchool
 * @apiParamExample {json} Request-Example:
 *     {
 *       "params": "would be here",
 *     }
 */
exports.create = function(req, res) {



}

/**
 * @api {get} api/school Get school list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName List
 * @apiSuccess {Object[]} schools Very userful documentation here.
 */
exports.list = async (function(req, res) {
    var schools = await (schoolServices.list());
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(JSON.stringify(schools));
});

/**
 * @api {get} api/school/:id Get school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName View
 * @apiSuccess {Object} schools Very userful documentation here.
 */
exports.view = async (function(req, res) {
    var school = await(schoolServices.get(req.params.id));
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(JSON.stringify(school));
});
