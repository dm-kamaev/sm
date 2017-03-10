import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {
    service as universityCommentService
} from '../services/universityComment';

import {universityCommentView} from '../views/universityCommentView';

import {ProgramNotFound} from './errors/ProgramNotFound';
import {UniversityCommentNotFound} from './errors/UniversityCommentNotFound';
import {
    UniversityCommentNotBelongsToProgram
} from './errors/UniversityCommentNotBelongsToProgram';

class UniversityCommentController extends Controller {
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
     * @api {get} /api/university/program/:programId/comment
     *     Get university comments by program
     * @apiVersion 1.0.0
     * @apiGroup UniversityComment
     * @apiName GetUniversityComments
     *
     * @apiSuccess universityComment              {Object[]}
     *     Requested university comment object
     * @apiSuccess universityComment.id           {Number}
     *     Id of university comment
     * @apiSuccess universityComment.userType     {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess universityComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess universityComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess universityComment.userId       {Number}
     *     Id of user, who place comment
     * @apiSuccess universityComment.pros         {String}
     *     Pros of study in university
     * @apiSuccess universityComment.cons         {String}
     *     Cons of study in university
     * @apiSuccess universityComment.advice       {String}
     *     Advice for enrollees
     * @apiSuccess universityComment.score        {Number[]}
     *    Score of comment
     * @apiSuccess universityComment.totalScore   {Number}
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
            await universityCommentService.getAllByProgramIdWithFullData(
                +programId
            );

        return universityCommentView.renderList(comments);
    }

    /**
     * @api {get} /api/program/:programId/comment/:commentId
     *     Get university comment by program
     * @apiVersion 1.0.0
     * @apiGroup UniversityComment
     * @apiName GetUniversityComment
     *
     * @apiSuccess universityComment              {Object}
     *     Requested university comment object
     * @apiSuccess universityComment.id           {Number}
     *     Id of university comment
     * @apiSuccess universityComment.userType     {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess universityComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess universityComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess universityComment.userId       {Number}
     *     Id of user, who place comment
     * @apiSuccess universityComment.pros         {String}
     *     Pros of study in university
     * @apiSuccess universityComment.cons         {String}
     *     Cons of study in university
     * @apiSuccess universityComment.advice       {String}
     *     Advice for enrollees
     * @apiSuccess universityComment.score        {Number[]}
     *    Score of comment
     * @apiSuccess universityComment.totalScore   {Number}
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
     * @apiUse UniversityCommentNotFoundError
     * @apiUse UniversityCommentNotBelongsToProgramError
     */
    public async actionGet(
            actionContext: any, programId: string, commentId: string) {
        const  comment = await universityCommentService.getOneWithFullData(
            +programId,
            +commentId
        );

        return universityCommentView.render(comment);
    }


    /**
     * @api {post} /api/program/:programId/comment Create university comment
     * @apiVersion 1.0.0
     * @apiGroup UniversityComment
     * @apiName CreateUniversityComment
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
        return await universityCommentService.fullCreate(
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
     * @apiGroup UniversityComment
     * @apiName UpdateUniversityComment
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
     * @apiUse UniversityCommentNotFoundError
     * @apiUse UniversityCommentNotBelongsToProgramError
     */
    public async actionUpdate(
            actionContext: any, programId: number, commentId: number) {
        const reviewData = actionContext.data;
        return await universityCommentService.fullUpdate(
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

export {UniversityCommentController};
