'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;

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
 *         "departments": [{
 *             "id": 16,
 *             "name": "Дизайн карьеры",
 *             "address": "ул. Краснопролетарская, д 16., стр. 2",
 *             "phone": "7 (800) 500-64-59",
 *             "updatedAt": "2016-10-17T17:42:42.112Z"
 *         }],
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
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        result = await(services.courseOption.getByCourseId(
            req.params.courseId
        ));
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
 *         "departments": [{
 *             "id": 16,
 *             "name": "Дизайн карьеры",
 *             "address": "ул. Краснопролетарская, д 16., стр. 2",
 *             "phone": "7 (800) 500-64-59",
 *             "updatedAt": "2016-10-17T17:42:42.112Z"
 *         }],
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
        result = await(services.courseOption.getById(req.params.id));
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
 *         "brandId": 16,
 *         "name": "Optima",
 *         "schedule": [{
 *             "startTime": "14:00:00",
 *             "endTime": "15:00:00",
 *             "day": 2
 *         }],
 *         "departments": [{
 *             "name": "Дизайн карьеры",
 *             "address": "ул. Краснопролетарская, д 16., стр. 2",
 *             "phone": "7 (800) 500-64-59",
 *             "description": "Best appartments",
 *             "updatedAt": "2016-10-17T17:42:42.112Z"
 *         }],
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
                id: req.params.courseId,
                brandId: req.body.brandId
            },
            req.body
        ));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {put} /coursebrand/:id Update course brand
 * @apiVersion 1.0.0
 * @apiGroup CourseBrand
 * @apiName updateCourseBrand
 * @apiSuccess {number[]} updatedRowsCount
 * @apiParamExample {json} Request-example
 * {
 *     "name": "Alibra",
 *     "description": "Курсы неиностранных языков"
 * }
 */
controller.update = async(function(req, res) {
    let result;
    try {
        result = await(services.courseBrand.update(req.params.id, req.body));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {delete} /coursebrand/:id Delete course brand
 * @apiVersion 1.0.0
 * @apiGroup CourseBrand
 * @apiName deleteCourseBrand
 */
controller.delete = async(function(req, res) {
    let result;
    try {
        result = await(services.courseBrand.delete(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
