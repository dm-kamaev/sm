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
const squel = require("squel");
squel.useFlavour('postgres');
const sequelize = require('../../../../app/components/db');
const program_1 = require("../../university/services/program");
const rating_1 = require("../services/rating");
const SCORE_COUNT = 4;
const MIN_REVIEW_COUNT = 5;
const MIN_SCORE_COUNT = 3;
class UniversityRatingChanger {
    update(commentGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = yield program_1.service.getByCommentGroup(commentGroupId);
            const universityId = program.universityId;
            const overallRating = yield this.getOverallRating(universityId);
            overallRating.score = overallRating.score.map((grade, i) => overallRating.scoreCount[i] >= MIN_SCORE_COUNT ?
                Number(grade) :
                0);
            if (overallRating.score.every(grade => !!grade) &&
                overallRating.reviewCount >= MIN_REVIEW_COUNT) {
                overallRating.totalScore = rating_1.service.calculateTotalScore(overallRating.score);
            }
            else {
                overallRating.totalScore = 0;
            }
            return this.updateUniversity(universityId, overallRating);
        });
    }
    getOverallRating(universityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = squel
                .select({ autoQuoteAliasNames: true })
                .from('program')
                .field('sum(program.review_count)', 'reviewCount')
                .field(this.getScoreQuery(), 'score')
                .field(this.getScoreCountQuery(), 'scoreCount')
                .where(`program.university_id = ${universityId}`)
                .toString();
            const result = yield sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT
            });
            return result[0];
        });
    }
    getScoreQuery() {
        return this.getQueryArray(this.getScoreElementQuery);
    }
    getScoreCountQuery() {
        return this.getQueryArray(this.getScoreCountElementQuery);
    }
    getQueryArray(getArrayElement) {
        const elementCalculation = [];
        for (let i = 1; i <= SCORE_COUNT; i++) {
            elementCalculation.push(getArrayElement(i));
        }
        return `ARRAY[${elementCalculation.join(', ')}]`;
    }
    getScoreElementQuery(index) {
        return `sum(program.score[${index}] * program.score_count[${index}]) ` +
            `FILTER(WHERE program.score[${index}] > 0) / ` +
            `sum(program.score_count[${index}])`;
    }
    getScoreCountElementQuery(index) {
        return `sum(program.score_count[${index}])`;
    }
    updateUniversity(universityId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = squel.update()
                .table('university')
                .set('review_count', rating.reviewCount)
                .set('score', `{${rating.score.join(', ')}}`)
                .set('score_count', `{${rating.scoreCount.join(', ')}}`)
                .set('total_score', rating.totalScore)
                .where(`university.id = ${universityId}`)
                .toString();
            return sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        });
    }
}
exports.UniversityRatingChanger = UniversityRatingChanger;
