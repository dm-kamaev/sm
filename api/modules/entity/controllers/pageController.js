'use strict';

var services = require('../../../../app/components/services').all;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var logger = require('../../../../app/components/logger/logger')
    .getLogger('app');


/**
 * @api {post} api/:entityType/:entityId/views Increment entity views by 1
 * @apiVersion 1.0.0
 * @apiName IncrementViews
 * @apiGroup Entity
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 *
 * @apiErrorExample
 *     HTTP/1.1 404 Not Found
 */
exports.incrementViews = async(function(req, res) {
    try {
        var identity = req.params;
        await(services.page.incrementViews(
            identity.entityId,
            identity.entityType
        ));
        res.status(204);
    } catch (error) {
        logger.error(error.message);
        res.status(404);
    } finally {
        res.send();
    }
});
