'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const courseView = require('../views/courseView'),
    searchView = require('../views/searchView'),
    courseTypeView = require('../views/courseTypeView'),
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
            let mapPosition =
                await(services.map.getPositionParams(searchParams));
            result.map = searchView.map(courses, {
                viewType: mapViewType.PIN,
                position: mapPosition
            });
        }
    } catch (error) {
        logger.error(error.message);
        result = error;
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
    let result;
    try {
        let searchParams = searchView.initSearchParams(req.query),
            mapCourses = await(services.course.listMap(searchParams)),
            mapPosition = await(services.map.getPositionParams(searchParams));

        result = {
            map: searchView.map(mapCourses, {
                viewType: mapViewType.PIN,
                position: mapPosition
            })
        };
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
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

/**
 * Get popular course types
 * @api {get} api/course/course-type/popular
 * @apiVersion 0.0.1
 * @apiGroup Course
 * @apiName PopularCourseType
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *                "label": "Математика",
 *                "value":"1"
 *             },
 *             {
 *                "label": "Занимательная математика",
 *                "value":"2"
 *             }
 *     ]
 *
 * @apiError Error (Error 500)
 */
controller.popularCourseType = async(function(req, res) {
    var result;
    try {
        var popularCourseType =
            await(services.courseType.getPopularTypes());

        result =
            courseTypeView.typeFilters(popularCourseType);
    } catch (error) {
        res.status(500);
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * Search for popular course types
 * @api {get} api/course/course-type
 * @apiVersion 0.0.1
 * @apiGroup Course
 * @apiName CourseType
 * @apiParam {Object} searchParams Search params.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "матем"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *                "label": "Математика",
 *                "value":"1"
 *             },
 *             {
 *                "label": "Занимательная математика",
 *                "value":"2"
 *             }
 *     ]
 *
 * @apiError Error (Error 500)
 */
controller.searchCourseType = async(function(req, res) {
    var name,
        result;
    try {
        name = req.query.name || '';

        var courseTypes =
                await(services.courseType.findByName(name));

        result = courseTypeView.typeFilters(courseTypes);
    } catch (error) {
        logger.error(error);
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
