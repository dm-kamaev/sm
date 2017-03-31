'use strict';

// author: dm-kamaev
// update similar program for everyone program

const commander = require('commander');
import * as lodash from 'lodash';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
import {
    service as programService
} from '../api/modules/university/services/program';
import {
    Model as ProgramSimilar
} from '../api/modules/university/models/ProgramSimilar';
import {
    ProgramInstance
} from '../api/modules/university/types/program';
import {
    EntranceStatisticInstance
} from '../api/modules/university/models/EntranceStatistic';
import {
    ProgramEgeExamInstance
} from '../api/modules/university/models/ProgramEgeExam';

type BooleanHash = { [ key: string ]: boolean; };

// TODO: Add types

class InsertProgramSimilar {
    private hash_: any;
    private programs_: ProgramInstance[];
    private NUMBER_PROGRAM_SIMILAR_: number;

    constructor() {
        // code...
    }

    public async start() {
        logger.info('-----START-----');
        this.NUMBER_PROGRAM_SIMILAR_ = 4;
        this.hash_ = {};
        await this.cleanTable_();
        this.programs_ = await programService.getAllWithEgeAndStatistic({
            year: 2016
        });
        // console.log('programs=', programs);
        // console.log('++++++++++++++++++++++');
        this.build_();
        const programSimilar = this.getListForInsert_();
        ProgramSimilar.bulkCreate(programSimilar);
        // console.log('entranceStatistics=', programs[0].entranceStatistics);
        // console.log('programEgeExams=',    programs[0].programEgeExams);
        logger.info('-----THE END-----');
    }

    private build_() {
        this.programs_.forEach((program) => {
            const subjectIds: Array<number> = this.getSubjectIds_(program);
            this.set_(program, subjectIds);
        });
        console.log('hash', this.hash_);
    }

    private set_(program, subjectIds) {
        const hash = this.hash_;
        this.programs_.forEach((programAnother) => {
            if (program.id === programAnother.id) {
                return;
            }
            const subjectIdsAnother: Array<number>
                = this.getSubjectIds_(programAnother);
            if (this.compareEgeSubject_(subjectIds, subjectIdsAnother)) {
                // console.log('HERE', program.id, programAnother);
                if (!hash[program.id]) {
                    hash[program.id] = [];
                }
                // hash[program.id].push(programAnother);
                const entranceStatistic: EntranceStatisticInstance
                    = programAnother.entranceStatistics[0];
                if (entranceStatistic) {
                    const statistic =
                        entranceStatistic as EntranceStatisticInstance;
                    hash[program.id].push({
                        relatedProgramId: programAnother.id,
                        budgetPlaces: statistic.budgetPlaces || 0,
                        competition: statistic.competition || 0,
                    });
                }

            }
        });
        // program.entranceStatistics
        // program.programEgeExams

    }

    private getListForInsert_() {
        const hash = this.hash_,
            programIds: Array<string> = Object.keys(hash);
        let res: Array<{ mainProgramId: number, relatedProgramId: any }> = [];
        programIds.forEach((programId: string) => {
            const programsSimilar = hash[programId];
            const ar = lodash.orderBy(
                programsSimilar,
                ['budgetPlaces', 'competition'],
                ['desc', 'desc']
            ).slice(0, this.NUMBER_PROGRAM_SIMILAR_);
            const data = ar.map((el: any) => {
                return {
                    mainProgramId: Number(programId),
                    relatedProgramId: el.relatedProgramId,
                };
            });
            res = res.concat(data);
        });
        console.log(res);
        return res;
    }

    private async cleanTable_() {
        const tableName: string = 'program_similar';
        const query: string = `
            DELETE FROM ${tableName};
            ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1;
        `;
        const option = {type: sequelize.QueryTypes.SELECT, raw: true};
        await sequelize.query(query, option);
    }


    private compareEgeSubject_(
        egeId1: Array<number>,
        egeId2: Array<number>
    ): boolean {
        if (!egeId1.length && !egeId2.length) {
            return false;
        }
        if (egeId1.length !== egeId2.length) {
            return false;
        }
        const hash: BooleanHash = {};
        let res: boolean = true;
        egeId1.forEach((id: number) => hash[id] = true);
        // stupid linter !!!! for let i in circle
        /* tslint:disable */
        for (let i = 0, l = egeId2.length; i < l; i++) {
        /* tslint:enable */
          if (!hash[egeId2[i]]) {
            res = false;
            break;
          }
        }
        return res;
    }


    private getSubjectIds_(program: ProgramInstance): Array<number> {
        const list = function(ege: ProgramEgeExamInstance): number {
            return ege.subjectId;
        };
        return program.programEgeExams.map(list);
    }
};

commander
    .command('updateProgramSimilar')
    .action(async() => {
        const insertProgramSimilar = new InsertProgramSimilar();
        return await insertProgramSimilar.start();
    });

exports.Command;
