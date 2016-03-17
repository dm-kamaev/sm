var async = require('asyncawait/async');
var await = require('asyncawait/await');

var services = require.main.require('./app/components/services').all;

/**
 * @api {post} api/user-feedback
 * @apiVersion 0.0.0
 * @apiGroup Feedback
 * @apiName processUserFeedback
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Test user",
 *         "header": "Сообщить о неточности",
 *         "email": "test@mel.fm",
 *         "theme": "Другие данные",
 *         "text": "Номер школы не совпадает с действительностью",
 *         "url": "http://schools.mel.fm/school/licej-1553-im-v-i-vernadskogo"
 *     }
 */
exports.processUserFeedback = async(function(req, res) {
    var result;
    try {
        var params = req.body;
        services.feedback.sendFeedback(params);
    } catch(e) {
        result = e.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    }
});