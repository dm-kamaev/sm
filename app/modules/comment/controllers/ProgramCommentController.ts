import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {ProgramCommentService} from '../services/ProgramComment';
import {userService} from '../../user/services/user';
import {ProgramCommentData} from '../types/programComment';

import {RequiredFieldsNotFilled} from './errors/RequiredFieldsNotFilled';
import {UserNotLoggedIn} from './errors/UserNotLoggedIn';
import {ProgramNotFound} from './errors/ProgramNotFound';
import {ProgramCommentNotFound} from './errors/ProgramCommentNotFound';
import {CommentNotBelongsToProgram} from './errors/CommentNotBelongsToProgram';
import {
    UserAlreadyCommentedProgram
} from './errors/UserAlreadyCommentedProgram';

class ProgramCommentController extends Controller {
    constructor() {
        super();

        this.errors = {
            RequiredFieldsNotFilledException: RequiredFieldsNotFilled,
            UserNotLoggedInException: UserNotLoggedIn,
            ProgramNotFoundException: ProgramNotFound,
            ProgramCommentNotFoundException: ProgramCommentNotFound,
            CommentNotBelongsToProgramException: CommentNotBelongsToProgram,
            UserAlreadyCommentedProgramException: UserAlreadyCommentedProgram
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
    public async actionChange(actionContext: any, programId: string) {
        const programCommentService =
                new ProgramCommentService(Number(programId)),
            requestData = actionContext.data,
            data: ProgramCommentData = {
                id: requestData.id,
                userType: requestData.userType,
                grade: requestData.grade,
                yearGraduate: requestData.yearGraduate,
                pros: requestData.pros,
                cons: requestData.cons,
                advice: requestData.advice,
                score: requestData.score
            },
            user = userService.getUserFromRequest(
                actionContext.request,
                {
                    checkIsLoggedIn: true
                }
            );

        await programCommentService.changeComment(data, user);
        actionContext.status = 204;
    }
}

export {ProgramCommentController};
