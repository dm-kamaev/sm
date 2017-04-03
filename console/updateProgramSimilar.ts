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

type BooleanHash = { [ key: string ]: boolean; };
type ProgramSimilar = {
    relatedProgramId: number,
    budgetPlaces: number,
    competition: number,
};
type HashSimilar = {
    [key: string]: Array<ProgramSimilar>
};

// TODO: Add types

class InsertProgramSimilar {
    private hashSimilar_: HashSimilar;
    private programs_: ProgramInstance[];
    private NUMBER_PROGRAM_SIMILAR_: number;

    constructor() {
        // code...
    }

    public async start() {
        logger.info('-----START-----');
        this.NUMBER_PROGRAM_SIMILAR_ = 4;
        this.hashSimilar_ = {};
        await this.cleanTable_();
        this.programs_ = await programService.getAllWithEgeAndStatistic({
            year: 2016
        });
        // console.log('programs=', programs);
        // console.log('++++++++++++++++++++++');
        this.build_data_();
        ProgramSimilar.bulkCreate(this.getListForInsert_());
        // console.log('entranceStatistics=', programs[0].entranceStatistics);
        // console.log('programEgeExams=',    programs[0].programEgeExams);
        logger.info('-----THE END-----');
    }

    private build_data_() {
        this.programs_.forEach((program: ProgramInstance) => {
            const subjectIds: Array<number> = this.getSubjectIds_(program);
            this.set_similar_program_(program, subjectIds);
        });
        console.log('hash', this.hashSimilar_);
    }

    private set_similar_program_(
        program: ProgramInstance,
        subjectIds: Array<number>
    ) {
        const hash = this.hashSimilar_;
        this.programs_.forEach((programAnother: ProgramInstance) => {
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

    private getListForInsert_(): ProgramSimilarAttribute[] {
        const hash: HashSimilar = this.hashSimilar_;
        const programIds: string[] = Object.keys(hash);
        let res: ProgramSimilarAttribute[] = [];
        programIds.forEach((programId: string) => {
            const programsSimilar: ProgramSimilar[] = hash[programId];
            const partProgramsSimilar: ProgramSimilar[] = lodash.orderBy(
                programsSimilar,
                ['budgetPlaces', 'competition'],
                ['desc', 'desc']
            ).slice(0, this.NUMBER_PROGRAM_SIMILAR_);
            const prepare = (el: ProgramSimilar): ProgramSimilarAttribute => {
                return {
                    mainProgramId: Number(programId),
                    relatedProgramId: el.relatedProgramId,
                };
            };
            const data: ProgramSimilarAttribute[] = partProgramsSimilar.map(prepare);
            console.log('+++++++++++++++++++')
            // console.log(programsSimilar);
            console.log(programId, ' –– \n', data);
            console.log('+++++++++++++++++++')
            res = res.concat(data);
        });
        // console.log(res);
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
        subjectId1: Array<number>,
        subjectId2: Array<number>
    ): boolean {
        if (!subjectId1.length && !subjectId2.length) {
            return false;
        }
        if (subjectId1.length !== subjectId2.length) {
            return false;
        }
        const hash: BooleanHash = {};
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
