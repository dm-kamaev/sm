'use strict';

// author: dm-kamaev
// update entrance_statistic

const logger
    = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
import {
    EntranceStatisticAttribute,
} from '../../../api/modules/university/models/EntranceStatistic';
import {
    service as entranceStatisticService
} from '../../../api/modules/university/services/entranceStatistic';
import {
    ProgramInstance
} from '../../../api/modules/university/types/program';

import {BaseWorkWithProgram} from './BaseWorkWithProgram';
import {Universities} from './Universities';
import {Programs} from './Programs';

import {
    Hash,
    IUniversities,
    IPrograms,
    Columns
} from './types/updateUniverstyAndProgram';
import {promiseMethods} from '../../../api/components/promiseMethods';

export class EntranceStatistics extends BaseWorkWithProgram {
    private listProgram_: any[];
    private hashColumn_: Columns;
    private hashUniversities_: Hash<number>;
    private hashPrograms_: Hash<number>;
    private getHashProgramMajor_: Hash<number>;
    private universitiesInstance: IUniversities;
    private programsInstance: IPrograms;
    private STATISTIC_YEAR: number;

    constructor(option) {
        super();
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
        this.STATISTIC_YEAR = 2016;
        this.universitiesInstance = new Universities();
        this.programsInstance = new Programs();
    }

    public async validate() {
        await this.validateParams();
    }

    public async updateViaXlsx() {
        try {
            const statistics = this.extractStatistics();
            await this.updateStatistics(statistics);
            logger.info('success entranceStatistics updateViaXlsx');
        } catch (error) {
            console.log('EntranceStatistics.updateViaXlsx => ', error);
            logger.critical('EntranceStatistics.updateViaXlsx => ' + error);
        }
    }

    private async validateParams() {
        const hashUniversities
            = this.hashUniversities_ =
            await this.universitiesInstance.getHashUniversities();
        const hashPrograms
            = this.hashPrograms_ =
            await this.programsInstance.getHashPrograms();
        const {
            programName: programNameColumn,
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            specialtyСodificator: specialtyСodificatorColumn,
        } = this.hashColumn_;
        this.listProgram_.forEach((program, i) => {
            const universityName: string = program[universityNameColumn];
            const abbreviation: string = program[universityAbbreviationColumn];
            const programName: string = program[programNameColumn];
            const specialtyСodificator: string
                = program[specialtyСodificatorColumn];
            const universityKey: string =
                this.uniteAbbrevationAndName(abbreviation, universityName);
            const universityId: number = hashUniversities[universityKey] || 0;
            const programKey: string = this.uniteUniversityIdAndProgramName(
                universityId,
                programName
            );
            let errorText: string = '';
            if (!universityName) {
                errorText = `University name is empty "${universityName}"`;
            } else if (!abbreviation) {
                errorText =
                    `University abbreviation is empty "${abbreviation}"`;
            } else if (!programName) {
                errorText = `Program name is empty "${programName}"`;
            } else if (!universityId) {
                errorText =
                    `University is not found in db for
                    program name="${programNameColumn}"`;
            } else if (!hashPrograms[programKey]) {
                errorText =
                    `Program is not found in db for
                    program name="${programNameColumn}"`;
            } else if (!specialtyСodificator) {
                errorText =
                    `Specialty for program is not exist
                    specialty="${specialtyСodificator}"`;
            }
            if (errorText) {
                errorText += ` ${JSON.stringify(program, null, 2)}, row=${i}`;
                logger.critical(errorText);
                throw new Error(errorText);
            }
        });
    }

    private extractStatistics() {
        const hashPrograms = this.hashPrograms_;
        const hashUniversities = this.hashUniversities_;
        const {
            programName: programNameColumn,
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            competition: competitionColumn,
            budgetPlaces: budgetPlacesColumn,
            commercialPlaces: commercialPlacesColumn,
            cost: costColumn,
            egePassScore: egePassScoreColumn,
        } = this.hashColumn_;
        let statistics: EntranceStatisticAttribute[];
        statistics = this.listProgram_.map((
            program
        ): EntranceStatisticAttribute => {
            const programName: string = this.cleanWhiteSpace(
                program[programNameColumn]
            );
            const universityName: string = this.cleanWhiteSpace(
                program[universityNameColumn]
            );
            const abbreviation: string = this.cleanWhiteSpace(
                program[universityAbbreviationColumn]
            );
            const competition = this.getCompetition(
                program[competitionColumn]
            );
            const budgetPlaces = this.int(program[budgetPlacesColumn]);
            const commercialPlaces = this.int(program[commercialPlacesColumn]);
            const cost = this.int(program[costColumn]);
            const egePassScore = this.int(program[egePassScoreColumn]);
            const universityKey: string = this.uniteAbbrevationAndName(
                abbreviation,
                universityName
            );
            const universityId: number = hashUniversities[universityKey];
            const programKey: string = this.uniteUniversityIdAndProgramName(
                universityId,
                programName
            );
            const data: EntranceStatisticAttribute = {
                programId: hashPrograms[programKey],
                year: this.STATISTIC_YEAR,
            };
            if (competition) {
                data.competition = competition;
            }
            if (budgetPlaces) {
                data.budgetPlaces = budgetPlaces;
            }
            if (commercialPlaces) {
                data.commercialPlaces = commercialPlaces;
            }
            if (cost) {
                data.cost = cost;
            }
            if (cost) {
                data.egePassScore = egePassScore;
            }

            return data;
        });
        // console.log('statistics=', statistics, statistics.length);
        return statistics;
    }


    private async updateStatistics(
        statisticsFromFile: EntranceStatisticAttribute[]
    ) {
        const statisticsDb: EntranceStatisticAttribute[] =
            await entranceStatisticService.getAll();
        const hashStatisticDb: Hash<number> = {};
        statisticsDb.forEach((statistic: EntranceStatisticAttribute) => {
            const { id, programId, year } = statistic;
            const key: string
                = this.uniteProgramIdAndYear(programId, year);
            hashStatisticDb[key] = id;
        });

        const update = (statistic: EntranceStatisticAttribute) => {
            const key: string = this.uniteProgramIdAndYear(
                statistic.programId,
                statistic.year
            );
            const statisticId: number | null = hashStatisticDb[key];
            let res = null;
            if (!statisticId) {
                try {
                    // console.log('INSERT');
                    res = entranceStatisticService.create(statistic);
                } catch (error) {
                    console.log('Error: create =>', error);
                }
            } else {
                try {
                    // console.log('UPDATE');
                    res = entranceStatisticService.update(
                        statisticId,
                        statistic
                    );
                } catch (error) {
                    console.log('Error: update =>', error);
                }
            }
            return res;
        };
        await promiseMethods.queue(update, statisticsFromFile);
    }

    private getCompetition(str: string): number {
        let res: number;
        let num: number | string = this.float(str);
        if (num > 1000) {
            num = num.toString();
            // convert 18266 to 18,266
            res = Number(num.replace(/^(\d{2})/, '$1.'));
            // console.log(str, res);
        } else {
            res = num;
        }
        return res;
    }

    private int(str: string): number {
        const res = parseInt(str, 10);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }

    private float(str: string): number {
        if (typeof str === 'string') {
            str = str.replace(/\,/g, '.');
        }
        const res = parseFloat(str);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }

};
