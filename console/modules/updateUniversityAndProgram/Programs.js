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
const logger = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
const university_1 = require("../../../api/modules/university/services/university");
class Programs {
    constructor(option) {
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashUniversities = this.hashUniversities_ = yield this.getHashUniversities();
            const { programName: programNameColumn, universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, } = this.hashColumn_;
            this.listProgram_.forEach((program, i) => {
                const universityName = program[universityNameColumn];
                const abbreviation = program[universityAbbreviationColumn];
                const programName = program[programNameColumn];
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
                if (errorText) {
                    errorText += ` ${JSON.stringify(program, null, 2)}, row=${i}`;
                    logger.critical(errorText);
                    throw new Error(errorText);
                }
            });
        });
    }
    // private validateUniversityAndProgram() {}
    // private validateProgramMajor() {}
    updateViaXlsx() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const program = yield this.extractPrograms();
                // await this.updateUniversities(universities);
            }
            catch (error) {
                console.log('ERROR=', error);
            }
        });
    }
    extractPrograms() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashUniversities = this.hashUniversities_;
            const { programName: programNameColumn, universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, duration: durationColumn, descriptionProgram: descriptionProgramColumn, specialtyСodificator: specialtyСodificatorColumn, } = this.hashColumn_;
            const programs = this.listProgram_.map((program) => {
                const programName = program[programNameColumn] || '';
                const duration = parseInt(program[durationColumn], 10);
                const description = this.cleanWhiteSpace(program[descriptionProgramColumn]);
                const specialty = program[specialtyСodificatorColumn] || '';
                const name = program[universityNameColumn] || '';
                const abbreviation = program[universityAbbreviationColumn] || '';
                const key = this.uniteAbbrevationAndName(abbreviation, name);
                const data = {
                    name: programName,
                    universityId: hashUniversities[key],
                };
                if (duration) {
                    data.duration = duration;
                }
                if (duration) {
                    data.description = description;
                }
                const oksoCode = this.getOksoCode(specialty);
                if (oksoCode) {
                    data.oksoCode = oksoCode;
                }
                return data;
                // programs.push(data);
            });
            console.log('programs=', programs, programs.length);
        });
    }
    getOksoCode(specialty) {
        specialty = specialty || '';
        specialty = specialty.replace(/[а-я]/ig, '');
        const m = specialty.match(/\((.+)\)/);
        // console.log('OksoCode=', m[1]);
        return (m && m[1]) ? m[1] : '';
    }
    // TODO: remove to another class
    getHashUniversities() {
        return __awaiter(this, void 0, void 0, function* () {
            const universitiesDb = yield university_1.service.getAll();
            const hashUniverDb = {};
            universitiesDb.forEach((university) => {
                const { abbreviation, name } = university;
                const key = this.uniteAbbrevationAndName(abbreviation, name);
                hashUniverDb[key] = university.id;
            });
            return hashUniverDb;
        });
    }
    // TODO: remove to another class
    uniteAbbrevationAndName(abbreviation, name) {
        return this.cleanWhiteSpace(abbreviation) +
            '::::' +
            this.cleanWhiteSpace(name);
    }
    // TODO: remove to another class
    cleanWhiteSpace(str) {
        str = str || '';
        return str.replace(/\s+/g, ' ').trim();
    }
}
exports.Programs = Programs;
;
