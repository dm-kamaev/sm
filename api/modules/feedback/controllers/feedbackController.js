var async = require('asyncawait/async');

var services = require('../../../../app/components/services').all;


var feedbackView = require('../views/feedbackView');

const REFERER_HEADER = 'referer';

/**
 * @api {post} api/user-feedback?type=opinion
 * @apiVersion 0.0.0
 * @apiGroup Feedback
 * @apiName processUserFeedback
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "Test user",
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

        params.type = req.query.type;
        if (!params.url) {
            params.url = req.get(REFERER_HEADER);
        }

        if ((params.type === 'opinion' || params.type === 'mistake') &&
            params.name.trim() &&
            params.email.trim() &&
            params.text.trim() &&
            params.theme.trim()) {
            var letter = {
                theme: feedbackView.getLetterTheme(params),
                content: feedbackView.getLetterBody(params)
            };

            services.feedback.sendFeedback(letter);
        } else {
            res.status(400);
        }
    } catch (e) {
        res.status(404);
        result = e.message;
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    }
});
