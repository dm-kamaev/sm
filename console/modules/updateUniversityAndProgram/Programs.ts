'use strict';

// author: dm-kamaev
// update programs

import * as lodash from 'lodash';
const logger
    = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
import {
    service as universityService
} from '../../../api/modules/university/services/university';
import {
    service as programService
} from '../../../api/modules/university/services/program';

type BooleanHash = {[key: string]: boolean;};
type HashNumber = {[key: string]: number;};
type HashString = {[key: string]: number;};


export class Programs {
    private listProgram_: any[];
    private hashColumn_: HashString;
    private hashUniversities_: HashNumber;

    constructor(option) {
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
    }

    public async validate() {
        const hashUniversities
            = this.hashUniversities_ = await this.getHashUniversities();
        const {
            programName: programNameColumn,
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
        } = this.hashColumn_;
        this.listProgram_.forEach((program, i) => {
            const universityName: string = program[universityNameColumn];
            const abbreviation: string = program[universityAbbreviationColumn];
            const programName: string = program[programNameColumn];
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, universityName);
            let errorText: string = '';
            if (!universityName) {
                errorText = `University name is empty "${universityName}"`;
            } else if (!abbreviation) {
                errorText =
                    `University abbreviation is empty "${abbreviation}"`;
            } else if (!programName) {
                errorText = `Program name is empty "${programName}"`;
            } else if (!hashUniversities[key]) {
                errorText =
                    `University is not found for
                    program name="${programNameColumn}"`;
            }
            if (errorText) {
                errorText += ` ${JSON.stringify(program, null, 2)}, row=${i}`;
                logger.critical(errorText);
                throw new Error(errorText);
            }
        });
    }

    // private validateUniversityAndProgram() {}
    // private validateProgramMajor() {}

    public async updateViaXlsx() {
        try {
            const program = await this.extractPrograms();
            // await this.updateUniversities(universities);
        } catch (error) {
            console.log('ERROR=', error);
        }
    }

    private async extractPrograms() {
        const hashUniversities: HashNumber = this.hashUniversities_;
        const {
            programName: programNameColumn,
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            duration: durationColumn,
            descriptionProgram: descriptionProgramColumn,
            specialtyСodificator: specialtyСodificatorColumn,
        } = this.hashColumn_;
        const programs = this.listProgram_.map((program) => {
            const programName: string = program[programNameColumn] || '';
            const duration: number = parseInt(program[durationColumn], 10);
            const description: string
                = this.cleanWhiteSpace(program[descriptionProgramColumn]);
            const specialty: string
                = program[specialtyСodificatorColumn] || '';
            const name: string = program[universityNameColumn] || '';
            const abbreviation: string
                = program[universityAbbreviationColumn] || '';
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            const data: any = {
                name: programName,
                universityId: hashUniversities[key],
            };
            if (duration) {
                data.duration = duration;
            }
            if (duration) {
                data.description = description;
            }
            const oksoCode: string = this.getOksoCode(specialty);
            if (oksoCode) {
                data.oksoCode = oksoCode;
            }
            return data;
            // programs.push(data);
        });
        console.log('programs=', programs, programs.length);
    }

    private getOksoCode(specialty): string {
        specialty = specialty || '';
        specialty = specialty.replace(/[а-я]/ig, '');
        const m = specialty.match(/\((.+)\)/);
        // console.log('OksoCode=', m[1]);
        return (m && m[1]) ? m[1] : '';
    }

    // TODO: remove to another class
    private async getHashUniversities(): Promise<HashNumber> {
        const universitiesDb = await universityService.getAll();
        const hashUniverDb: HashNumber = {};
        universitiesDb.forEach((university) => {
            const {abbreviation, name} = university;
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            hashUniverDb[key] = university.id;
        });
        return hashUniverDb;
    }

    // TODO: remove to another class
    private uniteAbbrevationAndName(abbreviation, name): string {
        return this.cleanWhiteSpace(abbreviation) +
               '::::' +
               this.cleanWhiteSpace(name);
    }

    // TODO: remove to another class
    private cleanWhiteSpace(str: string): string {
        str = str || '';
        return str.replace(/\s+/g, ' ').trim();
    }

};
