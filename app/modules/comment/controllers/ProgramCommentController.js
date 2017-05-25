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
const ProgramComment_1 = require("../services/ProgramComment");
const user_1 = require("../../user/services/user");
const RequiredFieldsNotFilled_1 = require("./errors/RequiredFieldsNotFilled");
const UserNotLoggedIn_1 = require("./errors/UserNotLoggedIn");
const ProgramNotFound_1 = require("./errors/ProgramNotFound");
const ProgramCommentNotFound_1 = require("./errors/ProgramCommentNotFound");
const CommentNotBelongsToProgram_1 = require("./errors/CommentNotBelongsToProgram");
const UserAlreadyCommentedProgram_1 = require("./errors/UserAlreadyCommentedProgram");
const YearGraduateNotValid_1 = require("./errors/YearGraduateNotValid");
class ProgramCommentController extends Controller {
    constructor() {
        super();
        this.errors = {
            RequiredFieldsNotFilledException: RequiredFieldsNotFilled_1.RequiredFieldsNotFilled,
            UserNotLoggedInException: UserNotLoggedIn_1.UserNotLoggedIn,
            ProgramNotFoundException: ProgramNotFound_1.ProgramNotFound,
            ProgramCommentNotFoundException: ProgramCommentNotFound_1.ProgramCommentNotFound,
            CommentNotBelongsToProgramException: CommentNotBelongsToProgram_1.CommentNotBelongsToProgram,
            UserAlreadyCommentedProgramException: UserAlreadyCommentedProgram_1.UserAlreadyCommentedProgram,
            YearGraduateNotValidException: YearGraduateNotValid_1.YearGraduateNotValid
        };
    }
    /**
     * @api {post} /program/:programId/comment
     * @apiVersion 1.0.0
     * @apiName changeProgramComment
     * @apiGroup ProgramComment
     *
     * @apiParam {Object}     ProgramComment
     * @apiParam [{Number}]   ProgramComment.id           Id of university
     *     comment if exists - comment updates, otherwise - creates
     * @apiParam {String}     ProgramComment.userType     Selected type of user
     * @apiParam [{Number}]   ProgramComment.grade        Current grade of user,
     *     if it is student
     * @apiParam [{Number}]   ProgramComment.yearGraduate Graduation year of
     *     user if it already graduate university
     * @apiParam [{String}]   ProgramComment.pros         Pros of study in
     *     university
     * @apiParam [{String}]   ProgramComment.cons         Cons of study in
     *     university
     * @apiParam [{String}]   ProgramComment.advice       Advice for enrollees
     * @apiParam [{Number[]}] ProgramComment.score        Score of comment
     *
     * @apiParaExample {json} Request-Example:
     *     {
     *         "id": 10,
     *         "userType": "Student",
     *         "grade": 4,
     *         "yearGraduate": 2016,
     *         "pros": 'Очень хороший университет',
     *         "cons": 'Общежитие отвратительное',
     *         "advice": 'Поступайте все!',
     *         "totalScore": 4.8,
     *         "score": [1, 2, 2, 4]
     *     }
     *
     * @apiSuccess Success-Response:
     *     HTTP/1.1 204 OK
     *
     * @apiError (403) UserNotLoggedIn User not logged in
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 403 Forbidden
     *     [{
     *         "code": "UserNotLoggedIn",
     *         "message": "Необходимо войти"
     *     }]
     *
     * @apiError (422) RequiredFieldsNotFilled Some of required fields are empty
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 422 Unprocessable Entity
     *     [{
     *         "code": "RequiredFieldsNotFilled",
     *         "message": "Оставьте оценку или комментарий"
     *     }]
     *
     * @apiError (422) YearGraduateNotValid Year graduate is not in right format
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 422 Unprocessable Entity
     *     [{
     *         "code": "RequiredFieldsNotFilled",
     *         "message": "Укажите год выпуска в формате ХХХХ"
     *     }]
     *
     * @apiError (422) CommentNotBelongToProgram Comment with given id not
     * belongs to program with given id
     *     HTTP/1.1 422 Unprocessable Entity
     *     [{
     *         "code": "CommentNotBelongToProgram",
     *         "message": "Комментарий, который вы хотите отредактировать
     *            не принадлежит к программе с данным id"
     *     }]
     *
     * @apiError (404) ProgramCommentNotFound Program comment not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "ProgramCommentNotFound",
     *           "message": "Комментарий с данным id не найден"
     *      }]
     *
     * @apiError (404) ProgramNotFound Program not found
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      [{
     *           "code": "ProgramNotFound",
     *           "message": "Программа с данным id не найдена"
     *      }]
     *
     * @apiError (403) UserAlreadyCommentedProgram User with given id
     *     already commented program with given id
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 403 Forbidden
     *      [{
     *           "code": "UserAlreadyCommentedProgram",
     *           "message": "Вы уже оставляли комментарий у этой программы"
     *      }]
     */
    actionChange(actionContext, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const programCommentService = new ProgramComment_1.ProgramCommentService(Number(programId)), requestData = actionContext.data, data = {
                id: requestData.id,
                userType: requestData.userType,
                grade: requestData.grade,
                yearGraduate: requestData.yearGraduate,
                pros: requestData.pros,
                cons: requestData.cons,
                advice: requestData.advice,
                score: requestData.score
            }, user = user_1.userService.getUserFromRequest(actionContext.request, {
                checkIsLoggedIn: true
            });
            yield programCommentService.changeComment(data, user);
            actionContext.status = 204;
        });
    }
}
exports.ProgramCommentController = ProgramCommentController;
