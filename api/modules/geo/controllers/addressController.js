var services = require('../../../../app/components/services').all;
var schoolView = require('../../school/views/schoolView');

var logger = require('../../../../app/components/logger/logger').getLogger('app');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {get} api/school/:id/address Get school addresses
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Addresses
 */
exports.getAddresses = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id;
        result = await(services.school.getAddresses(schoolId));
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});


/**
 * @api {get} api/school/:school_id/address/:id Get school address
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Address
 */
exports.getAddress = async (function(req, res) {
    var result = '';
    try {
        var school_id = req.params.school_id;
        var address_id = req.params.id;
        var address =
                await(services.school.getAddress(school_id, address_id));
        if (address) {
            result = address;
        }
        else {
            result = 'School hasn\'t address with id ' + address_id;
        }
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});
