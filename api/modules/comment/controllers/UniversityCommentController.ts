import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {
    service as universityCommentService
} from '../services/universityComment';

class UniversityCommentController extends Controller {
    constructor() {
        super();

        this.errors = {};
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
     *     University comment not found
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
     * @apiDefine WrongAttributesError
     * @apiError (404) ProgramNotFound Program not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 422 Not Found
     *      {
     *           "code": "WrongAttributes",
     *           "message": "Program with given id not found"
     *      }
     */

    /**
     * @api {get} /api/university/program/:programId/comment
     * @apiVersion 1.0.0
     */
    public async actionList(actionContext: any) {
    }

    /**
     * @api {post} /api/university/program/:programId/comment
     * @apiVersion 1.0.0
     * @apiName Create review
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
     * @apiUse WrongAttributesError
     */
    public async actionCreate(actionContext: any, programId: string) {
        const reviewData = actionContext.data;
        return await universityCommentService.fullCreate(
            +programId,
            {
                userType: reviewData.userType,
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
     * @api {put} /api/admin/university/program/:programId/comment/:commentId
     *     Update only text in comment
     * @apiVersion 1.0.0
     * @apiName Update comment
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
