'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let controller = {};

/**
 * @api {get} /coursebrand Get all course brands
 * @apiVersion 1.0.0
 * @apiGroup CourseBrand
 * @apiName getAllCourseBrands
 * @apiSuccess {CourseBrand[]} coursebrands
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": 1,
 *         "name": "Alibra",
 *         "courseCount": 4,
 *         "departmentCount": 7,
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        result = await(services.courseBrand.getAll());
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /api/coursebrand/search Search over course brands
 * This api must be replaced by suggest api for market-admin
 * @apiVersion 0.1.0
 * @apiName Get brands by params
 * @apiGroup Course brand
 *
 * @apiParam {String} name name of school
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Smart Course"
 *     }
 *
 * @apiSuccess {Object[]} brands      found brands
 * @apiSuccess {Number}   brands.id   id of brand
 * @apiSuccess {String}   brands.name name of brand
 *
 * @apiSuccessExample {json} Response-Example:
 *     HTTP/1.1
 *     [{
 *        "id": 10,
 *        "name": "Smart Course"
 *     }]
 */
controller.search = async(function(req, res) {
    let result;
    try {
        let attributes = req.query;
        result = await(services.courseBrand.getByAttributes(attributes));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /coursebrand/:id Get course brand
 * @apiVersion 1.0.0
 * @apiGroup CourseBrand
 * @apiName getCourseBrand
 * @apiSuccess {CourseBrand} coursebrand
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "name": "Alibra",
 *         "description": "Курсы иностранных языков",
 *         "createdAt": "2016-09-15T15:18:28.395Z",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }
 */
controller.get = async(function(req, res) {
    let result;
    try {
        result = await(services.courseBrand.getById(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /coursebrand Create course brand
 * @apiVersion 1.0.0
 * @apiGroup CourseBrand
 * @apiName createCourseBrand
 * @apiSuccess {CourseBrand} courseBrand
 * @apiParamExample {json} Request-example
 * {
 *     "name": "Alibra",
 *     "description": "Курсы иностранных языков"
 * }
 */
controller.create = async(function(req, res) {
    let result;
    try {
        result = await(services.courseBrand.create(req.body));
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
