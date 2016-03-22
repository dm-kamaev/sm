var async = require('asyncawait/async');
var await = require('asyncawait/await');

var soy = require('../../../../app/components/soy');
var services = require.main.require('./app/components/services').all;

/**
 * @api {get} /authorize/:type
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiName authorize
 * @apiSuccess {object} user
 * @apiParamExample {json} Request-Example:
 *     {
 *         "type": "vk",
 *         "code": "46543215486521"
 *     }
 */
exports.authorize = async(function(req, res) {
    var result;
    try {
        var userUrl = await(services.authorization.getUserUrl({
            code: req.query.code,
            type: req.params.type
        }));

        result = soy.render('sm.bAuthorizationModal.Template.modal');

        res.cookie('session_id', 'a34f-' +
            userUrl.replace(/\D/g, '') + 'fe23');
    } catch (error) {
        result = error.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.header('Access-Control-Allow-Origin', '*');
        res.end(result);
    }
});
