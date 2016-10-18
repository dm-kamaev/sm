'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let controller = {};

/**
 * @api {get} /coursecategory Get all categories
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName getAllCategories
 * @apiSuccess {CourseCategory[]} courseCategories
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": 1,
 *         "name": "course's name",
 *         "description": "course's description",
 *         "brandName": "brand's name",
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
 *         "brandName": "brand's name",
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
 *         "brandId": 1,
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
