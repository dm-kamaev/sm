var services = require.main.require('./app/components/services').all;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {post} api/address/list Get addresses
 * @apiVersion 0.0.0
 * @apiGroup Address
 * @apiName List
 * @apiSuccess {Object[]} addresses Very userful documentation here.
 */

exports.list = async (function(req, res) {
    var result;

    try {
        result = await(services.address.list());
    } catch (e) {
        console.log(e);
        result = e.message;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});
