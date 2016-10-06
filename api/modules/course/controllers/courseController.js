'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const courseView = require('../views/courseView'),
    searchView = require('../views/searchView'),
    courseTypeView = require('../views/courseTypeView'),
    services = require('../../../../app/components/services').all;

const mapViewType = require('../../entity/enums/mapViewType');

const config = require('../../../../app/config/config.json');

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let controller = {};

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
    let result;
    try {
        let searchParams = searchView.initSearchParams(req.query),
            courses = await(services.course.list(searchParams, 10)),
            countResults = courses[0] && courses[0].countResults || 0,
            aliases = await(services.course.getAliases(courses)),
            aliasedCourses = courseView.joinAliases(
                courses,
                aliases.course,
                aliases.brand
            );

        result = {
            list: {
                items: courseView.list(aliasedCourses),
                countResults: countResults
            }
        };

        if (req.query.requestMapResults) {
            let mapPosition =
                await(services.map.getPositionParams(searchParams));
            result.map = searchView.map(aliasedCourses, {
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
            mapPosition = await(services.map.getPositionParams(searchParams)),
            aliases = await(services.course.getAliases(mapCourses)),
            aliasedMapCourses = courseView.joinAliases(
                mapCourses,
                aliases.course,
                aliases.brand
            );

        result = {
            map: searchView.map(aliasedMapCourses, {
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
    let result;
    try {
        let searchString = req.query.searchString,
            data = await(services.courseSearchData.suggestSearch(searchString)),
            courseAliases = await(services.course.getAliases(data.courses));

        data.courses = courseView.joinAliases(
            data.courses,
            courseAliases.course,
            courseAliases.brand
        );
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
    let result;
    try {
        let popularCourseType =
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
    let name,
        result;
    try {
        name = req.query.name || '';

        let courseTypes =
                await(services.courseType.findByName(name));

        result = courseTypeView.typeFilters(courseTypes);
    } catch (error) {
        logger.error(error);
        result = error.message;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /course/enrollment
 * @apiName EnrollOnCourse
 * @apiGroup Course
 *
 * @apiError {Object[]} ValidationError
 *
 * @apiParam {string} name
 * @apiParam {string} phone
 * @apiParam {string{..300}} [comment]
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Nikolay",
 *         "phone": "+7 (966) 435-36-70"
 *         "comment": "Can my dead son be enrolled on the course? :3"
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
controller.enrollOnCourse = async(function(req, res) {
    let result;
    try {
        let data = await(services.course.enrollOnCourse(req.body)),
            letterData = courseView.letterData(data);

        await(services.mail.sendLetter(letterData, {
            from: 'schools.mel.fm <sender@mel.fm>',
            to: config.courseMail.email
        }));
    } catch (error) {
        logger.error(error.message);
        if (~error.message.indexOf('ValidationError')) {
            res.status(422);
        } else {
            res.status(404);
        }
        result = error.message;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
