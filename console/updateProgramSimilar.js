'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// author: dm-kamaev
// node commander updateProgramSimilar
// update similar program for everyone program
const commander = require('commander');
const lodash = require("lodash");
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
const programComment_1 = require("../api/modules/comment/services/programComment");
const program_1 = require("../api/modules/university/services/program");
const ProgramSimilar_1 = require("../api/modules/university/models/ProgramSimilar");
class InsertProgramSimilar {
    constructor() {
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('-----START-----');
            this.NUMBER_PROGRAM_SIMILAR_ = 4;
            this.hashSimilar_ = {};
            this.hashTotalScore_ = {};
            try {
                yield this.cleanTable();
                this.programs_ = yield program_1.service.getAllWithEgeAndStatistic();
                yield this.buildHashTotalScore();
                this.buildData();
                ProgramSimilar_1.Model.bulkCreate(this.getListForInsert());
            }
            catch (error) {
                console.log('Error=', error);
                logger.critical(error);
            }
            logger.info('-----THE END-----');
        });
    }
    buildData() {
        this.programs_.forEach((program) => {
            const subjectIds = this.getSubjectIds(program);
            this.setSimilarProgram(program, subjectIds);
        });
    }
    setSimilarProgram(program, subjectIds) {
        const hashSimilar = this.hashSimilar_;
        const hashTotalScore = this.hashTotalScore_;
        this.programs_.forEach((programAnother) => {
            const isNotEqualCity = program.university.cityId !== programAnother.university.cityId;
            if (program.id === programAnother.id || isNotEqualCity) {
                return;
            }
            const subjectIdsAnother = this.getSubjectIds(programAnother);
            if (this.isEqualSubject(subjectIds, subjectIdsAnother)) {
                if (!hashSimilar[program.id]) {
                    hashSimilar[program.id] = [];
                }
                // get statistic by last year
                const statistic = lodash.maxBy(programAnother.entranceStatistics, 'year');
                const totalScore = hashTotalScore[programAnother.commentGroupId];
                const data = {
                    relatedProgramId: programAnother.id,
                    totalScore
                };
                if (statistic) {
                    data.budgetPlaces = statistic.budgetPlaces || 0;
                    data.competition = statistic.competition || 0;
                }
                hashSimilar[program.id].push(data);
            }
        });
    }
    getListForInsert() {
        const hash = this.hashSimilar_;
        const programIds = Object.keys(hash);
        let res = [];
        programIds.forEach((programId) => {
            const programsSimilar = hash[programId];
            const partProgramsSimilar = lodash.orderBy(programsSimilar, ['totalScore', 'budgetPlaces', 'competition'], ['desc', 'desc', 'desc']).slice(0, this.NUMBER_PROGRAM_SIMILAR_);
            const prepare = (el) => {
                return {
                    mainProgramId: Number(programId),
                    relatedProgramId: el.relatedProgramId,
                };
            };
            const data = partProgramsSimilar.map(prepare);
            res = res.concat(data);
        });
        return res;
    }
    cleanTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const tableName = 'program_similar';
            const query = `
            DELETE FROM ${tableName};
            ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1;
        `;
            const option = { type: sequelize.QueryTypes.SELECT, raw: true };
            yield sequelize.query(query, option);
        });
    }
    // is equal ege subject
    isEqualSubject(subjectId1, subjectId2) {
        if (!subjectId1.length && !subjectId2.length) {
            return false;
        }
        if (subjectId1.length !== subjectId2.length) {
            return false;
        }
        const hash = {};
        let res = true;
        subjectId1.forEach((id) => hash[id] = true);
        // stupid linter !!!! for let i in circle
        /* tslint:disable */
        for (let i = 0, l = subjectId2.length; i < l; i++) {
            /* tslint:enable */
            if (!hash[subjectId2[i]]) {
                res = false;
                break;
            }
        }
        return res;
    }
    getSubjectIds(program) {
        const list = function (ege) {
            return ege.subjectId;
        };
        return program.programEgeExams.map(list);
    }
    getCommentGroupIds_(programs) {
        return programs.map((program) => program.commentGroupId);
    }
    // build hash { commentGroupId: totalScore }
    buildHashTotalScore() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashTotalScore = this.hashTotalScore_;
            const programIds = this.programs_.map(program => program.id);
            const commentGroupIds = this.getCommentGroupIds_(this.programs_);
            const programComments = yield programComment_1.service.getAllTotalScore(commentGroupIds);
            programComments.forEach((programComment) => {
                const commentGroupId = programComment.commentGroupId;
                if (programComment.rating) {
                    hashTotalScore[commentGroupId]
                        = programComment.rating.totalScore;
                }
                else {
                    hashTotalScore[commentGroupId] = 0;
                }
            });
        });
    }
}
;
commander
    .command('updateProgramSimilar')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    const insertProgramSimilar = new InsertProgramSimilar();
    return yield insertProgramSimilar.start();
}));
exports.Command;
