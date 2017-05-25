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
const lodash_1 = require("lodash");
const xlsx_1 = require("../../../api/components/xlsx");
const programComment_1 = require("../../../api/modules/comment/services/programComment");
const University_1 = require("../../../api/modules/university/models/University");
const Program_1 = require("../../../api/modules/university/models/Program");
const userTypeEnum = require('../../../api/modules/user/enums/userType');
const SHEET = 'Comments';
const POLL_YEAR = 2017;
const BACHELOR_LENGTH = 4;
const YEAR_TO_GRADE = POLL_YEAR - BACHELOR_LENGTH;
const MIN_GRADE = 1;
const MAX_GRADE = 6;
class CommentsLoader {
    constructor(logger) {
        this.logger = logger;
    }
    loadComments(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileComments = yield this.readFileComments(filePath);
            const userTypes = [];
            yield this.initData();
            const normalizedComments = yield this.normalizeComments(fileComments);
            this.checkComments(normalizedComments);
            this.logger.info('Start uploading comments');
            yield this.uploadComments(normalizedComments);
            this.logger.info('Start updating rating');
            yield this.updateRating(normalizedComments);
        });
    }
    readFileComments(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileRows = yield xlsx_1.xlsx.getJson(filePath, { sheet: SHEET });
            const fileComments = fileRows.filter(comment => !!comment.universityName && !!comment.programName);
            return fileComments;
        });
    }
    normalizeComments(fileComments) {
        return __awaiter(this, void 0, void 0, function* () {
            return fileComments.map(fileComment => {
                const userType = this.getUserType(fileComment.userType);
                const normalizedComment = {
                    programId: this.getProgramId(fileComment.programName, fileComment.universityName),
                    pros: fileComment.pros,
                    cons: fileComment.cons,
                    advice: fileComment.advice,
                    userType: userType,
                    username: fileComment.name,
                    score: [
                        Number(fileComment.education),
                        Number(fileComment.teaching),
                        Number(fileComment.atmosphere),
                        Number(fileComment.infrastructure)
                    ],
                    isNoticeSend: true
                };
                const grade = parseInt(fileComment.grade, 10);
                const yearGraduate = Number(fileComment.yearGraduate);
                const userStage = this.getUserStage(userType, grade, yearGraduate);
                normalizedComment.grade = userStage.grade;
                normalizedComment.yearGraduate = userStage.yearGraduate;
                return normalizedComment;
            });
        });
    }
    initData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.universities = yield this.getUniversities();
            this.programs = yield this.getPrograms();
        });
    }
    getUniversities() {
        return __awaiter(this, void 0, void 0, function* () {
            return University_1.Model.findAll();
        });
    }
    getPrograms() {
        return __awaiter(this, void 0, void 0, function* () {
            return Program_1.Model.findAll();
        });
    }
    getProgramId(programName, universityName) {
        const commentUniversity = this.findUniversity(universityName);
        const commentProgram = this.findProgram(programName, commentUniversity.id);
        return commentProgram.id;
    }
    findUniversity(universityName) {
        const foundUniversity = lodash_1.find(this.universities, (university => university.name === universityName));
        if (!foundUniversity) {
            throw new Error(`University with name` +
                ` ${universityName} not found`);
        }
        return foundUniversity;
    }
    findProgram(programName, universityId) {
        const foundProgram = lodash_1.find(this.programs, (program => program.name === programName &&
            program.universityId === universityId));
        if (!foundProgram) {
            throw new Error(`Program with name ${programName} ` +
                `and universityId ${universityId} not found`);
        }
        return foundProgram;
    }
    getUserType(userType) {
        let result = '';
        switch (userType) {
            case 'выпускник':
                result = userTypeEnum.GRADUATE;
                break;
            case 'студент':
                result = userTypeEnum.STUDENT;
                break;
        }
        return result;
    }
    getUserStage(userType, grade, yearGraduate) {
        const result = {};
        if (userType === userTypeEnum.GRADUATE) {
            result.yearGraduate = yearGraduate;
        }
        else if (grade) {
            result.grade = grade;
        }
        else {
            result.grade = yearGraduate - YEAR_TO_GRADE;
        }
        return result;
    }
    getYearGraduate(yearGraduate, userType) {
        return userType === userTypeEnum.GRADUATE ?
            yearGraduate :
            null;
    }
    checkComments(comments) {
        comments.forEach((comment, i) => {
            this.checkProgramId(comment);
            this.checkGrade(comment);
            this.checkStage(comment);
        });
    }
    checkProgramId(comment) {
        if (!comment.programId) {
            this.logger.error(comment);
            throw new Error('Program id is missing');
        }
    }
    checkGrade(comment) {
        if (!comment.yearGraduate &&
            (comment.grade > MAX_GRADE || comment.grade < MIN_GRADE)) {
            this.logger.error(comment);
            throw new Error('Grade is incorrect');
        }
    }
    checkStage(comment) {
        if ((comment.userType === userTypeEnum.STUDENT && !comment.grade)) {
            this.logger.error(comment);
            throw new Error('Student must have grade');
        }
        else if (comment.userType === userTypeEnum.GRADUATE &&
            !comment.yearGraduate) {
            this.logger.error(comment);
            throw new Error('Graduate must have yearGraduate');
        }
    }
    uploadComments(comments) {
        return Promise.all(comments.map(this.uploadComment));
    }
    uploadComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield programComment_1.service.fullCreateDb(comment.programId, comment);
        });
    }
    updateRating(comments) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this.programs
                .filter(program => comments.find(comment => comment.programId == program.id))
                .map(program => programComment_1.service.updateRatings(program.commentGroupId)));
        });
    }
}
exports.CommentsLoader = CommentsLoader;
