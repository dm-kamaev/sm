import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {
    service as programCommentService
} from '../services/programComment';

import {programCommentView} from '../views/programCommentView';

import {ProgramNotFound} from './errors/ProgramNotFound';
import {ProgramCommentNotFound} from './errors/ProgramCommentNotFound';
import {
    CommentNotBelongsToProgram
} from './errors/CommentNotBelongsToProgram';

class ProgramCommentController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramCommentNotFoundException: ProgramCommentNotFound,
            ProgramNotFoundException: ProgramNotFound,
            CommentNotBelongsToProgramException: CommentNotBelongsToProgram
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
     * @apiDefine ProgramCommentNotBelongsToProgramError
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
     * @api {get} /api/university/program/:programId/comment
     *     Get university comments by program
     * @apiVersion 1.0.0
     * @apiGroup ProgramComment
     * @apiName GetProgramComments
     *
     * @apiSuccess ProgramComment              {Object[]}
     *     Requested university comment object
     * @apiSuccess ProgramComment.id           {Number}
     *     Id of university comment
     * @apiSuccess ProgramComment.userType     {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess ProgramComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess ProgramComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess ProgramComment.userId       {Number}
     *     Id of user, who place comment
     * @apiSuccess ProgramComment.pros         {String}
     *     Pros of study in university
     * @apiSuccess ProgramComment.cons         {String}
     *     Cons of study in university
     * @apiSuccess ProgramComment.advice       {String}
     *     Advice for enrollees
     * @apiSuccess ProgramComment.score        {Number[]}
     *    Score of comment
     * @apiSuccess ProgramComment.totalScore   {Number}
     *     Total score of comment, calculated from score
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "id": 10,
     *         "userType": "Student",
     *         "grade": 4,
     *         "yearGraduate": 2016,
     *         "pros": 'Очень хороший университет',
     *         "cons": 'Общежитие отвратительное',
     *         "advice": 'Поступайте все!',
     *         "totalScore": 4.8,
     *         "score": [1, 2, 2, 4],
     *         "userId": 12
     *     }]
     *
     * @apiUse ProgramNotFoundError
     */
    public async actionList(actionContext: any, programId: string) {
        const comments =
            await programCommentService.getAllByProgramIdWithFullData(
                +programId
            );

        return programCommentView.renderList(comments);
    }

    /**
     * @api {get} /api/program/:programId/comment/:commentId
     *     Get university comment by program
     * @apiVersion 1.0.0
     * @apiGroup ProgramComment
     * @apiName GetProgramComment
     *
     * @apiSuccess ProgramComment              {Object}
     *     Requested university comment object
     * @apiSuccess ProgramComment.id           {Number}
     *     Id of university comment
     * @apiSuccess ProgramComment.userType     {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess ProgramComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess ProgramComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess ProgramComment.userId       {Number}
     *     Id of user, who place comment
     * @apiSuccess ProgramComment.pros         {String}
     *     Pros of study in university
     * @apiSuccess ProgramComment.cons         {String}
     *     Cons of study in university
     * @apiSuccess ProgramComment.advice       {String}
     *     Advice for enrollees
     * @apiSuccess ProgramComment.score        {Number[]}
     *    Score of comment
     * @apiSuccess ProgramComment.totalScore   {Number}
     *     Total score of comment, calculated from score
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": 10,
     *         "userType": "Student",
     *         "grade": 4,
     *         "yearGraduate": 2016,
     *         "pros": 'Очень хороший университет',
     *         "cons": 'Общежитие отвратительное',
     *         "advice": 'Поступайте все!',
     *         "totalScore": 4.8,
     *         "score": [1, 2, 2, 4],
     *         "userId": 12
     *     }
     *
     * @apiUse ProgramNotFoundError
     * @apiUse ProgramCommentNotFoundError
     * @apiUse CommentNotBelongsToProgramError
     */
    public async actionGet(
            actionContext: any, programId: string, commentId: string) {
        const  comment = await programCommentService.getOneWithFullData(
            +programId,
            +commentId
        );

        return programCommentView.render(comment);
    }


    /**
     * @api {post} /api/program/:programId/comment Create university comment
     * @apiVersion 1.0.0
     * @apiGroup ProgramComment
     * @apiName CreateProgramComment
     *
     * @apiParam {Object}   comment      Review object
     * @apiParam {String}   comment.userType     Type of user, who wrote review
     * @apiParam {Number}   comment.grade        Current grade of user, if it is
     *     student
     * @apiParam {Number}   comment.yearGraduate Graduation year of user if it
     *     already graduate university
     * @apiParam {Number[]} comment.score        Score, attached to review
     * @apiParam {String}   comment.pros         Pros, wrote in review
     * @apiParam {String}   comment.cons         Cons, wrote in review
     * @apiParam {String}   comment.advice       Advice, wrote in review
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *           "userType": 'Student',
     *           "yearGraduate": 2015,
     *           "score": [5, 4, 4, 2],
     *           "advice": 'Поступайте все!',
     *           "pros": 'Очень хороший университет',
     *           "cons": 'Общежитие отвратительное'
     *      }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 203 OK
     *
     * @apiUse ProgramNotFoundError
     */
    public async actionCreate(actionContext: any, programId: string) {
        const reviewData = actionContext.data;
        return await programCommentService.fullCreate(
            +programId,
            {
                userType: reviewData.userType,
                userId: reviewData.userId,
                yearGraduate: reviewData.yearGraduate,
                grade: reviewData.grade,
                score: reviewData.score,
                advice: reviewData.advice,
                pros: reviewData.pros,
                cons: reviewData.cons
            }
        );
    }

    /**
     * @api {put} /api/program/:programId/comment/:commentId
     *     Update only text in comment
     * @apiVersion 1.0.0
     * @apiGroup ProgramComment
     * @apiName UpdateProgramComment
     *
     * @apiParam {Object}   comment      Review object
     * @apiParam {String}   comment.userType     Type of user, who wrote review
     * @apiParam {Number}   comment.grade        Current grade of user, if it is
     *     student
     * @apiParam {Number}   comment.yearGraduate Graduation year of user if it
     *     already graduate university
     * @apiParam {Number[]} comment.score        Score, attached to review
     * @apiParam {String}   comment.pros         Pros, wrote in review
     * @apiParam {String}   comment.cons         Cons, wrote in review
     * @apiParam {String}   comment.advice       Advice, wrote in review
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *           "userType": 'Student',
     *           "yearGraduate": 2015,
     *           "score": [5, 4, 4, 2],
     *           "advice": 'Поступайте все!',
     *           "pros": 'Очень хороший университет',
     *           "cons": 'Общежитие отвратительное'
     *      }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 203 OK
     *
     * @apiUse ProgramNotFoundError
     * @apiUse ProgramCommentNotFoundError
     * @apiUse CommentNotBelongsToProgramError
     */
    public async actionUpdate(
            actionContext: any, programId: number, commentId: number) {
        const reviewData = actionContext.data;
        return await programCommentService.fullUpdate(
            +programId,
            +commentId,
            {
                userType: reviewData.userType,
                userId: reviewData.userId,
                yearGraduate: reviewData.yearGraduate,
                grade: reviewData.grade,
                score: reviewData.score,
                advice: reviewData.advice,
                pros: reviewData.pros,
                cons: reviewData.cons
            }
        );
    }
}

export {ProgramCommentController};
