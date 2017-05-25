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
const userService = require('../../user/services/user');
const ProgramNotFound_1 = require("./errors/ProgramNotFound");
const CommentNotBelongsToProgram_1 = require("./errors/CommentNotBelongsToProgram");
const ProgramCommentNotFound_1 = require("./errors/ProgramCommentNotFound");
class AdminProgramCommentController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramCommentNotFoundException: ProgramCommentNotFound_1.ProgramCommentNotFound,
            ProgramNotFoundException: ProgramNotFound_1.ProgramNotFound,
            CommentNotBelongsToProgramException: CommentNotBelongsToProgram_1.CommentNotBelongsToProgram
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
     * @apiError (404) ProgramCommentNotFound Program comment not found
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
     *      HTTP/1.1 422 Unprocessable Entity
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
     * @apiSuccess ProgramComment              {Object[]}
     *     Requested university comment object
     * @apiSuccess ProgramComment.socialId     {Number}
     *     Id in social network of registered user, who placed comment
     * @apiSuccess ProgramComment.name         {String}
     *     Name of user, who placed comment
     * @apiSuccess ProgramComment.socialType   {String="vk", "fb"}
     *     Type of social network of registered user, who placed comment
     * @apiSuccess ProgramComment.userType     {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess ProgramComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess ProgramComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess ProgramComment.pros         {String}
     *     Pros of study in university
     * @apiSuccess ProgramComment.cons         {String}
     *     Cons of study in university
     * @apiSuccess ProgramComment.advice       {String}
     *     Advice for enrollees
     * @apiSuccess ProgramComment.totalScore   {Number}
     *     Total score of comment, calculated from score
     * @apiSuccess ProgramComment.updatedAt    {Date}
     *     Date of creation of updating of comment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         "socialId": 234561,
     *         "socialType": "vk",
     *         "name": "Ольга",
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
    actionList(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield programComment_1.service.getAllByProgramIdWithFullData(+programId, { filterEmptyComments: true }), userId = comments.map(comment => comment.userData.userId), users = yield userService.getUserByIds(userId);
            return programCommentView_1.programCommentView.adminListRender(comments, users);
        });
    }
    /**
     * @api {get} /api/admin/program/:programId/comment/:commentId
     *     Get university comment by program id an comment id
     * @apiVersion 1.0.0
     * @apiGroup AdminProgramComment
     * @apiName GetAdminProgramComment
     *
     * @apiSuccess ProgramComment              {Object}
     *     Requested university comment object
     * @apiSuccess ProgramComment.socialId     {Number}
     *     Id in social network of registered user, who placed comment
     * @apiSuccess ProgramComment.socialType   {String="vk", "fb"}
     *     Type of social network of registered user, who placed comment
     * @apiSuccess ProgramComment.name         {String}
     *     Name of user, who placed comment
     * @apiSuccess ProgramComment.userType     {String="Student", "Graduate"}
     *     Selected type of user
     * @apiSuccess ProgramComment.grade        {Number}
     *     Current grade of user, if it is student
     * @apiSuccess ProgramComment.yearGraduate {Number}
     *    Graduation year of user if it already graduate university
     * @apiSuccess ProgramComment.pros         {String}
     *     Pros of study in university
     * @apiSuccess ProgramComment.cons         {String}
     *     Cons of study in university
     * @apiSuccess ProgramComment.advice       {String}
     *     Advice for enrollees
     * @apiSuccess ProgramComment.totalScore   {Number}
     *     Total score of comment, calculated from score
     * @apiSuccess ProgramComment.updatedAt    {Date}
     *     Date of creation of updating of comment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200
     *     {
     *         "socialId": 234561,
     *         "socialType": "vk",
     *         "name": "Елена",
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
    actionGet(actionContext, programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield programComment_1.service.getOneWithFullData(+programId, +commentId), user = yield userService.getUserById(comment.userData.userId);
            return programCommentView_1.programCommentView.adminRender(comment, user);
        });
    }
    /**
     * @api {post} /api/admin/program/:programId/comment
     * @apiGroup AdminProgramComment
     * @apiVersion 1.0.0
     */
    actionCreate(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            actionContext.status = 404;
        });
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
    actionUpdate(actionContext, programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = actionContext.data;
            return yield programComment_1.service.update(+programId, +commentId, {
                advice: data.advice,
                pros: data.pros,
                cons: data.cons
            });
        });
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
    actionDelete(actionContext, programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield programComment_1.service.fullDelete(+programId, +commentId);
        });
    }
}
exports.AdminProgramCommentController = AdminProgramCommentController;
