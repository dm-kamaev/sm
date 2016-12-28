'use strict';

// author: dm-kamaev
// admin for school

const services = require('../../../../app/components/services').all;
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

const commentView = require('../views/commentView.js');


/**
 * Get comment for school with user data
 * @api {get} /api/school/:schoolId/comment/:commentId
 * @apiVersion 0.1.0
 * @apiName getAllComments
 * @apiGroup School
 *
 * @apiSuccess {Object[]} comments
 * {
       "text": "Образование\nНе все едино, но очень многие.\n
                Учителя\nУчителя очень близки с .",
        "author": "Вася",
        "socialId": "32423424",
        "socialType": "vk",
        "category": "Scholar",
        "score": 4.75,
        "updatedAt": "2016-11-21T09:50:32.184Z"
   }
 *
 */
exports.getComment = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        commentId: number = parseInt(req.params.commentId, 10);
    try {
        let comment =
            await services.schoolComment.getCommentWithUser(schoolId, commentId);
        if (!comment) {
            result = {};
        } else {
            result = commentView.comment(comment);
        }
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
};


/**
 * Get all comments for school with user data
 * @api {get} /api/school/:schoolId/comment
 * @apiVersion 0.1.0
 * @apiName getAllComments
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
exports.getAllComments = async function(req, res) {
    let result, schoolId = parseInt(req.params.schoolId, 10);
    try {
        let comments = await
            services.schoolComment.getAllCommentsWithUser(schoolId);
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
};


/**
 * Edit text comment
 * @api {put} /api/school/:schoolId/comment/:commentId
 * @apiVersion 0.1.0
 * @apiName editTextComment
 * @apiGroup School
 *
 * @apiSuccess {Object[]} comments
 * {
        "id": 3147,
        "created_at": "2016-12-23T09:28:43.403Z",
        "updated_at": "2016-12-23T10:37:52.552Z",
        "text": "ОБНОВИЛИ КОММЕНТАРИЙ111",
        "comment_group_id": 78,
        "rating_id": 3146,
        "user_data_id": 3149,
        "source": "User",
        "isNoticeSend": false
    }
 *
 *
 */
exports.textEdit = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        commentId: number = parseInt(req.params.commentId, 10),
        text: string = req.body.text;
    try {
        result =
            await services.schoolComment.textEdit(schoolId, commentId, text);
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
};


/**
 * Remove comment
 * @api {delete} /api/school/:schoolId/comment/:commentId
 * @apiVersion 0.1.0
 * @apiName removeComment
 * @apiGroup School
 *
 * @apiSuccess {number} success or failed: 1 || 0
 *
 */
exports.removeComment = async function(req, res) {
    let result,
        schoolId: number = parseInt(req.params.schoolId, 10),
        commentId: number = parseInt(req.params.commentId, 10);
    try {
        result =
            await services.schoolComment.removeComment(schoolId, commentId);
    } catch (error) {
        logger.critical(error);
        result = error.message;
    }
    res.json(result);
};
