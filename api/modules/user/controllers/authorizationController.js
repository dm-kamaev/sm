var async = require('asyncawait/async');
var await = require('asyncawait/await');

var soy = require('../../../../app/components/soy');
var services = require('../../../../app/components/services').all;

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
        var user = await(services.user.getUserByCode({
            code: req.query.code,
            type: req.params.type
        }));

        await(new Promise(function(resolve, reject) {
            req.logIn(user, function (err) {
                err ? reject(err) : req.session.save(resolve);
            });
        }));

        result = soy.render('sm.bAuthorizationModal.Template.complete');
    } catch (error) {
        console.log(error); // TODO: change to logger
        result = soy.render('sm.bAuthorizationModal.Template.error');
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.header('Access-Control-Allow-Origin', '*');
        res.end(result);
    }
});
