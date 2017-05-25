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
/**
 * @fileOverview Service for create, read, update program comments
 */
const Service_1 = require("../../common/services/Service");
const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');
const apiAddress = config.backendApi;
const headers = config.backendApiHeaders;
const RequiredFieldsNotFilled_1 = require("./exceptions/RequiredFieldsNotFilled");
const YearGraduateNotValid_1 = require("./exceptions/YearGraduateNotValid");
const ProgramNotFound_1 = require("./exceptions/ProgramNotFound");
const ProgramCommentNotFound_1 = require("./exceptions/ProgramCommentNotFound");
const CommentNotBelongsToProgram_1 = require("./exceptions/CommentNotBelongsToProgram");
const UserAlreadyCommentedProgram_1 = require("./exceptions/UserAlreadyCommentedProgram");
class ProgramCommentService extends Service_1.Service {
    constructor(programId) {
        super();
        this.baseUrl =
            `${apiAddress}/universities/api/program/${programId}/comment`;
    }
    getUserComment(user, comments) {
        return user ?
            comments.find(comment => comment.userId == user.id) || {} :
            {};
    }
    getComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                url: this.baseUrl,
                method: 'get',
                headers: {
                    [headers.token.name]: headers.token.value
                }
            };
            const responce = yield this.send(params);
            return responce.data;
        });
    }
    changeComment(data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return data.id ?
                yield this.updateComment(data.id, data, user) :
                yield this.createComment(data, user);
        });
    }
    createComment(data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validateContent(data)) {
                throw new RequiredFieldsNotFilled_1.RequiredFieldsNotFilledException();
            }
            if (!this.validateYearGraduate(data)) {
                throw new YearGraduateNotValid_1.YearGraduateNotValid();
            }
            const params = {
                url: this.baseUrl,
                method: 'post',
                data: this.makeBackendCommentData(data, user),
                headers: {
                    [headers.token.name]: headers.token.value
                }
            };
            return yield this.send(params);
        });
    }
    updateComment(commentId, data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validateContent(data)) {
                throw new RequiredFieldsNotFilled_1.RequiredFieldsNotFilledException();
            }
            if (!this.validateYearGraduate(data)) {
                throw new YearGraduateNotValid_1.YearGraduateNotValid();
            }
            const params = {
                url: `${this.baseUrl}/${commentId}`,
                method: 'put',
                data: this.makeBackendCommentData(data, user),
                headers: {
                    [headers.token.name]: headers.token.value
                }
            };
            return yield this.send(params);
        });
    }
    handleError(error) {
        const data = error.data;
        if (data) {
            logger.debug(JSON.stringify(error.data));
            data.forEach(errorItem => {
                const code = errorItem.code;
                switch (code) {
                    case 'ProgramNotFound':
                        throw new ProgramNotFound_1.ProgramNotFound();
                    case 'ProgramCommentNotFound':
                        throw new ProgramCommentNotFound_1.ProgramCommentNotFound();
                    case 'CommentNotBelongsToProgram':
                        throw new CommentNotBelongsToProgram_1.CommentNotBelongsToProgram();
                    case 'UserAlreadyCommentedProgram':
                        throw new UserAlreadyCommentedProgram_1.UserAlreadyCommentedProgram();
                }
            });
        }
        throw error;
    }
    makeBackendCommentData(data, user) {
        return {
            userType: data.userType,
            yearGraduate: data.yearGraduate || null,
            grade: data.grade || null,
            pros: data.pros,
            cons: data.cons,
            advice: data.advice,
            score: data.score,
            userId: user.id
        };
    }
    validateContent(data) {
        const hasText = Boolean(data.pros || data.cons || data.advice), hasScore = Boolean(data.score) && Boolean(data.score.length);
        return hasScore || hasText;
    }
    validateYearGraduate(data) {
        let result = true;
        const yearGraduate = data.yearGraduate;
        if (yearGraduate) {
            result = /^\d{4}$/.test(yearGraduate);
        }
        return result;
    }
}
exports.ProgramCommentService = ProgramCommentService;
