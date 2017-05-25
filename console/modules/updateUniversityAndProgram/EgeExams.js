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
// update program.extra_exam and update table programEge
const logger = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
const services = require('../../../app/components/services').all;
const promiseMethods_1 = require("../../../api/components/promiseMethods");
const program_1 = require("../../../api/modules/university/services/program");
const programEgeExam_1 = require("../../../api/modules/university/services/programEgeExam");
const BaseWorkWithProgram_1 = require("./BaseWorkWithProgram");
class EgeExams extends BaseWorkWithProgram_1.BaseWorkWithProgram {
    constructor(option) {
        super();
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
        this.formatEgeExam_ = option.formatEgeExam_ || 'default';
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateParams();
            yield this.validateEgeSubject();
        });
    }
    updateViaXlsx() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const egeExams = yield this.extractEgeExams();
                this.uniqueEgeExams(egeExams);
                yield this.updateExtraExam(egeExams);
                yield this.updateProgramEgeExam(egeExams);
                logger.info(`success egeExams updateViaXlsx`);
            }
            catch (error) {
                console.log('EgeExams.updateViaXlsx => ', error);
                logger.critical('EgeExams.updateViaXlsx => ' + error);
            }
        });
    }
    validateParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashUniverProgram = this.hashUniverProgram_ =
                yield this.getHashUniverProgram();
            const { universityAbbreviation: universityAbbreviationColumn, programName: programNameColumn, } = this.hashColumn_;
            this.listProgram_ = this.listProgram_.filter((program, i) => {
                const abbreviation = program[universityAbbreviationColumn];
                const programName = program[programNameColumn];
                const key = this.uniteAbbrevationAndName(abbreviation, programName);
                const programId = hashUniverProgram[key];
                let errorText = '';
                if (!programName) {
                    errorText = `Program name is empty "${programName}"`;
                }
                else if (!abbreviation) {
                    errorText =
                        `University abbreviation is empty "${abbreviation}"`;
                }
                else if (!programId) {
                    errorText =
                        `Program is not found in db for
                    program name="${programName}"`;
                }
                if (errorText) {
                    errorText += ` ${JSON.stringify(program, null, 2)}, row=${i}`;
                    // logger.critical(errorText);
                    return false;
                }
                return true;
            });
        });
    }
    getHashUniverProgram() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                u.abbreviation,
                p.name as "programName",
                p.id as "programId"
            FROM university as u
            LEFT JOIN program as p ON u.id = p.university_id
        `;
            const universityProgram = yield sequelize.query(query, { type: sequelize.QueryTypes.SELECT, raw: true });
            const hashUniversityProgram = {};
            universityProgram.forEach((univerProgram) => {
                const key = this.uniteAbbrevationAndName(univerProgram.abbreviation, univerProgram.programName);
                hashUniversityProgram[key] = univerProgram.programId;
            });
            return hashUniversityProgram;
        });
    }
    validateEgeSubject() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashSubject = this.hashSubject_ = yield this.getHashSubject();
            const hashUniverProgram = this.hashUniverProgram_;
            const { ege: egeColumn, extraExam: extraExamColumn } = this.hashColumn_;
            const notExistSubject = {};
            this.listProgram_.forEach((program, i) => {
                let eges = this.cleanWhiteSpace(program[egeColumn]);
                eges = this.getListEge(eges);
                // let extraExam: string | string[] =
                //     this.cleanWhiteSpace(program[extraExamColumn]);
                // extraExam = this.getListExtraExam(extraExam);
                // if (!eges.length) {
                //     console.log('+++++++++++++++++');
                //     console.log(eges);
                //     console.log(program);
                // }
                // if (extraExam.length === 1) {
                // if (extraExam[0] === '') {
                // console.log('+++++++++++++++++');
                // console.log(extraExam);
                // console.log(program);
                // }
                const checkEvery = (subject) => {
                    // console.log('subject=', subject);
                    const key = this.cleanWhiteSpace(subject).toLowerCase();
                    // console.log('key=', key);
                    if (!hashSubject[key]) {
                        notExistSubject[subject] = true;
                        errorText =
                            `Subject is not found in db
                            subject="${subject}"`;
                        if (errorText) {
                            errorText += ` ${JSON.stringify(program, null, 2)},
                                       row=${i}`;
                            logger.critical(errorText);
                        }
                    }
                };
                let errorText = '';
                eges.forEach(checkEvery);
            });
            const subjectNames = Object.keys(notExistSubject);
            if (subjectNames.length) {
                logger.critical('List not exist subject: ', subjectNames.join('", "'));
                throw new Error('Ege"s subjects are not valid');
            }
        });
    }
    uniqueEgeExams(egeExamFromFile) {
        const uniqProgramSubject = {};
        egeExamFromFile.forEach(egeExam => {
            const programId = egeExam.programId;
            const egeInfo = egeExam.egeInfo;
            if (egeInfo) {
                egeExam.egeInfo = egeInfo.filter((ege) => {
                    let res;
                    const key = this.uniteProgramIdAndSubjectId(programId, ege.subjectId);
                    if (uniqProgramSubject[key]) {
                        res = false;
                    }
                    else {
                        uniqProgramSubject[key] = true;
                        res = true;
                    }
                    return res;
                });
            }
        });
    }
    getHashSubject() {
        return __awaiter(this, void 0, void 0, function* () {
            const subjects = yield services.subject.getAll();
            const hashSubject = {};
            subjects.forEach((subject) => {
                hashSubject[subject.name] = subject.id;
            });
            return hashSubject;
        });
    }
    extractEgeExams() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashUniverProgram = this.hashUniverProgram_;
            const hashProgramEge = this.hashProgramEge_ = yield this.getHashProgramEge();
            const hashSubject = this.hashSubject_;
            const { universityAbbreviation: universityAbbreviationColumn, programName: programNameColumn, ege: egeColumn, extraExam: extraExamColumn, } = this.hashColumn_;
            const egeExams = this.listProgram_.map((program) => {
                const programName = this.cleanWhiteSpace(program[programNameColumn]);
                const abbreviation = this.cleanWhiteSpace(program[universityAbbreviationColumn]);
                const key = this.uniteAbbrevationAndName(abbreviation, programName);
                let extraExam = this.cleanWhiteSpace(program[extraExamColumn]);
                extraExam = this.getListExtraExam(extraExam);
                let eges = this.cleanWhiteSpace(program[egeColumn]);
                eges = this.getListEge(eges);
                const programId = hashUniverProgram[key];
                const egeInfo = eges.map((subject) => {
                    const subjectId = hashSubject[subject.toLowerCase()];
                    return {
                        subjectId,
                        subjectName: subject,
                    };
                });
                const data = {
                    programId,
                };
                if (extraExam.length) {
                    data.extraExam = extraExam;
                }
                if (egeInfo.length) {
                    data.egeInfo = egeInfo;
                }
                return data;
            });
            return egeExams;
        });
    }
    updateExtraExam(egeExamsFromFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = (egeExam) => __awaiter(this, void 0, void 0, function* () {
                const programId = egeExam.programId;
                const extraExam = egeExam.extraExam;
                if (!extraExam) {
                    return;
                }
                yield program_1.service.update(programId, {
                    extraExam,
                });
            });
            yield promiseMethods_1.promiseMethods.queue(update, egeExamsFromFile);
        });
    }
    updateProgramEgeExam(egeExamsFromFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = (egeExam) => __awaiter(this, void 0, void 0, function* () {
                const programId = egeExam.programId;
                const egeInfo = egeExam.egeInfo;
                if (!egeInfo) {
                    return;
                }
                yield promiseMethods_1.promiseMethods.queue((ege) => {
                    return this.createOrUpdateEge(ege, programId);
                }, egeInfo);
            });
            yield promiseMethods_1.promiseMethods.queue(update, egeExamsFromFile);
        });
    }
    createOrUpdateEge(ege, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            const hashProgramEge = this.hashProgramEge_;
            const subjectId = ege.subjectId;
            const key = this.uniteProgramIdAndSubjectId(programId, subjectId);
            const programEgeId = hashProgramEge[key];
            if (!subjectId) {
                return;
            }
            if (!programEgeId) {
                try {
                    res = yield programEgeExam_1.service.create({
                        programId,
                        subjectId
                    });
                }
                catch (error) {
                    logger.critical('programEge.create =>', error);
                }
            }
            else {
                try {
                    res = yield programEgeExam_1.service.update(programEgeId, {
                        programId,
                        subjectId
                    });
                }
                catch (error) {
                    logger.critical('programEge.update =>', error);
                }
            }
            return res;
        });
    }
    getHashProgramEge() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashProgramEge = {};
            const programEgeExam = yield programEgeExam_1.service.getAll();
            programEgeExam.forEach((programEge) => {
                const { programId, subjectId } = programEge;
                const key = this.uniteProgramIdAndSubjectId(programId, subjectId);
                hashProgramEge[key] = programEge.id;
            });
            return hashProgramEge;
        });
    }
    // str ––
    // '"ЕГЭМатематика-27Обществознание-42Русский язык-36
    // 1 вариант ЕГЭМатематика-от27Обществознание-от42Русский язык-от36"'
    // return ['Математика', 'Обществознание', 'Русский']
    getListEge(str) {
        if (this.formatEgeExam_ === 'human') {
            return this.parseHumanFormatEge(str);
        }
        else {
            return this.parseEge(str);
        }
    }
    // str ––
    //'Экзамены в вузеПрофессиональное испытание-от70Творческое испытание-от70'
    //return ['Профессиональное испытание', 'Творческое испытание']
    getListExtraExam(str) {
        if (this.formatEgeExam_ === 'human') {
            return this.parseHumanFormatExtraExam(str);
        }
        else {
            return this.parseExtraExam(str);
        }
    }
    parseEge(str) {
        str = str.replace(/\s+/g, ' ')
            .trim()
            .replace(/[\'\"]/g, '')
            .replace(/\d+ вариант.+/g, '')
            .replace(/Экзамены в вузе.+/g, '')
            .replace(/\,?ЕГЭ/g, '');
        return str.split(/-[а-я]*\d+/)
            .filter(subject => subject.trim());
    }
    parseExtraExam(str) {
        str = str.replace(/[\'\"]/g, '')
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/^Экзамены в вузе/g, '');
        const list = str.split(/-[а-я]*\d+/)
            .filter(subject => subject.trim());
        const res = [];
        list.forEach(function (el) {
            // together-separate writing
            // "СобеседованиеПрофессиональное испытание"
            const m = el.match(/(.+)([А-Я])(.+)/);
            if (m && m[1] && m[2] && m[3]) {
                res.push(m[1]);
                res.push(m[2].toUpperCase() + m[3]);
            }
            else {
                res.push(el);
            }
        });
        return res;
    }
    // str - "Обществознание, Иностранный язык, Русский язык: 43, 24, 40"
    parseHumanFormatEge(str) {
        str = str.replace(/\s+/g, ' ').trim();
        const [subjects] = str.split(':');
        return subjects.replace(/,\s+\d+,.+/, '')
            .split(',')
            .map(el => el.trim())
            .filter(el => Boolean(el));
    }
    // str - "Обществознание, Иностранный язык, Русский язык: 43, 24, 40"
    parseHumanFormatExtraExam(str) {
        str = str.replace(/:.+/g, '')
            .replace(/\s+/g, ' ').trim();
        return str.split(',')
            .map(el => el.replace(/-\d+/g, '').trim())
            .filter(el => Boolean(el));
    }
    replaceSuject(subjects) {
        return subjects.map(subject => {
            if (/Информатика и ИКТ/.test(subject)) {
                subject = 'Информатика';
            }
            return subject;
        });
    }
}
exports.EgeExams = EgeExams;
;
