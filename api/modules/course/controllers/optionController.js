'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all,
    courseOptionView = require('../views/courseOptionView'),
    ScheduleFormatError = require('./errors/ScheduleFormatError');

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let controller = {};

/**
 * @api {get} /course/:courseId/option Get all course options
 * @apiVersion 1.0.0
 * @apiGroup CourseOption
 * @apiName getAllCourseOptions
 * @apiSuccess {CourseOption[]} courseoptions
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": 1,
 *         "name": "Optima",
 *         "schedule": [{
 *             "id": 12,
 *             "courseOptionId": 1,
 *             "startTime": "14:00:00",
 *             "endTime": "15:00:00",
 *             "day": 2
 *         }],
 *         "departments": [16],
 *         "costPerHour": 2300,
 *         "online": false,
 *         "age": [12, 13, 14],
 *         "maxGroupSize": 20,
 *         "lengthWeeks": 14,
 *         "nativeSpeaker": false,
 *         "startDate": "2016-10-14T21:00:00.000Z",
 *         "totalCost": "60000",
 *         "duration": "3",
 *         "isActive": true,
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        let courseOptions = await(services.courseOption.getByCourseId(
            req.params.courseId
        ));
        result = courseOptionView.renderList(courseOptions);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /course/:courseId/option/:id Get course option
 * @apiVersion 1.0.0
 * @apiGroup CourseOption
 * @apiName getCourseOption
 * @apiSuccess {CourseOption} courseoption
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "name": "Optima",
 *         "schedule": [{
 *             "id": 12,
 *             "courseOptionId": 1,
 *             "startTime": "14:00:00",
 *             "endTime": "15:00:00",
 *             "day": 2
 *         }],
 *         "departments": [16],
 *         "costPerHour": 2300,
 *         "online": false,
 *         "age": [12, 13, 14],
 *         "maxGroupSize": 20,
 *         "lengthWeeks": 14,
 *         "nativeSpeaker": false,
 *         "startDate": "2016-10-14T21:00:00.000Z",
 *         "totalCost": "60000",
 *         "duration": "3",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }
 */
controller.get = async(function(req, res) {
    let result;
    try {
        let courseOption = await(services.courseOption.getById(req.params.id));
        result = courseOptionView.render(courseOption);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /course/:courseId/option/:id Create course option
 * @apiVersion 1.0.0
 * @apiGroup CourseOption
 * @apiName createCourseOption
 * @apiSuccess {CourseOption} courseOption
 * @apiParamExample {json} Request-example
 *     {
 *         "name": "Optima",
 *         "schedule": "Вт, 16:30, 18:45; Чт, 17:30, 19:45",
 *         "departments": [1, 2, 3],
 *         "costPerHour": 2300,
 *         "online": false,
 *         "age": [12, 13, 14],
 *         "maxGroupSize": 20,
 *         "lengthWeeks": 14,
 *         "nativeSpeaker": false,
 *         "startDate": "2016-10-14T21:00:00.000Z",
 *         "totalCost": "60000",
 *         "duration": "3",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }
 */
controller.create = async(function(req, res) {
    let result;
    try {
        result = await(services.courseOption.create(
            {
                id: req.params.courseId
            },
            req.body
        ));
    } catch (error) {
        if (error instanceof ScheduleFormatError) {
            res.status(error.status);
            result = error.response;
        } else {
            logger.error(error.message);
            result = error;
        }
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {put} /course/:courseId/option/:id Update course option
 * @apiVersion 1.0.0
 * @apiGroup CourseOption
 * @apiName updateCourseOption
 * @apiSuccess {number[]} updatedRowsCount
 * @apiParamExample {json} Request-example
 *     {
 *         "name": "Optimaximus",
 *         "schedule": [{
 *             "startTime": "14:00:00",
 *             "endTime": "15:00:00",
 *             "day": 2
 *         }],
 *         "departments": [1, 2, 3],
 *         "costPerHour": 2300,
 *         "online": false,
 *         "age": [12, 13, 14],
 *         "maxGroupSize": 20,
 *         "lengthWeeks": 14,
 *         "nativeSpeaker": false,
 *         "startDate": "2016-10-14T21:00:00.000Z",
 *         "totalCost": "60000",
 *         "duration": "3",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 */
controller.update = async(function(req, res) {
    let result;
    try {
        result = await(services.courseOption.update(req.params.id, req.body));
    } catch (error) {
        if (error instanceof ScheduleFormatError) {
            res.status(error.status);
            result = error.response;
        } else {
            logger.error(error);
            result = error.message;
            res.status(400);
        }
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {delete} /course/:courseId/option/:id Delete course option
 * @apiVersion 1.0.0
 * @apiGroup CourseOption
 * @apiName deleteCourseOption
 */
controller.delete = async(function(req, res) {
    let result;
    try {
        result = await(services.courseOption.delete(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
