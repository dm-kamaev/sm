var services = require('../../../../app/components/services').all;

var logger =
    require('../../../../app/components/logger/logger').getLogger('app');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {get} api/school/:id/address Get school addresses
 * @apiVersion 0.0.0
 * @apiGroup School
 * @apiName Addresses
 */
exports.getAddresses = async(function(req, res) {
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
exports.getAddress = async(function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.school_id;
        var addressId = req.params.id;
        var address =
                await(services.school.getAddress(schoolId, addressId));
        if (address) {
            result = address;
        } else {
            result = 'School hasn\'t address with id ' + addressId;
        }
    } catch (error) {
        logger.error(error.message);
        result = error;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});
