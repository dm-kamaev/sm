'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const services = require('../../../../app/components/services').all,
    departmentView = require('../views/courseDepartmentView'),
    AddressNotFound = require('./errors/AddressNotFound');

const DepartmentExist = require('./errors/DepartmentExist.js');

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
        let brandId = parseInt(req.params.brandId, 10);
        let departments = await(services.courseDepartment.getByBrandId(
            brandId
        ));
        result = departmentView.renderList(departments, brandId);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {get} /coursebrand/:brandId/department/:id Get departments
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
        let brandId = parseInt(req.params.brandId, 10),
            departmentId = parseInt(req.params.id, 10);
        let department = await(services.courseDepartment.getById(
            departmentId
        ));
        result = departmentView.render(department, brandId);
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {post} /coursebrand/:brandId/department Create department
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
    let result,
        brandId = req.params.brandId,
        address = req.body.address;

    let handlerErr_ = function(error) {
        let result;
        if (~error.message.indexOf(address)) {
            logger.error(error);
            let addressNotFound = new AddressNotFound(error.message);
            result = addressNotFound.response;
            res.status(addressNotFound.status);
        } else if (error instanceof DepartmentExist) {
            logger.error(JSON.stringify(error.response));
            res.status(error.status);
            result = error.response;
        } else {
            logger.error(error);
            res.status(500);
            result = error.message;
        }
        return result;
    };

    try {
        const isExistDepartment = await(
            services.courseDepartment.isExistDepartment(brandId, address)
        );
        if (isExistDepartment) { throw new DepartmentExist(brandId, address); }

        result = await(services.courseDepartment.create(
            brandId,
            req.body
        ));
    } catch (error) {
        result = handlerErr_(error);
    } finally {
        res.json(result);
    }
});

/**
 * @api {put} /coursebrand/:brandId/department/:id Update department
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
    let result,
        body = req.body,
        brandId = req.params.brandId,
        departmentId = req.params.id,
        address = (body.address) ? body.address.trim() : '';

    let handlerErr_ = function(error) {
        let result;
        if (~error.message.indexOf(address)) {
            logger.error(error);
            let addressNotFound = new AddressNotFound(error.message);
            result = addressNotFound.response;
            res.status(addressNotFound.status);
        } else if (error instanceof DepartmentExist) {
            logger.error(JSON.stringify(error.response));
            res.status(error.status);
            result = error.response;
        } else {
            logger.error(error);
            res.status(500);
            result = error.message;
        }
        return result;
    };

    try {
        const isExistDepartment = await(
            services.courseDepartment.isExistDepartmentWithOutCurrent(
                brandId,
                departmentId,
                address
            )
        );
        if (isExistDepartment) { throw new DepartmentExist(brandId, address); }
        result = await(services.courseDepartment.update(
            departmentId, body
        ));
    } catch (error) {
        result = handlerErr_(error);
    }
    res.json(result);
});

/**
 * @api {delete} /coursebrand/:id Delete department
 * @apiVersion 1.0.0
 * @apiGroup CourseDepartment
 * @apiName deleteDepartment
 */
controller.delete = async(function(req, res) {
    let result;
    try {
        result = await(services.courseDepartment.delete(req.params.id));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});

module.exports = controller;
