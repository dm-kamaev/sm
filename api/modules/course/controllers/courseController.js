const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const courseView = require('../views/courseView'),
    searchView = require('../views/searchView'),
    services = require('../../../../app/components/services').all;

const mapViewType = require('../../entity/enums/mapViewType');

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

var controller = {};

/**
 * @api {get} api/course/search Search controller
 *     Can send results for map on demand and for results list
 * @apiVersion 0.0.1
 * @apiGroup Course
 * @apiName Search
 * @apiParam {Object} searchParams
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Sky",
 *         "age" 12,
 *         "type": [1],
 *         "cost": [0, 1],
 *         "weekdays": [0, 1],
 *         "time": 1,
 *         "regularity": [0, 2],
 *         "formTraining": 0,
 *         "duration": [0, 1],
 *         "requestMapResults": true
 *     }
 */
controller.search = async(function(req, res) {
    var result;
    try {
        var searchParams = searchView.initSearchParams(req.query),
            courses = await(services.course.list(searchParams, 10)),
            countResults = courses[0] && courses[0].countResults || 0;

        result = {
            list: {
                items: courseView.list(courses),
                countResults: countResults
            }
        };

        if (req.query.requestMapResults) {
            result.map = searchView.map(courses, mapViewType.PIN);
        }
    } catch (error) {
        logger.error(error.message);
        result = JSON.stringify(error);
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/course/search/map Search controller for map
 *     Send all results for request with params
 */
controller.searchMap = async(function(req, res) {
    // var result;
    // try {
    //     var searchParams = searchView.initSearchParams(req.query),
    //         mapCourses = await(services.course.listMap(searchParams));
    //
    //     result = {
    //         map: searchView.map(mapCourses, mapViewType.POINT)
    //     };
    // } catch (error) {
    //     logger.error(error.message);
    //     result = JSON.stringify(error);
    // } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end();
    // }
});

/**
 * @api {get} api/course/search/suggest
 * @apiVersion 0.0.1
 * @apiGroup Course
 * @apiName SuggestSearch
 * @apiParamExample {json} Request-Example:
 *     {
 *       "searchString" : "123"
 *     }
 */
controller.suggestSearch = async(function(req, res) {
    var result;
    try {
        var searchString = req.query.searchString,
            data = await(services.courseSearchData.suggestSearch(searchString));

        result = courseView.suggest(data);
    } catch (error) {
        logger.error(error.message);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
