import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {service as universityCommentService}
    from '../services/universityComment';

import {universityCommentView} from '../views/universityCommentView';
const userService = require('../../user/services/user');

import {ProgramNotFound} from './errors/ProgramNotFound';
import {UniversityCommentNotFound} from './errors/UniversityCommentNotFound';
import {
    UniversityCommentNotBelongsToProgram
} from './errors/UniversityCommentNotBelongsToProgram';

class AdminUniversityCommentController extends Controller {
    constructor() {
        super();

        this.errors = {

            UniversityCommentNotFoundException: UniversityCommentNotFound,
            ProgramNotFoundException: ProgramNotFound,
            UniversityCommentNotBelongsToProgramException:
                UniversityCommentNotBelongsToProgram
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
     * @apiDefine UniversityCommentNotFoundError
     * @apiError (404) UniversityCommentNotFound University comment not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "UniversityCommentNotFound",
     *           "message": "University comment with given id not found"
     *      }
     */

    /**
     * @apiDefine UniversityCommentNotBelongsToProgramError
     * @apiError (422) UniversityCommentNotBelongsToProgram
     *     University comment not belongs to program
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 422 Not Found
     *      {
     *           "code": "UniversityCommentNotBelongsToProgram",
     *           "message":
     *               "University comment with given id not not belongs
     *               to program"
     *      }
     */

    /**
     * @api {get} /api/admin/program/:programId/comment
     *     Get university comments by program
     * @apiVersion 1.0.0
     * @apiGroup AdminUniversityComment
     * @apiName GetAdminUniversityComments
     *
     * @apiSuccess universityComment            {Object[]}
     *     Requested university comment object
     * @apiSuccess universityComment.socialId   {Number}
     *     Id in social network of registered user, who placed comment
     * @apiSuccess universityComment.socialType {String="vk", "fb"}
     *     Type of social network of registered user, who placed comment
     * @apiSuccess universityComment.userType   {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess universityComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess universityComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess universityComment.pros       {String}
     *     Pros of study in university
     * @apiSuccess universityComment.cons       {String}
     *     Cons of study in university
     * @apiSuccess universityComment.advice     {String}
     *     Advice for enrollees
     * @apiSuccess universityComment.totalScore {Number}
     *     Total score of comment, calculated from score
     * @apiSuccess universityComment.updatedAt  {Date}
     *     Date of creation of updating of comment
     *
     * @apiSuccessExample Success-Response:
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
                await universityCommentService.getAllByProgramIdWithFullData(
                    +programId
                ),
            userId = comments.map(comment => comment.userData.userId),
            users = await userService.getUserByIds(userId);
        return universityCommentView.adminListRender(comments, users);
    }

    /**
     * @api {get} /api/admin/program/:programId/comment/:commentId
     *     Get university comment by program id an comment id
     * @apiVersion 1.0.0
     * @apiGroup AdminUniversityComment
     * @apiName GetAdminUniversityComment
     *
     * @apiSuccess universityComment            {Object}
     *     Requested university comment object
     * @apiSuccess universityComment.socialId   {Number}
     *     Id in social network of registered user, who placed comment
     * @apiSuccess universityComment.socialType {String="vk", "fb"}
     *     Type of social network of registered user, who placed comment
     * @apiSuccess universityComment.userType   {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess universityComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess universityComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess universityComment.pros       {String}
     *     Pros of study in university
     * @apiSuccess universityComment.cons       {String}
     *     Cons of study in university
     * @apiSuccess universityComment.advice     {String}
     *     Advice for enrollees
     * @apiSuccess universityComment.totalScore {Number}
     *     Total score of comment, calculated from score
     * @apiSuccess universityComment.updatedAt  {Date}
     *     Date of creation of updating of comment
     *
     * @apiSuccessExample Success-Response:
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
     * @apiUse UniversityCommentNotFoundError
     * @apiUse UniversityCommentNotBelongsToProgramError
     */
    public async actionGet(
            actionContext: any, programId: string, commentId: string) {
        const comment = await universityCommentService.getOneWithFullData(
                +programId,
                +commentId
            ),
            user = await userService.getUserById(comment.userData.userId);

        return universityCommentView.adminRender(comment, user);
    }

    /**
     * @api {post} /api/admin/program/:programId/comment
     * @apiGroup AdminUniversityComment
     * @apiVersion 1.0.0
     */
    public async actionCreate(actionContext: any, programId: string) {
        actionContext.status = 404;
    }

    /**
     * @api {put} /api/admin/program/:programId/comment/:commentId
     *     Update only text in comment
     * @apiVersion 1.0.0
     * @apiGroup AdminUniversityComment
     * @apiName Update university comment
     *
     * @apiParam {Object} universityComment
     * @apiParam {String} universityComment.pros
     * @apiParam {String} universityComment.cons
     * @apiParam {String} universityComment.advice
     *
     * @apiParamExample Request-Example:
     *     {
     *           "advice": 'Поступайте все!',
     *           "pros": 'Очень хороший университет',
     *           "cons": 'Общежитие отвратительное'
     *      }
     *
     * @apiUse ProgramNotFoundError
     * @apiUse UniversityCommentNotFoundError
     * @apiUse UniversityCommentNotBelongsToProgramError
     */
    public async actionUpdate(
        actionContext: any, programId: number, commentId: number) {
        const data = actionContext.data;
        return await universityCommentService.update(
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
     * @apiGroup AdminUniversityComment
     * @apiName Delete comment
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP 1/1 203 OK
     *
     * @apiUse ProgramNotFoundError
     * @apiUse UniversityCommentNotFoundError
     * @apiUse UniversityCommentNotBelongsToProgramError
     */
    public async actionDelete(
        actionContext: any, programId: string, commentId: string) {
        return await universityCommentService.fullDelete(
            +programId, +commentId
        );
    }
}

export {AdminUniversityCommentController};
