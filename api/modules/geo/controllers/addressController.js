var services = require.main.require('./app/components/services').all;

var async = require('asyncawait/async');
var await = require('asyncawait/await');


/**
 * @api {get} api/school/:school_id/address/:id Get addresses
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName GetAddress
 * @apiSuccess {Object} addresses Very userful documentation here.
 */
exports.getAddress = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.id;
        result = await(services.school.getAddress(school_id, address_id));
    } catch (e) {
        console.log(e);
        result = e.message;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:id/address Get addresses
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName GetAddresses
 * @apiSuccess {Object[]} addresses Very userful documentation here.
 */
exports.getAddresses = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.id;
        result = await(services.school.getAddresses(school_id));
    } catch (e) {
        console.log(e);
        result = e.message;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/school/:school_id/address/ Add school address
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName AddAddress
 * @apiParamExample {json} Request-Example:
 *     {
 *         "addressData" : {
 *             "name": "ул. Веткина, 2",
 *             "coords": [55.802275, 37.624876]
 *         }
 *     }
 */
exports.addAddress = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var data = req.body.addressData;
        console.log('school_id _contr', school_id);
        console.log('data _contr', data);
        result = await(services.address.addAddress(school_id, data));
        // console.log('result _contr', result);
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {put} api/school/:school_id/address/:id Update school address
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName UpdateAddress
 * @apiParamExample {json} Request-Example:
 *     {
 *         "addressData" : {
 *             "name": "ул. Веткина, 2",
 *             "coords": [55.802275, 37.624876]
 *         }
 *     }
 */
exports.updateAddress = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.id;
        var data = req.body.addressData;
        var address =
                await(services.school.getAddress(school_id, address_id));
        if (address) {
            result = await(address.update(data));
        }
        else {
            result = "School hasn\'t address with id " + address_id;
        }
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {post} api/school/:school_id/address/:id/department Add department
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName AddDepartment
 * @apiParamExample {json} Request-Example:
 *     {
 *         "departmentData" : {
 *             "name": "Начальное образование",
 *             "stage": "Начальное образование",
 *             "availability": [0, 1, 1]
 *         }
 *     }
 */
exports.addDepartment = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.id;
        var data = req.body.departmentData;
        result = await(services.department.addDepartment(school_id, address_id, data));
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/address/:address_id/department/:id Get department
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName GetDepartment
 */
exports.getDepartment = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.address_id;
        var department_id = req.params.id;
        result = await(services.school.getAddressDepartment(
            school_id,
            address_id,
            department_id
        ));
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/address/:address_id/department Get departments
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName GetDepartments
 */
exports.getDepartments = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.address_id;
        result = await(services.school.getAddressDepartments(
            school_id,
            address_id
        ));
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});

/**
 * @api {put} api/school/:school_id/address/:address_id/department/:id Update department
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName UpdateDepartment
 * @apiParamExample {json} Request-Example:
 *     {
 *         "departmentData" : {
 *             "name": "Основное и среднее",
 *             "stage": "Основное и среднее",
 *             "availability": [0, 1, 1]
 *         }
 *     }
 */
exports.updateDepartment = async(function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.address_id;
        var department_id = req.params.id;
        var data = req.body.departmentData;
        var department = await(services.school.getAddressDepartment(
                school_id,
                address_id,
                department_id
            ));
        if (department) {
            result = await(services.department.update(department_id, data));
        }
        else {
            result = "School hasn\'t department with id " + address_id;
        }
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});
