'use strict';

// author: dm-kamaev
// admin for school

const util = require('util');

import { LegacyController } from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as schoolCommentService} from '../services/schoolComment';
import {commentView} from '../views/commentView';
import {service as schoolAdminService} from '../services/schoolAdminService';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

class CommentAdminController extends Controller {
    constructor() {
        super();
    }

    /**
     * Get comment for school with user data
     * @api {get} /api/school/:schoolId/comment/:id
     * @apiVersion 0.1.0
     * @apiName getAllComments
     * @apiGroup School
     *
     * @apiParam {Number} schoolId schoolId
     * @apiParam {Number} commentId id
     *
     * @apiSuccess {Object}   comment
     * @apiSuccess {Number}   comment.id
     * @apiSuccess {String}   comment.text
     * @apiSuccess {String}   comment.socialId
     * @apiSuccess {String}   comment.socialType
     * @apiSuccess {String}   comment.category
     * @apiSuccess {Number}   comment.score
     * @apiSuccess {String}   comment.updatedAt
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *     "id": 613,
     *     "text": "Образование\nНе все едино, но очень многие.\n
     *              Учителя\nУчителя очень близки с .",
     *      "author": "Вася",
     *      "socialId": "32423424",
     *      "socialType": "vk",
     *      "category": "Scholar",
     *      "score": 4.75,
     *      "updatedAt": "2016-11-21T09:50:32.184Z"
     * }
     */
    public async actionGet(ctx, schoolId: string, id: string) {
        let result = {};
        const comment =
            await schoolCommentService.getCommentWithUser(
                parseInt(schoolId, 10),
                parseInt(id, 10)
            );
        if (comment) {
            result = commentView.comment(comment);
        }
        return result;
    }


    /**
     * Get all comments for school with user data
     * @api {get} /api/school/:schoolId/comment
     * @apiVersion 0.1.0
     * @apiName getAllComments
     * @apiGroup School
     *
     * @apiParam {Number} schoolId schoolId
     *

     * @apiSuccess {Object[]} comments
     * @apiSuccess {Number}   comments.id
     * @apiSuccess {String}   comments.text
     * @apiSuccess {String}   comments.socialId
     * @apiSuccess {String}   comments.socialType
     * @apiSuccess {String}   comments.category
     * @apiSuccess {Number}   comments.score
     * @apiSuccess {String}   comments.updatedAt
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     *  [
     *      {
     *          "id": 613,
     *          "text": "Образование\nНе все едино, но очень многие.\n
     *                    Учителя\nУчителя очень близки с .",
     *          "author": "Вася",
     *          "socialId": "32423424",
     *          "socialType": "vk",
     *          "category": "Scholar",
     *          "score": 4.75,
     *          "updatedAt": "2016-11-21T09:50:32.184Z"
     *      },
     * ]
     */
    public async actionList(actionContext, schoolId: string) {
        let result = [];
        const comments = await
            schoolCommentService.getAllCommentsWithUser(
                parseInt(schoolId, 10)
            );
        if (comments) {
            result = commentView.comments(comments);
        }
        return result;
    }


    /**
     * Edit text comment
     * @api {put} /api/school/:schoolId/comment/:id
     * @apiVersion 0.1.0
     * @apiName editTextComment
     * @apiGroup School
     *
     * @apiParam {Number} schoolId schoolId
     * @apiParam {Number} commentId id
     *
     * @apiParamExample {json} Request-Example:
     * {
     *    "text" : "ОБНОВИЛИ КОММЕНТАРИЙ111",
     * }
     *
     * @apiSuccess {Object}   comment
     * @apiSuccess {Number}   comment.id
     * @apiSuccess {Number}   comment.comment_group_id
     * @apiSuccess {Number}   comment.rating_id
     * @apiSuccess {Number}   comment.user_data_id
     * @apiSuccess {String}   comment.text
     * @apiSuccess {String}   comment.source
     * @apiSuccess {Boolean}  comment.isNoticeSend
     * @apiSuccess {String}   comment.updatedAt
     * @apiSuccess {String}   comment.created_at
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 3147,
     *         "created_at": "2016-12-23T09:28:43.403Z",
     *         "updated_at": "2016-12-23T10:37:52.552Z",
     *         "text": "ОБНОВИЛИ КОММЕНТАРИЙ111",
     *         "comment_group_id": 78,
     *         "rating_id": 3146,
     *         "user_data_id": 3149,
     *         "source": "User",
     *         "isNoticeSend": false
     *     }
     */
    public async actionUpdate(actionContext, schoolId: string, id: string) {
        let result;
        const text: string = actionContext.request.body.text;
        result =
            await schoolCommentService.textEdit(
                parseInt(schoolId, 10),
                parseInt(id, 10),
                text
            );
        return result;
    }

    public async actionCreate(actionContext: any, schoolId: number) {}

    /**
     * Remove comment
     * @api {delete} /api/school/:schoolId/comment/:id
     * @apiVersion 0.1.0
     * @apiName removeComment
     * @apiGroup School
     * @apiParam {Number} schoolId schoolId
     * @apiParam {Number} commentId commentId
     *
     * @apiSuccessExample {Number} Success-Response:
     * 1
     */
    public async actionDelete(actionContext, schoolId: string, id: string) {
        let result: number;
        result =
            await schoolCommentService.removeComment(
                parseInt(schoolId, 10),
                parseInt(id, 10),
            );
        return result;
    }

}
export { CommentAdminController };
