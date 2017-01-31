const services = require('../../../../app/components/services').all;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const mailToken = require('../../../../app/config/mailToken.json');

/**
 * @api {delete} api/comment/delete/:id delete comment with that id
 * @apiVersion 0.0.1
 * @apiGroup Comment
 * @apiName Delete
 * @apiParam {string} HTTP-HEADER mail-token "mail-token": "xxxx-yxx-xxxx"
 */
exports.delete = async(function(req, res) {
    var result;
    try {
        const headers = req.headers;
        if (headers[mailToken.name] === mailToken.token) {
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
