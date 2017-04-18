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
import {
    service as programMajorService
} from '../../../api/modules/university/services/programMajor';

import {BaseWorkWithProgram} from './BaseWorkWithProgram';

import {Hash} from './types/updateUniverstyAndProgram';

export class Programs extends BaseWorkWithProgram {
    private listProgram_: any[];
    private hashColumn_: Hash<string>;
    private hashUniversities_: Hash<number>;

    constructor(option) {
        super();
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
    }

    public async validate() {
        // await this.validateUniversityAndProgramName();
        await this.validateProgramMajor();
    }

    public async updateViaXlsx() {
        try {
            const program = await this.extractPrograms();
            // TODO: Filter all program without name and duration 2
            // await this.updateUniversities(universities);
        } catch (error) {
            logger.critical('Programs.updateViaXlsx => ' + error);
        }
    }

    private async validateProgramMajor() {
        const hashProgramMajor: Hash<number> = await this.getHashProgramMajor();
        const {
            programMajor: programMajorColumn,
        } = this.hashColumn_;
        let validateError: boolean = false;
        console.log(hashProgramMajor);
        console.log('++++++++');
        const not = {};
        this.listProgram_.forEach((program, i) => {
            const programMajor: string
                = this.cleanWhiteSpace(program[programMajorColumn]);
            let errorText: string = '';
            if (!hashProgramMajor[programMajor]) {
                // console.log('|'+programMajor+'|');
                not[programMajor] = true;
                validateError = true;
                errorText =
                    `Program major name is not exist in db: "${programMajor}"
                    ${JSON.stringify(program, null, 2)}, row=${i}`;
                logger.critical(errorText);
            }
        });
        if (validateError) {
            console.log(not);
            throw new Error('Program Majors are invalid');
        }
    }

    private async validateUniversityAndProgramName() {
        const hashUniversities
            = this.hashUniversities_ = await this.getHashUniversities();
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

    private async getHashProgramMajor(): Promise<Hash<number>> {
        const programMajors = await programMajorService.getAll();
        const hashProgramMajor: Hash<number> = {};
        programMajors.forEach((programMajor) => {
            const name: string = this.cleanWhiteSpace(programMajor.name);
            hashProgramMajor[name] = programMajor.id;
        });
        return hashProgramMajor;
    }


    private async extractPrograms() {
        const hashUniversities: Hash<number> = this.hashUniversities_;
        const {
            programName: programNameColumn,
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            duration: durationColumn,
            descriptionProgram: descriptionProgramColumn,
            specialtyСodificator: specialtyСodificatorColumn,
        } = this.hashColumn_;
        const programs = this.listProgram_.map((program) => {
            const programName: string =
                this.cleanWhiteSpace(program[programNameColumn]);
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
            // TODO: remove in future
            if (!programName) {
                return null;
            }
            const data: any = {
                name: programName,
                universityId: hashUniversities[key],
            };
            if (description) {
                data.description = description;
            }
            if (duration) {
                data.duration = duration;
            }
            const oksoCode: string = this.getOksoCode(specialty);
            if (oksoCode) {
                data.oksoCode = oksoCode;
            }
            return data;
        });
        console.log('programs=', programs, programs.length);
    }

    private getOksoCode(specialty: string): string {
        specialty = specialty || '';
        specialty = specialty.replace(/[а-я]/ig, '');
        const m = specialty.match(/\((.+)\)/);
        // console.log('OksoCode=', m[1]);
        return (m && m[1]) ? m[1] : '';
    }

    // TODO: remove to another class
    private async getHashUniversities(): Promise<Hash<number>> {
        const universitiesDb = await universityService.getAll();
        const hashUniverDb: Hash<number> = {};
        universitiesDb.forEach((university) => {
            const {abbreviation, name} = university;
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            hashUniverDb[key] = university.id;
        });
        return hashUniverDb;
    }

};
