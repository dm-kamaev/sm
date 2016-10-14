'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all,
    departmentView = require('../views/courseDepartmentView');

const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

let controller = {};

/**
 * @api {get} /coursebrand/:brandId/department Get departments
 * @apiVersion 1.0.0
 * @apiGroup CourseDepartment
 * @apiName getAllCourseDepartments
 * @apiSuccess {CourseDepartment[]} coursedepartments
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     [{
 *         "id": 1,
 *         "name": "Центр профориентации",
 *         "address": "ул. Валовая, д. 2",
 *         "phone": "+7 (999) 999-99-99",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }]
 */
controller.list = async(function(req, res) {
    let result;
    try {
        let departments = await(services.courseDepartment.getByBrandId(
            req.params.brandId
        ));
        result = departmentView.renderList(departments);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /coursebrand/:brandId/coursedepartment/:id Get departments
 * @apiVersion 1.0.0
 * @apiGroup CourseDepartment
 * @apiName getCourseDepartment
 * @apiSuccess {CourseDepartment} coursedepartment
 * @apiSuccessExample {json} Response-example
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "name": "Центр профориентации",
 *         "address": "ул. Валовая, д. 2",
 *         "phone": "+7 (999) 999-99-99",
 *         "updatedAt": "2016-09-15T15:18:28.395Z"
 *     }
 */
controller.get = async(function(req, res) {
    let result;
    try {
        let department = await(services.courseDepartment.getById(
            req.params.id
        ));
        result = departmentView.render(department);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /coursebrand/:brandId/coursedepartment Create department
 * @apiVersion 1.0.0
 * @apiGroup CourseDepartment
 * @apiName createCourseDepartment
 * @apiSuccess {CourseDepartment} coursedepartment
 * @apiParamExample {json} Request-example
 * {
 *     "name": "Alibra",
 *     "description": "about",
 *     "address": "ул. Валовая, д. 2",
 *     "phone": "+7 (965) 156-33-17"
 * }
 */
controller.create = async(function(req, res) {
    let result;
    try {
        result = await(services.courseDepartment.findOrCreate(
            req.params.brandId,
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
 * @api {put} /coursebrand/:id Update department
 * @apiVersion 1.0.0
 * @apiGroup CourseDepartment
 * @apiName updateCourseDepartment
 * @apiSuccess {number[]} updatedRowsCount
 * @apiParamExample {json} Request-example
 * {
 *     "name": "Alibra",
 *     "description": "about",
 *     "address": "ул. Валовая, д. 2",
 *     "phone": "+7 (965) 156-33-17"
 * }
 */
controller.update = async(function(req, res) {
    let result;
    try {
        result = await(services.courseDepartment.update(
            req.params.id, req.body
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
