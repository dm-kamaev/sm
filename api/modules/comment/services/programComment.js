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
const db = require('../../../../app/components/db');
const logger = require('../../../../app/components/logger/logger').getLogger('app');
const rating_1 = require("./rating");
const Rating_1 = require("../models/Rating");
const userData_1 = require("../../user/services/userData");
const userData_2 = require("../../user/models/userData");
const program_1 = require("../../university/services/program");
const RatingChanger_1 = require("../lib/RatingChanger");
const UniversityRatingChanger_1 = require("../lib/UniversityRatingChanger");
const ProgramCommentNotFound_1 = require("./exceptions/ProgramCommentNotFound");
const CommentNotBelongsToProgram_1 = require("./exceptions/CommentNotBelongsToProgram");
const UserAlreadyCommentedProgram_1 = require("./exceptions/UserAlreadyCommentedProgram");
const ProgramComment_1 = require("../models/ProgramComment");
const Program_1 = require("../../university/models/Program");
class ProgramCommentService {
    constructor() {
        this.name = 'programComment';
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProgramComment_1.Model.create(data);
        });
    }
    fullCreate(programId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.transaction(() => __awaiter(this, void 0, void 0, function* () {
                yield this.fullCreateDb(programId, data, { updateRating: true });
            })).catch((error) => {
                logger.error(error);
                throw error;
            });
        });
    }
    getOne(programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentInstance = yield this.silentGetOne_(commentId);
            if (!commentInstance) {
                throw new ProgramCommentNotFound_1.ProgramCommentNotFound(commentId);
            }
            const commentGroup = yield program_1.service.getCommentGroup(programId);
            if (commentGroup.id !== commentInstance.commentGroupId) {
                throw new CommentNotBelongsToProgram_1.CommentNotBelongsToProgram(programId, commentId);
            }
            return commentInstance;
        });
    }
    getOneWithFullData(programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getOne(programId, commentId);
            comment.userData = yield userData_1.service.getOne(comment.userDataId);
            if (comment.ratingId) {
                comment.rating = yield rating_1.service.getById(comment.ratingId);
            }
            return comment;
        });
    }
    getAllByProgramIdWithFullData(programId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentGroup = yield program_1.service.getCommentGroup(programId);
            const order = this.getCommentsOrder_(params.order);
            const notEmptyCommentCondition = params.filterEmptyComments ?
                this.getNotEmptyCommentCondition_() :
                null;
            return yield ProgramComment_1.Model.findAll({
                where: {
                    commentGroupId: commentGroup.id,
                    $and: notEmptyCommentCondition
                },
                include: [{
                        model: userData_2.Model,
                        attributes: [
                            'userType', 'grade', 'yearGraduate', 'userId', 'username'
                        ],
                        as: 'userData'
                    }, {
                        model: Rating_1.Model,
                        attributes: [
                            'score', 'totalScore'
                        ],
                        as: 'rating'
                    }],
                order: order
            });
        });
    }
    getAllTotalScore(commentGroupIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProgramComment_1.Model.findAll({
                attributes: ['commentGroupId'],
                where: {
                    commentGroupId: {
                        $in: commentGroupIds
                    },
                },
                include: [{
                        model: Rating_1.Model,
                        attributes: ['totalScore'],
                        as: 'rating'
                    }],
            });
        });
    }
    update(programId, commentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield this.getOne(programId, commentId);
            return yield instance.update(data);
        });
    }
    updateById(commentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield this.silentGetOne_(commentId);
            return yield instance.update(data);
        });
    }
    fullUpdate(programId, commentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.transaction(() => __awaiter(this, void 0, void 0, function* () {
                yield this.fullUpdate_(programId, commentId, data);
            })).catch((error) => {
                throw error;
            });
        });
    }
    fullDelete(programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.transaction(() => __awaiter(this, void 0, void 0, function* () {
                yield this.fullDelete_(programId, commentId);
            })).catch((error) => {
                throw error;
            });
        });
    }
    getNotNotified() {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramComment_1.Model.findAll({
                where: {
                    isNoticeSend: false
                }
            });
        });
    }
    fullCreateDb(programId, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = data.userId, isUserCommented = yield this.checkIfCommented_(programId, userId);
            if (isUserCommented) {
                throw new UserAlreadyCommentedProgram_1.UserAlreadyCommentedProgram(programId, userId);
            }
            const commentInstance = yield this.create(data), userDataInstance = yield userData_1.service.create(data), commentGroup = yield program_1.service.getCommentGroup(programId);
            if (data.score && data.score.length) {
                yield this.createCommentRating_(commentInstance, data);
            }
            yield commentInstance.setUserData(userDataInstance);
            yield commentInstance.setCommentGroup(commentGroup);
            if (options && options.updateRating) {
                this.updateRatings(commentGroup.id);
            }
        });
    }
    updateRatings(commentGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                this.updateRating_(commentGroupId),
                this.updateUniversityRating_(commentGroupId)
            ]);
        });
    }
    fullDelete_(programId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentInstance = yield this.getOne(programId, commentId);
            yield commentInstance.destroy();
            yield userData_1.service.delete(commentInstance.userDataId);
            if (commentInstance.ratingId) {
                yield rating_1.service.delete(commentInstance.ratingId);
            }
            yield this.updateRating_(commentInstance.commentGroupId);
            yield this.updateUniversityRating_(commentInstance.commentGroupId);
        });
    }
    checkIfCommented_(programId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentGroup = yield program_1.service.getCommentGroup(programId), comment = yield ProgramComment_1.Model.findAll({
                where: {
                    commentGroupId: commentGroup.id
                },
                include: [{
                        model: userData_2.Model,
                        attributes: [
                            'userType',
                            'grade',
                            'yearGraduate',
                            'userId',
                            'username'
                        ],
                        where: {
                            userId: userId
                        },
                        as: 'userData'
                    }, {
                        model: Rating_1.Model,
                        attributes: [
                            'score', 'totalScore'
                        ],
                        as: 'rating'
                    }]
            });
            return Boolean(comment.length);
        });
    }
    fullUpdate_(programId, commentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentInstance = yield this.update(programId, commentId, data);
            if (data.score) {
                commentInstance.ratingId ?
                    yield rating_1.service.update(commentInstance.ratingId, data) :
                    yield this.createCommentRating_(commentInstance, data);
            }
            yield userData_1.service.update(commentInstance.userDataId, data);
            yield this.updateRating_(commentInstance.commentGroupId);
            yield this.updateUniversityRating_(commentInstance.commentGroupId);
        });
    }
    createCommentRating_(comment, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ratingInstance = yield rating_1.service.create(data.score);
            yield comment.setRating(ratingInstance);
        });
    }
    silentGetOne_(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProgramComment_1.Model.findById(commentId);
        });
    }
    getCommentsOrder_(orderType) {
        const order = [];
        switch (orderType) {
            case 1:
                order.push([
                    { model: Rating_1.Model, as: 'rating' },
                    'totalScore',
                    'DESC'
                ]);
                break;
            case 2:
                order.push([
                    { model: Rating_1.Model, as: 'rating' },
                    'totalScore',
                    'ASC'
                ]);
                break;
            default:
                order.push([
                    'createdAt',
                    'DESC'
                ]);
                break;
        }
        return order;
    }
    getNotEmptyCommentCondition_() {
        return {
            $or: {
                advice: { $ne: null },
                pros: { $ne: null },
                cons: { $ne: null }
            }
        };
    }
    updateRating_(commentGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const programTableName = Program_1.Model.getTableName();
            const programCommentTableName = ProgramComment_1.Model.getTableName();
            const ratingChanger = new RatingChanger_1.RatingChanger(programTableName, commentGroupId, programCommentTableName);
            return ratingChanger.update();
        });
    }
    updateUniversityRating_(commentGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const universityRatingChanger = new UniversityRatingChanger_1.UniversityRatingChanger();
            return universityRatingChanger.update(commentGroupId);
        });
    }
}
exports.service = new ProgramCommentService();
