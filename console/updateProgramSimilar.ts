'use strict';

// author: dm-kamaev
// node commander updateProgramSimilar
// update similar program for everyone program

const commander = require('commander');
import * as lodash from 'lodash';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
import {
    service as programCommentService
} from '../api/modules/comment/services/programComment';
import {
    ProgramCommentInstance
} from '../api/modules/comment/types/programComment';
import {
    service as programService
} from '../api/modules/university/services/program';
import {
    Model as ProgramSimilar
} from '../api/modules/university/models/ProgramSimilar';
import {
    ProgramSimilarAttribute,
} from '../api/modules/university/types/programSimilar';
import {
    ProgramInstance
} from '../api/modules/university/types/program';
import {
    EntranceStatisticInstance
} from '../api/modules/university/models/EntranceStatistic';
import {
    ProgramEgeExamInstance
} from '../api/modules/university/models/ProgramEgeExam';

type Hash<T> = {[key: string]: T};
type ProgramSimilar = {
    relatedProgramId: number;
    totalScore: number;
    budgetPlaces?: number;
    competition?: number;
};
type HashSimilar = {[key: string]: ProgramSimilar[]};


class InsertProgramSimilar {
    private hashSimilar_: HashSimilar;
    private hashTotalScore_: Hash<number>;
    private programs_: ProgramInstance[];
    private NUMBER_PROGRAM_SIMILAR_: number;

    constructor() {

    }

    public async start() {
        logger.info('-----START-----');
        this.NUMBER_PROGRAM_SIMILAR_ = 4;
        this.hashSimilar_ = {};
        this.hashTotalScore_ = {};
        try {
            await this.cleanTable();
            this.programs_ = await programService.getAllWithEgeAndStatistic();
            await this.buildHashTotalScore();
            this.buildData();
            ProgramSimilar.bulkCreate(this.getListForInsert());
        } catch (error) {
            console.log('Error=', error);
            logger.critical(error);
        }
        logger.info('-----THE END-----');
    }

    private buildData() {
        this.programs_.forEach((program: ProgramInstance) => {
            const subjectIds: number[] = this.getSubjectIds(program);
            this.setSimilarProgram(program, subjectIds);
        });
    }

    private setSimilarProgram(
        program: ProgramInstance,
        subjectIds: number[]
    ) {
        const hashSimilar: HashSimilar = this.hashSimilar_;
        const hashTotalScore: Hash<number> = this.hashTotalScore_;
        this.programs_.forEach((programAnother: ProgramInstance) => {
            const isNotEqualCity: boolean =
                program.university.cityId !== programAnother.university.cityId;
            if (program.id === programAnother.id || isNotEqualCity) {
                return;
            }
            const subjectIdsAnother: number[] = this.getSubjectIds(
                programAnother
            );
            if (this.isEqualSubject(subjectIds, subjectIdsAnother)) {
                if (!hashSimilar[program.id]) {
                    hashSimilar[program.id] = [];
                }
                // get statistic by last year
                const statistic: EntranceStatisticInstance | null =
                    lodash.maxBy(programAnother.entranceStatistics, 'year');
                const totalScore: number =
                    hashTotalScore[programAnother.commentGroupId];
                const data: ProgramSimilar = {
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

    private getListForInsert(): ProgramSimilarAttribute[] {
        const hash: HashSimilar = this.hashSimilar_;
        const programIds: string[] = Object.keys(hash);
        let res: ProgramSimilarAttribute[] = [];
        programIds.forEach((programId: string) => {
            const programsSimilar: ProgramSimilar[] = hash[programId];
            const partProgramsSimilar: ProgramSimilar[] = lodash.orderBy(
                programsSimilar,
                ['totalScore', 'budgetPlaces', 'competition'],
                ['desc', 'desc', 'desc']
            ).slice(0, this.NUMBER_PROGRAM_SIMILAR_);
            const prepare = (el: ProgramSimilar): ProgramSimilarAttribute => {
                return {
                    mainProgramId: Number(programId),
                    relatedProgramId: el.relatedProgramId,
                };
            };
            const data: ProgramSimilarAttribute[]
                = partProgramsSimilar.map(prepare);
            res = res.concat(data);
        });
        return res;
    }

    private async cleanTable() {
        const tableName: string = 'program_similar';
        const query: string = `
            DELETE FROM ${tableName};
            ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1;
        `;
        const option = {type: sequelize.QueryTypes.SELECT, raw: true};
        await sequelize.query(query, option);
    }

    // is equal ege subject
    private isEqualSubject(
        subjectId1: Array<number>,
        subjectId2: Array<number>
    ): boolean {
        if (!subjectId1.length && !subjectId2.length) {
            return false;
        }
        if (subjectId1.length !== subjectId2.length) {
            return false;
        }
        const hash: Hash<boolean> = {};
        let res: boolean = true;
        subjectId1.forEach((id: number) => hash[id] = true);
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


    private getSubjectIds(program: ProgramInstance): number[] {
        const list = function(ege: ProgramEgeExamInstance): number {
            return ege.subjectId;
        };
        return program.programEgeExams.map(list);
    }

    private getCommentGroupIds_(programs: ProgramInstance[]): number[] {
        return programs.map((program: ProgramInstance): number =>
            program.commentGroupId
        );
    }

    // build hash { commentGroupId: totalScore }
    private async buildHashTotalScore() {
        const hashTotalScore: Hash<number> = this.hashTotalScore_;
        const programIds: number[]
            = this.programs_.map(program => program.id);
        const commentGroupIds: number[]
            = this.getCommentGroupIds_(this.programs_);
        const programComments: ProgramCommentInstance[]
            = await programCommentService.getAllTotalScore(commentGroupIds);

        programComments.forEach((programComment: ProgramCommentInstance) => {
            const commentGroupId: number = programComment.commentGroupId;
            if (programComment.rating) {
                hashTotalScore[commentGroupId]
                    = programComment.rating.totalScore;
            } else {
                hashTotalScore[commentGroupId] = 0;
            }
        });
    }
};

commander
    .command('updateProgramSimilar')
    .action(async() => {
        const insertProgramSimilar = new InsertProgramSimilar();
        return await insertProgramSimilar.start();
    });

exports.Command;
