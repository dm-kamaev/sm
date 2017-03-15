import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programCommentService}
    from '../services/programComment';

import {programCommentView} from '../views/programCommentView';
const userService = require('../../user/services/user');

import {ProgramNotFound} from './errors/ProgramNotFound';
import {CommentNotBelongsToProgram} from './errors/CommentNotBelongsToProgram';
import {
    ProgramCommentNotFound
} from './errors/ProgramCommentNotFound';

class AdminProgramCommentController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramCommentNotFoundException: ProgramCommentNotFound,
            ProgramNotFoundException: ProgramNotFound,
            CommentNotBelongsToProgramException:
                CommentNotBelongsToProgram
        };
    }

    /**
     * @apiDefine ProgramNotFoundError
     * @apiError (404) ProgramNotFound Program not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "ProgramNotFound",
     *           "message": "Program with given id not found"
     *      }
     */

    /**
     * @apiDefine ProgramCommentNotFoundError
     * @apiError (404) ProgramCommentNotFound University comment not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "ProgramCommentNotFound",
     *           "message": "Program comment with id = 20 not found"
     *      }
     */

    /**
     * @apiDefine CommentNotBelongsToProgramError
     * @apiError (422) ProgramCommentNotBelongsToProgram
     *     University comment not belongs to program
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 422 Not Found
     *      {
     *           "code": "CommentNotBelongsToProgram",
     *           "message":
     *               "Program comment with id = 20
     *                not belongs to program with id = 126"
     *      }
     */

    /**
     * @api {get} /api/admin/program/:programId/comment
     *     Get university comments by program
     * @apiVersion 1.0.0
     * @apiGroup AdminProgramComment
     * @apiName GetAdminProgramComments
     *
     * @apiSuccess ProgramComment            {Object[]}
     *     Requested university comment object
     * @apiSuccess ProgramComment.socialId   {Number}
     *     Id in social network of registered user, who placed comment
     * @apiSuccess ProgramComment.socialType {String="vk", "fb"}
     *     Type of social network of registered user, who placed comment
     * @apiSuccess ProgramComment.userType   {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess ProgramComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess ProgramComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess ProgramComment.pros       {String}
     *     Pros of study in university
     * @apiSuccess ProgramComment.cons       {String}
     *     Cons of study in university
     * @apiSuccess ProgramComment.advice     {String}
     *     Advice for enrollees
     * @apiSuccess ProgramComment.totalScore {Number}
     *     Total score of comment, calculated from score
     * @apiSuccess ProgramComment.updatedAt  {Date}
     *     Date of creation of updating of comment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "socialId": 234561,
     *         "socialType": "vk",
     *         "userType": "Student",
     *         "grade": 4,
     *         "yearGraduate": 2016,
     *         "pros": 'Очень хороший университет',
     *         "cons": 'Общежитие отвратительное',
     *         "advice": 'Поступайте все!',
     *         "totalScore": 4.8,
     *         "updatedAt": "2016-09-15T15:18:28.395Z"
     *     }]
     *
     */
    public async actionList(actionContext: any, programId: string) {
        const comments =
                await programCommentService.getAllByProgramIdWithFullData(
                    +programId
                ),
            userId = comments.map(comment => comment.userData.userId),
            users = await userService.getUserByIds(userId);
        return programCommentView.adminListRender(comments, users);
    }

    /**
     * @api {get} /api/admin/program/:programId/comment/:commentId
     *     Get university comment by program id an comment id
     * @apiVersion 1.0.0
     * @apiGroup AdminProgramComment
     * @apiName GetAdminProgramComment
     *
     * @apiSuccess ProgramComment            {Object}
     *     Requested university comment object
     * @apiSuccess ProgramComment.socialId   {Number}
     *     Id in social network of registered user, who placed comment
     * @apiSuccess ProgramComment.socialType {String="vk", "fb"}
     *     Type of social network of registered user, who placed comment
     * @apiSuccess ProgramComment.userType   {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess ProgramComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess ProgramComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess ProgramComment.pros       {String}
     *     Pros of study in university
     * @apiSuccess ProgramComment.cons       {String}
     *     Cons of study in university
     * @apiSuccess ProgramComment.advice     {String}
     *     Advice for enrollees
     * @apiSuccess ProgramComment.totalScore {Number}
     *     Total score of comment, calculated from score
     * @apiSuccess ProgramComment.updatedAt  {Date}
     *     Date of creation of updating of comment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200
     *     {
     *         "socialId": 234561,
     *         "socialType": "vk",
     *         "userType": "Student",
     *         "grade": 4,
     *         "yearGraduate": 2016,
     *         "pros": 'Очень хороший университет',
     *         "cons": 'Общежитие отвратительное',
     *         "advice": 'Поступайте все!',
     *         "totalScore": 4.8,
     *         "updatedAt": "2016-09-15T15:18:28.395Z"
     *     }
     *
     * @apiUse ProgramNotFoundError
     * @apiUse ProgramCommentNotFoundError
     * @apiUse CommentNotBelongsToProgramError
     */
    public async actionGet(
            actionContext: any, programId: string, commentId: string) {
        const comment = await programCommentService.getOneWithFullData(
                +programId,
                +commentId
            ),
            user = await userService.getUserById(comment.userData.userId);

        return programCommentView.adminRender(comment, user);
    }

    /**
     * @api {post} /api/admin/program/:programId/comment
     * @apiGroup AdminProgramComment
     * @apiVersion 1.0.0
     */
    public async actionCreate(actionContext: any, programId: string) {
        actionContext.status = 404;
    }

    /**
     * @api {put} /api/admin/program/:programId/comment/:commentId
     *     Update only text in comment
     * @apiVersion 1.0.0
     * @apiGroup AdminProgramComment
     * @apiName Update university comment
     *
     * @apiParam {Object} ProgramComment
     * @apiParam {String} ProgramComment.pros
     * @apiParam {String} ProgramComment.cons
     * @apiParam {String} ProgramComment.advice
     *
     * @apiParamExample Request-Example:
     *     {
     *           "advice": 'Поступайте все!',
     *           "pros": 'Очень хороший университет',
     *           "cons": 'Общежитие отвратительное'
     *      }
     *
     * @apiUse ProgramNotFoundError
     * @apiUse ProgramCommentNotFoundError
     * @apiUse CommentNotBelongsToProgramError
     */
    public async actionUpdate(
        actionContext: any, programId: number, commentId: number) {
        const data = actionContext.data;
        return await programCommentService.update(
            +programId,
            +commentId,
            {
                advice: data.advice,
                pros: data.pros,
                cons: data.cons
            }
        );
    }

    /**
     * @api {delete} /api/admin/program/:programId/comment/:commentId
     *     Delete comment with user data and rating (if exists)
     * @apiVersion 1.0.0
     * @apiGroup AdminProgramComment
     * @apiName Delete comment
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 203 OK
     *
     * @apiUse ProgramNotFoundError
     * @apiUse ProgramCommentNotFoundError
     * @apiUse CommentNotBelongsToProgramError
     */
    public async actionDelete(
        actionContext: any, programId: string, commentId: string) {
        return await programCommentService.fullDelete(
            +programId, +commentId
        );
    }
}

export {AdminProgramCommentController};
