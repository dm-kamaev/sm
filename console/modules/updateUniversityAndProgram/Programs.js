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
// update programs
const logger = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
const program_1 = require("../../../api/modules/university/services/program");
const programMajor_1 = require("../../../api/modules/university/services/programMajor");
const BaseWorkWithProgram_1 = require("./BaseWorkWithProgram");
const Universities_1 = require("./Universities");
const promiseMethods_1 = require("../../../api/components/promiseMethods");
class Programs extends BaseWorkWithProgram_1.BaseWorkWithProgram {
    constructor(option) {
        super();
        option = option || {};
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
        this.universitiesInstance = new Universities_1.Universities();
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateParams();
            yield this.validateProgramMajor();
            this.extractPrograms_ = this.extractPrograms();
            this.validateDuplicateProgram(this.extractPrograms_);
        });
    }
    updateViaXlsx() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const programs = this.extractPrograms_;
                yield this.updatePrograms(programs);
                logger.info('Success programs updateViaXlsx');
            }
            catch (error) {
                console.log('Programs.updateViaXlsx => ', error);
                logger.critical('Programs.updateViaXlsx => ' + error);
            }
        });
    }
    // {"universityId::::programName": programId}
    getHashPrograms() {
        return __awaiter(this, void 0, void 0, function* () {
            const programsDb = yield program_1.service.getAll();
            const hashProgramDb = {};
            programsDb.forEach((program) => {
                const { universityId, name } = program;
                const key = this.uniteUniversityIdAndProgramName(universityId, name);
                hashProgramDb[key] = program.id;
            });
            return hashProgramDb;
        });
    }
    validateProgramMajor() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashProgramMajor = this.getHashProgramMajor_ = yield this.getHashProgramMajor();
            const programMajorColumn = this.hashColumn_.programMajor;
            let validateError = false;
            this.listProgram_.forEach((program, i) => {
                const programMajor = this.cleanWhiteSpace(program[programMajorColumn]);
                let errorText = '';
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
        });
    }
    validateParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashUniversities = this.hashUniversities_ =
                yield this.universitiesInstance.getHashUniversities();
            const { programName: programNameColumn, universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, specialtyСodificator: specialtyСodificatorColumn, } = this.hashColumn_;
            this.listProgram_.forEach((program, i) => {
                const universityName = program[universityNameColumn];
                const abbreviation = program[universityAbbreviationColumn];
                const programName = program[programNameColumn];
                const specialtyСodificator = program[specialtyСodificatorColumn];
                const key = this.uniteAbbrevationAndName(abbreviation, universityName);
                let errorText = '';
                if (!universityName) {
                    errorText = `University name is empty "${universityName}"`;
                }
                else if (!abbreviation) {
                    errorText =
                        `University abbreviation is empty "${abbreviation}"`;
                }
                else if (!programName) {
                    errorText = `Program name is empty "${programName}"`;
                }
                else if (!hashUniversities[key]) {
                    errorText =
                        `University is not found for
                    program name="${programNameColumn}"`;
                }
                else if (!specialtyСodificator) {
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
        });
    }
    validateDuplicateProgram(programsFromFile) {
        const uniqProgram = {};
        let validateError = false;
        programsFromFile.forEach((program) => {
            const key = this.uniteUniversityIdAndProgramName(program.universityId, program.name);
            if (!uniqProgram[key]) {
                uniqProgram[key] = true;
            }
            else {
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
    getHashProgramMajor() {
        return __awaiter(this, void 0, void 0, function* () {
            const programMajors = yield programMajor_1.service.getAll();
            const hashProgramMajor = {};
            programMajors.forEach((programMajor) => {
                const name = this.cleanWhiteSpace(programMajor.name);
                hashProgramMajor[name] = programMajor.id;
            });
            return hashProgramMajor;
        });
    }
    extractPrograms() {
        const hashUniversities = this.hashUniversities_;
        const hashProgramMajor = this.getHashProgramMajor_;
        const { programName: programNameColumn, universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, duration: durationColumn, descriptionProgram: descriptionProgramColumn, specialtyСodificator: specialtyСodificatorColumn, programMajor: programMajorColumn, programSite: programSiteColumn, exchangeProgram: exchangeProgramColumn, } = this.hashColumn_;
        const programs = this.listProgram_.map((program) => {
            const programName = this.cleanWhiteSpace(program[programNameColumn]);
            const duration = parseInt(program[durationColumn], 10);
            const description = this.cleanWhiteSpace(program[descriptionProgramColumn]);
            const specialty = this.cleanWhiteSpace(program[specialtyСodificatorColumn]);
            const name = this.cleanWhiteSpace(program[universityNameColumn]);
            const programSite = this.cleanWhiteSpace(program[programSiteColumn]);
            const abbreviation = program[universityAbbreviationColumn] || '';
            const programMajor = this.cleanWhiteSpace(program[programMajorColumn]);
            const exchangeProgram = this.cleanWhiteSpace(program[exchangeProgramColumn]);
            const key = this.uniteAbbrevationAndName(abbreviation, name);
            const data = {
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
            const oksoCode = this.getOksoCode(specialty);
            if (oksoCode) {
                data.oksoCode = oksoCode;
            }
            if (programSite) {
                data.links = [programSite];
            }
            if (exchangeProgram) {
                data.exchangeProgram = exchangeProgram;
            }
            return data;
        });
        // console.log('programs=', programs, programs.length);
        return programs;
    }
    updatePrograms(programsFromFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const programsDb = yield program_1.service.getAll();
            const hashProgramDb = {};
            programsDb.forEach((program) => {
                const { universityId, name } = program;
                const key = this.uniteUniversityIdAndProgramName(universityId, name);
                hashProgramDb[key] = program.id;
            });
            const update = (program) => {
                const key = this.uniteUniversityIdAndProgramName(program.universityId, program.name);
                const programId = hashProgramDb[key];
                let res = null;
                if (!programId) {
                    try {
                        res = program_1.service.create(program);
                    }
                    catch (error) {
                        console.log('Error: create =>', error);
                    }
                }
                else {
                    try {
                        res = program_1.service.update(programId, program);
                    }
                    catch (error) {
                        console.log('Error: update =>', error);
                    }
                }
                return res;
            };
            yield promiseMethods_1.promiseMethods.queue(update, programsFromFile);
        });
    }
    getOksoCode(specialty) {
        specialty = specialty || '';
        specialty = specialty.replace(/[а-я]/ig, '');
        const m = specialty.match(/\((.+)\)/);
        let oksoCode = (m && m[1]) ? m[1] : '';
        oksoCode = oksoCode.replace(/[\(\)]/g, '').trim();
        return oksoCode;
    }
}
exports.Programs = Programs;
;
