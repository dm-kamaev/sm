'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all;

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let controller = {};

/**
 * @api {get} /coursetype Get types
 * @apiVersion 1.0.0
 * @apiGroup CourseType
 * @apiName getAllTypes
 * @apiSuccess {CourseType[]} coursetypes
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": 1,
 *         "name": "type's name",
 *         "category": "Профориентация",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        result = await(services.courseType.getAll());
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /coursetype/:id Get type
 * @apiVersion 1.0.0
 * @apiGroup CourseType
 * @apiName getType
 * @apiSuccess {CourseType} coursetype
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "name": "type's name",
 *         "category": "Профориентация",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }
 */
controller.get = async(function(req, res) {
    let result;
    try {
        result = await(services.courseType.getById(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /coursetype Create type
 * @apiVersion 1.0.0
 * @apiGroup CourseType
 * @apiName createType
 * @apiSuccess {CourseType} coursetype
 * @apiParamExample {json} Request-example
 * {
 *     "name": "type's name",
 *     "categoryId": 1
 * }
 */
controller.create = async(function(req, res) {
    let result;
    try {
        result = await(services.courseType.create(req.body));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {put} /coursetype/:id Update department
 * @apiVersion 1.0.0
 * @apiGroup CourseType
 * @apiName updateType
 * @apiSuccess {number[]} updatedRowsCount
 * @apiParamExample {json} Request-example
 * {
 *     "name": "Подготовка к ЕГЭ",
 *     "categoryId": 1
 * }
 */
controller.update = async(function(req, res) {
    let result;
    try {
        result = await(services.courseType.update(req.params.id, req.body));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {delete} /coursetype/:id Delete type
 * @apiVersion 1.0.0
 * @apiGroup CourseType
 * @apiName deleteType
 */
controller.delete = async(function(req, res) {
    let result;
    try {
        result = await(services.courseType.delete(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
