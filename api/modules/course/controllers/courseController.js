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
                aliases
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
                aliases
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
            courseAliases
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
            await(services.courseType.getPopularTypes(12));

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
 * @apiParam {string} link
 * @apiParam {Object} department
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Nikolay",
 *         "phone": "+7 (966) 435-36-70"
 *         "comment": "Can my dead son be enrolled on the course? :3",
 *         "link":
 *             "http://courses.www21.lan/course/proforientacija/Pro/RussianEge",
 *         "department": {
 *             "name": "Трубниковский переулок, 11",
 *             "options" : [{
 *                 title: {
 *                     name: 'Раписание',
 *                     key: 'schedule',
 *                     value: 'Среда 18:00–19:50'
 *                 }
 *             }]
 *         }
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "applicationId": 2
 *     }
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

        result = {
            applicationId: data.applicationId
        };
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

/**
 * @api {get} /course Get all courses
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName getAllCourses
 * @apiSuccess {Course[]} courses
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": 1,
 *         "name": "course's name",
 *         "description": "course's description",
 *         "brandId": 2
 *         "brandName": "brand's name",
 *         "categoryId": 1,
 *         "categoryName": "Профоаратциа",
 *         "type": 2,
 *         "typeName": "EGE",
 *         "fullDescription": "course's full description",
 *         "about": "course's about",
 *         "learningOutcome": "course's learning outcome",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        let courses = await(services.course.getAll());
        result = courseView.renderList(courses);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /course/:id Get course
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName getCourse
 * @apiSuccess {Course} course
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     {
 *        "id": 1,
 *         "name": "course's name",
 *         "description": "course's description",
 *         "brandId": 2,
 *         "brandName": "brand's name",
 *         "categoryId": 1,
 *         "categoryName": "Профоаратциа",
 *         "type": 2,
 *         "typeName": "EGE",
 *         "fullDescription": "course's full description",
 *         "about": "course's about",
 *         "learningOutcome": "course's learning outcome",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }
 */
controller.get = async(function(req, res) {
    let result;
    try {
        let course = await(services.course.getById(req.params.id));
        result = courseView.render(course);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /course Get course
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName createCourse
 * @apiSuccess {Course} course
 * @apiParamExample {json} Response-example
 *     {
 *         "brandName": "Maximum",
 *         "type": 2,
 *         "name": "course's name",
 *         "description": "course's description",
 *         "fullDescription": "course's full description",
 *         "learningOutcome": "course's learning outcome",
 *         "about": "course's about"
 *     }
 */
controller.create = async(function(req, res) {
    let result;
    try {
        result = await(services.course.create(req.body));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {put} /course/:id Update course
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName updateCourse
 * @apiSuccess {number[]} updatedRowsCount
 * @apiParamExample {json} Response-example
 *     {
 *         "brandId": 1,
 *         "type": 2,
 *         "name": "course's name",
 *         "description": "course's description",
 *         "fullDescription": "course's full description",
 *         "learningOutcome": "course's learning outcome",
 *         "about": "course's about"
 *     }
 */
controller.update = async(function(req, res) {
    let result;
    try {
        result = await(services.course.update(req.params.id, req.body));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {delete} /course/:id Delete course
 * @apiVersion 1.0.0
 * @apiGroup Course
 * @apiName deleteCourse
 */
controller.delete = async(function(req, res) {
    let result;
    try {
        result = await(services.course.delete(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
