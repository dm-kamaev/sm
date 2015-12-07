var services = require.main.require('./app/components/services').all;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {get} api/study/subject Get subject list
 * @apiVersion 0.0.0
 * @apiGroup Study
 * @apiName ListSubjects
 */
exports.listSubjects = async (function(req, res) {
    var result;
    try {
        result = await(services.subject.list());
    } catch (e) {
        console.log(e.message);
        result = e;
    } finally {
        res.header("Content-Type", "text/html; charset=utf-8");
        res.end(JSON.stringify(result));
    }
});

