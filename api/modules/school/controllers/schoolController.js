var services = require.main.require('./app/components/services').all;

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
        params.score = params['score[]']; //TODO придумать чтото с этим
        result = JSON.stringify(
            await(services.school.commentTransaction(schoolId, params))
            );
        console.log(result);
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(result);
    }
});

/**
 * @api {get} api/school/apitest api test
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Apitest
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "text" : "test"
 *     }
 */
exports.yapi = async (function(req, res) {
    var result = '';
    try {
        var params = req.query;
        result = JSON.stringify(await(services.search.advancedSearch(params.text)));
    } catch (e) {
        console.log(e);
        result = JSON.stringify(e);
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(result);
    }
});
/**
 * @api {get} api/school/search Search school
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Search
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "searchParams" : {
 *       	"name": "123", 
 *       	"classes": [1,2,3,4],
 *       	"schoolType": ["Школа", "Лицей"],
 *       	"gia": [1,2],
 *       	"ege": [2,3],
 *       	"olimp": [3,5]	
 *       }
 *     }
 */
exports.search = async (function(req, res) {
    var result = '';
    try {
        var params = req.query;
        result = await(services.search.searchSchool(params));
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



};

/**
 * @api {get} api/school/search/filters Get school type list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName ListSearchFilters
 */
exports.listSearchFilters = async (function(req, res) {
    var result;
    try {
        result = await(services.school.searchFilters());
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} api/school Get school list
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName List
 * @apiSuccess {Object[]} schools Very userful documentation here.
 */
exports.list = async (function(req, res) {
    var schools = await (services.school.list());
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
    var school = await(services.school.viewOne(req.params.id));
    res.header("Content-Type", "text/html; charset=utf-8");
    res.end(JSON.stringify(school));
});
