'use strict';

// author: dm-kamaev
// admin for school

const services = require('../../../../app/components/services').all;
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

const commentView = require('../views/commentView.js');

/**
 * Get all comments for school with user data
 * @api {get} /api/school/:schoolId/comment
 * @apiVersion 0.1.0
 * @apiName get all comments
 * @apiGroup School
 *
 * @apiSuccess {Object[]} comments
 *  [
 *      {
            "text": "Образование\nНе все едино, но очень многие.\n
                     Учителя\nУчителя очень близки с .",
            "author": "Вася",
            "socialId": "32423424",
            "socialType": "vk",
            "category": "Scholar",
            "score": 4.75,
            "updatedAt": "2016-11-21T09:50:32.184Z"
        },
 * ]
 *
 */
exports.getAllComments = async(function(req, res) {
    let result, schoolId = req.params.schoolId;
    try {
        let comments = await(
            services.schoolComment.getAllCommentsWithUser(schoolId)
        );
        if (!comments) {
            result = [];
        } else {
            result = commentView.comments(comments);
        }
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
});
