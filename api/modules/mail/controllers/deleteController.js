var services = require('../../../../app/components/services').all;
var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 * @api {delete} api/comment/delete/:id delete comment with that id
 * @apiVersion 0.0.1
 * @apiGroup Comment
 * @apiName Delete
 * @apiParam {string} token
 * @apiParamExample {json} Request-Example:
 *     {
 *         "token": "xxxx-yxx-xxxx"
 *     }
 */
exports.delete = async(function(req, res) {
    var result;
    try {
        if (req.body.token === 'a71b-2d1-123f') {
            result = await(services.comment.delete(req.params.id));
        } else {
            result = [{
                code: 2,
                message: 'Have no access.'
            }];
            res.statusCode = 400;
        }
    } catch (e) {
        result = e.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(JSON.stringify(result));
    }
});
