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
 *         "name": "course's name"
 *         "isActive": true,
 *         "courseCount": 14,
 *         "filters": ["age", "costPerHour"],
 *         "updatedAt": "2016-10-19T15:56:35.234Z"
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        result = await(services.courseCategory.getAll());
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /coursecategory/:id Get category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName getCategory
 * @apiSuccess {CourseCategory} coursecategory
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "name": "Профориентация",
 *         "filters": null,
 *         "isActive": true,
 *         "created_at": "2016-10-19T15:56:35.234Z",
 *         "updated_at": "2016-10-19T15:56:35.234Z"
 *     }
 */
controller.get = async(function(req, res) {
    let result;
    try {
        result = await(services.courseCategory.getById(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /coursecategory Create course category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName createCategory
 * @apiSuccess {CourseCategory} courseCategory
 * @apiParamExample {json} Response-example
 *     {
 *         "name": "Профориентация",
 *         "isActive": true,
 *         "filters": ["age", "costPerHour"]
 *     }
 */
controller.create = async(function(req, res) {
    let result;
    try {
        result = await(services.courseCategory.create(req.body));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {put} /coursecategory/:id Update category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName updateCategory
 * @apiSuccess {number[]} updatedRowsCount
 * @apiParamExample {json} Response-example
 *     {
 *         "name": "Профориентация",
 *         "isActive": true,
 *         "filters": ["age", "costPerHour"]
 *     }
 */
controller.update = async(function(req, res) {
    let result;
    try {
        result = await(services.courseCategory.update(req.params.id, req.body));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {delete} /coursecategory/:id Delete category
 * @apiVersion 1.0.0
 * @apiGroup CourseCategory
 * @apiName deleteCategory
 */
controller.delete = async(function(req, res) {
    let result;
    try {
        result = await(services.courseCategory.delete(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
