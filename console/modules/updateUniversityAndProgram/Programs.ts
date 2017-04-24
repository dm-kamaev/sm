'use strict';

// author: dm-kamaev
// update programs

const logger
    = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
import {
    service as programService
} from '../../../api/modules/university/services/program';
import {
    ProgramInstance,
    ProgramAttribute
} from '../../../api/modules/university/types/program';
import {
    service as programMajorService
} from '../../../api/modules/university/services/programMajor';

import {BaseWorkWithProgram} from './BaseWorkWithProgram';
import {Universities} from './Universities';

import {Hash, IUniversities} from './types/updateUniverstyAndProgram';
import {promiseMethods} from '../../../api/components/promiseMethods';

export class Programs extends BaseWorkWithProgram {
    private listProgram_: any[];
    private hashColumn_: Hash<string>;
    private hashUniversities_: Hash<number>;
    private getHashProgramMajor_: Hash<number>;
    private universitiesInstance: IUniversities;

    constructor(option?) {
        super();
        option = option || {};
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
        this.universitiesInstance = new Universities();
    }

    public async validate() {
        await this.validateParams();
        await this.validateProgramMajor();
        this.validateDuplicateProgram(
            this.extractPrograms()
        );
    }

    public async updateViaXlsx() {
        try {
            const programs = this.extractPrograms();
            await this.updatePrograms(programs);
            logger.info('Success programs updateViaXlsx');
        } catch (error) {
            console.log('Programs.updateViaXlsx => ', error);
            logger.critical('Programs.updateViaXlsx => ' + error);
        }
    }

    // {"universityId::::programName": programId}
    public async getHashPrograms(): Promise<Hash<number>> {
        const programsDb: ProgramInstance[] =
            await programService.getAll();
        const hashProgramDb: Hash<number> = {};
        programsDb.forEach((program: ProgramInstance) => {
            const {universityId, name} = program;
            const key: string
                = this.uniteUniversityIdAndProgramName(universityId, name);
            hashProgramDb[key] = program.id;
        });
        return hashProgramDb;
    }


    private async validateProgramMajor() {
        const hashProgramMajor: Hash<number> =
            this.getHashProgramMajor_ = await this.getHashProgramMajor();
        const programMajorColumn: string = this.hashColumn_.programMajor;
        let validateError: boolean = false;
        this.listProgram_.forEach((program, i) => {
            const programMajor: string
                = this.cleanWhiteSpace(program[programMajorColumn]);
            let errorText: string = '';
            if (!programMajor || !hashProgramMajor[programMajor]) {
                validateError = true;
                errorText =
                    `Program major name is not exist in db: "${programMajor}"
                    ${JSON.stringify(program, null, 2)}, row=${i}`;
                logger.critical(errorText);
            }
        });
        if (validateError) {
            throw new Error('Program Majors are invalid');
        }
    }

    private async validateParams() {
        const hashUniversities
            = this.hashUniversities_ =
            await this.universitiesInstance.getHashUniversities();
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


    private validateDuplicateProgram(programsFromFile: ProgramAttribute[]) {
        const uniqProgram: Hash<boolean> = {};
        let validateError: boolean = false;
        programsFromFile.forEach((program: ProgramAttribute) => {
            const key: string = this.uniteUniversityIdAndProgramName(
                program.universityId,
                program.name
             );
            if (!uniqProgram[key]) {
                uniqProgram[key] = true;
            } else {
                validateError = true;
                logger.critical(`
                    Program duplicate
                    ${JSON.stringify(program, null, 2)}
                `);
            }
        });
        if (validateError) {
            throw new Error('Programs are not valid');
        }
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


    private extractPrograms(): ProgramAttribute[] {
        const hashUniversities: Hash<number> = this.hashUniversities_;
        const hashProgramMajor: Hash<number> = this.getHashProgramMajor_;
        const {
            programName: programNameColumn,
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            duration: durationColumn,
            descriptionProgram: descriptionProgramColumn,
            specialtyСodificator: specialtyСodificatorColumn,
            programMajor: programMajorColumn
        } = this.hashColumn_;
        const programs = this.listProgram_.map((program) => {
            const programName: string =
                this.cleanWhiteSpace(program[programNameColumn]);
            const duration: number = parseInt(program[durationColumn], 10);
            const description: string =
                this.cleanWhiteSpace(program[descriptionProgramColumn]);
            const specialty: string
                = program[specialtyСodificatorColumn] || '';
            const name: string = program[universityNameColumn] || '';
            const abbreviation: string =
                program[universityAbbreviationColumn] || '';
            const programMajor: string =
                this.cleanWhiteSpace(program[programMajorColumn]);
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);

            const data: ProgramAttribute = {
                name: programName,
                universityId: hashUniversities[key],
                programMajorId: hashProgramMajor[programMajor],
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
        // console.log('programs=', programs, programs.length);
        return programs;
    }


    private async updatePrograms(programsFromFile: ProgramAttribute[]) {
        const programsDb: ProgramInstance[] =
            await programService.getAll();
        const hashProgramDb: Hash<number> = {};
        programsDb.forEach((program: ProgramInstance) => {
            const {universityId, name} = program;
            const key: string
                = this.uniteUniversityIdAndProgramName(universityId, name);
            hashProgramDb[key] = program.id;
        });

        const update = (program: ProgramAttribute) => {
            const key: string = this.uniteUniversityIdAndProgramName(
                program.universityId,
                program.name
             );
            const programId: number | null = hashProgramDb[key];
            let res = null;
            if (!programId) {
                try {
                    res = programService.create(program);
                } catch (error) {
                    console.log('Error: create =>', error);
                }
            } else {
                try {
                    res = programService.update(programId, program);
                } catch (error) {
                    console.log('Error: update =>', error);
                }
            }
            return res;
        };
        await promiseMethods.queue(update, programsFromFile);
    }

    private getOksoCode(specialty: string): string {
        specialty = specialty || '';
        specialty = specialty.replace(/[а-я]/ig, '');
        const m = specialty.match(/\((.+)\)/);
        let oksoCode: string = (m && m[1]) ? m[1] : '';
        oksoCode = oksoCode.replace(/[\(\)]/g, '').trim();
        return oksoCode;
    }

};
