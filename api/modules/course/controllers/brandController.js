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
 *         "description": "Курсы иностранных языков",
 *         "createdAt": "2016-09-15T15:18:28.395Z",
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
 * @api {get} /coursebrand/:id Get course brand
 * @apiVersion 1.0.0
 * @apiGroup CourseBrand
 * @apiName getCourseBrand
 * @apiSuccess {CourseBrand} coursebrands
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
 * @api {post} /coursebrand/:id Create course brand
 * @apiVersion 1.0.0
 * @apiGroup CourseBrand
 * @apiName updateCourseBrand
 * @apiSuccess {CourseBrand} courseBrand
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

module.exports = controller;
