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
