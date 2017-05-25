"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller = require('nodules/controller').Controller;
const programComment_1 = require("../services/programComment");
const programCommentView_1 = require("../views/programCommentView");
const ProgramNotFound_1 = require("./errors/ProgramNotFound");
const ProgramCommentNotFound_1 = require("./errors/ProgramCommentNotFound");
const CommentNotBelongsToProgram_1 = require("./errors/CommentNotBelongsToProgram");
const UserAlreadyCommentedProgram_1 = require("./errors/UserAlreadyCommentedProgram");
class ProgramCommentController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramCommentNotFoundException: ProgramCommentNotFound_1.ProgramCommentNotFound,
            ProgramNotFoundException: ProgramNotFound_1.ProgramNotFound,
            CommentNotBelongsToProgramException: CommentNotBelongsToProgram_1.CommentNotBelongsToProgram,
            UserAlreadyCommentedProgramException: UserAlreadyCommentedProgram_1.UserAlreadyCommentedProgram
        };
    }
    /**
     * @apiDefine ProgramNotFoundError
     * @apiError (404) ProgramNotFound Program not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "ProgramNotFound",
     *           "message": "Program with given id not found"
     *      }]
     */
    /**
     * @apiDefine ProgramCommentNotFoundError
     * @apiError (404) ProgramCommentNotFound University comment not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "ProgramCommentNotFound",
     *           "message": "Program comment with id = 20 not found"
     *      }]
     */
    /**
     * @apiDefine ProgramCommentNotBelongsToProgramError
     * @apiError (422) ProgramCommentNotBelongsToProgram
     *     University comment not belongs to program
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 422 Not Found
     *      [{
     *           "code": "CommentNotBelongsToProgram",
     *           "message":
     *               "Program comment with id = 20
     *                not belongs to program with id = 126"
     *      }]
     */
    /**
     * @apiDefine UserAlreadyCommentedProgramError
     * @apiError (403) UserAlreadyCommentedProgram User with given id
     *     already commented program with given id
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 403 Forbidden
     *      [{
     *           "code": "UserAlreadyCommentedProgram",
     *           "message": "User with id = 10 already place comment to
     *               program with id = 2"
     *      }]
     */
    /**
     * @api {get} /api/university/program/:programId/comment
     *     Get university comments by program
     * @apiVersion 1.0.0
     * @apiGroup ProgramComment
     * @apiName GetProgramComments
     *
     * @apiParam {Number} orderType
     *     0 - new first, 1 - by total score desc, 2 - by total score asc
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
     *         "pros": "Очень хороший университет",
     *         "cons": "Общежитие отвратительное",
     *         "advice": "Поступайте все!",
     *         "totalScore": 4.8,
     *         "score": [1, 2, 2, 4],
     *         "userId": 12
     *     }]
     *
     * @apiUse ProgramNotFoundError
     */
    actionList(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = +actionContext.data.orderType || 0;
            const comments = yield programComment_1.service.getAllByProgramIdWithFullData(+programId, { order });
            return programCommentView_1.programCommentView.renderList(comments);
        });
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
    actionGet(actionContext, programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield programComment_1.service.getOneWithFullData(+programId, +commentId);
            return programCommentView_1.programCommentView.render(comment);
        });
    }
    /**
     * @api {post} /api/program/:programId/comment Create university comment
     * @apiVersion 1.0.0
     * @apiGroup ProgramComment
     * @apiName CreateProgramComment
     *
     * @apiParam {Object}   comment              Review object
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
     *         "userType": "Student",
     *         "yearGraduate": 2015,
     *         "score": [5, 4, 4, 2],
     *         "advice": "Поступайте все!",
     *         "pros": "Очень хороший университет",
     *         "cons": "Общежитие отвратительное"
     *     }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 203 OK
     *
     * @apiUse ProgramNotFoundError
     */
    actionCreate(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewData = actionContext.data;
            return yield programComment_1.service.fullCreate(+programId, {
                userType: reviewData.userType,
                userId: reviewData.userId,
                yearGraduate: reviewData.yearGraduate,
                grade: reviewData.grade,
                score: reviewData.score,
                advice: reviewData.advice || null,
                pros: reviewData.pros || null,
                cons: reviewData.cons || null
            });
        });
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
    actionUpdate(actionContext, programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewData = actionContext.data;
            return yield programComment_1.service.fullUpdate(+programId, +commentId, {
                userType: reviewData.userType,
                userId: reviewData.userId,
                yearGraduate: reviewData.yearGraduate,
                grade: reviewData.grade,
                score: reviewData.score,
                advice: reviewData.advice || null,
                pros: reviewData.pros || null,
                cons: reviewData.cons || null
            });
        });
    }
}
exports.ProgramCommentController = ProgramCommentController;
