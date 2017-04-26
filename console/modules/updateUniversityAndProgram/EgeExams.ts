'use strict';

// author: dm-kamaev
// update program.extra_exam and update table programEge

const logger
    = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
const services = require('../../../app/components/services').all;
import * as util from 'util';

import {promiseMethods} from '../../../api/components/promiseMethods';
import {
    service as programService
} from '../../../api/modules/university/services/program';
import {
    ProgramEgeExamAttribute,
} from '../../../api/modules/university/models/ProgramEgeExam';
import {
    service as programEgeExamService
} from '../../../api/modules/university/services/programEgeExam';

import {BaseWorkWithProgram} from './BaseWorkWithProgram';
import {SubjectInstance} from '../../../api/modules/study/models/subject';

import {
    Hash, Columns, EgeExamInfo, EgeInfo
} from './types/updateUniverstyAndProgram';


export class EgeExams extends BaseWorkWithProgram {
    private listProgram_: any[];
    private hashColumn_: Columns;
    private hashUniverProgram_: Hash<number>;
    private hashSubject_: Hash<number>;
    private hashProgramEge_: Hash<number>;
    private formatEgeExam_: string; // 'default' or 'human'

    constructor(option) {
        super();
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
        this.formatEgeExam_ = option.formatEgeExam_ || 'default';
        // console.log('this.formatEgeExam_=', this.formatEgeExam_ );
    }

    public async validate() {
        await this.validateParams();
        await this.validateEgeSubject();
    }

    public async updateViaXlsx() {
        try {
            const egeExams = await this.extractEgeExams();
            this.uniqueEgeExams(egeExams);
            await this.updateExtraExam(egeExams);
            await this.updateProgramEgeExam(egeExams);
            logger.info(`success egeExams updateViaXlsx`);
        } catch (error) {
            console.log('EgeExams.updateViaXlsx => ', error);
            logger.critical('EgeExams.updateViaXlsx => ' + error);
        }
    }

    private async validateParams() {
        const hashUniverProgram =
            this.hashUniverProgram_ =
            await this.getHashUniverProgram();
        // console.log('hashUniverProgram=', hashUniverProgram);
        const {
            universityAbbreviation: universityAbbreviationColumn,
            programName: programNameColumn,
        } = this.hashColumn_;
        this.listProgram_ = this.listProgram_.filter((program, i) => {
            const abbreviation: string = program[universityAbbreviationColumn];
            const programName: string = program[programNameColumn];
            const key: string =
                this.uniteAbbrevationAndName(abbreviation, programName);
            const programId: number = hashUniverProgram[key];
            let errorText: string = '';
            if (!programName) {
                errorText = `Program name is empty "${programName}"`;
            } else if (!abbreviation) {
                errorText =
                    `University abbreviation is empty "${abbreviation}"`;
            } else if (!programId) {
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
    }

    private async getHashUniverProgram(): Promise<Hash<number>> {
        const query: string = `
            SELECT
                u.abbreviation,
                p.name as "programName",
                p.id as "programId"
            FROM university as u
            LEFT JOIN program as p ON u.id = p.university_id
        `;
        const universityProgram = await sequelize.query(
            query,
            { type: sequelize.QueryTypes.SELECT, raw: true }
        );
        const hashUniversityProgram: Hash<number> = {};
        universityProgram.forEach((univerProgram) => {
            const key: string = this.uniteAbbrevationAndName(
                univerProgram.abbreviation,
                univerProgram.programName
            );
            hashUniversityProgram[key] = univerProgram.programId;
        });
        return hashUniversityProgram;
    }

    private async validateEgeSubject() {
        const hashSubject = this.hashSubject_ = await this.getHashSubject();
        const hashUniverProgram: Hash<number> = this.hashUniverProgram_;
        const { ege: egeColumn, extraExam: extraExamColumn } = this.hashColumn_;
        const notExistSubject: Hash<boolean> = {};
        this.listProgram_.forEach((program, i) => {
            let eges: string | string[] =
                this.cleanWhiteSpace(program[egeColumn]);
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
            const checkEvery = (subject: string) => {
                // console.log('subject=', subject);
                const key: string =
                    this.cleanWhiteSpace(subject).toLowerCase();
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
                        // throw new Error('STOP');
                    }
                }
            };
            let errorText: string = '';
            eges.forEach(checkEvery);
        });
        const subjectNames: string[] = Object.keys(notExistSubject);
        if (subjectNames.length) {
            logger.critical(
                'List not exist subject: ',
                subjectNames.join('", "')
            );
            throw new Error('Ege"s subjects are not valid');
        }
    }

    private uniqueEgeExams(egeExamFromFile: EgeExamInfo[]) {
        const uniqProgramSubject: Hash<boolean> = {};
        egeExamFromFile.forEach(egeExam => {
            const programId: number = egeExam.programId;
            const egeInfo: EgeInfo[] | null = egeExam.egeInfo;
            if (egeInfo) {
                egeExam.egeInfo = egeInfo.filter((ege) => {
                    let res: boolean;
                    const key: string = this.uniteProgramIdAndSubjectId(
                        programId,
                        ege.subjectId
                    );
                    if (uniqProgramSubject[key]) {
                        res = false;
                    } else {
                        uniqProgramSubject[key] = true;
                        res = true;
                    }
                    return res;
                });
            }
        });
    }


    private async getHashSubject(): Promise<Hash<number>> {
        const subjects: SubjectInstance[] = await services.subject.getAll();
        const hashSubject: Hash<number> = {};
        subjects.forEach((subject: SubjectInstance) => {
            hashSubject[subject.name] = subject.id;
        });
        return hashSubject;
    }


    private async extractEgeExams(): Promise<EgeExamInfo[]> {
        const hashUniverProgram: Hash<number> = this.hashUniverProgram_;
        const hashProgramEge: Hash<number> =
            this.hashProgramEge_ = await this.getHashProgramEge();
        const hashSubject: Hash<number> = this.hashSubject_;
        const {
            universityAbbreviation: universityAbbreviationColumn,
            programName: programNameColumn,
            ege: egeColumn,
            extraExam: extraExamColumn,
        } = this.hashColumn_;
        const egeExams = this.listProgram_.map((program): EgeExamInfo => {
            const programName: string =
                this.cleanWhiteSpace(program[programNameColumn]);
            const abbreviation: string =
                this.cleanWhiteSpace(program[universityAbbreviationColumn]);
            const key: string =
                this.uniteAbbrevationAndName(abbreviation, programName);
            let extraExam: string | string[] =
                this.cleanWhiteSpace(program[extraExamColumn]);
            extraExam = this.getListExtraExam(extraExam);
            let eges: string | string[] =
                this.cleanWhiteSpace(program[egeColumn]);
            eges = this.getListEge(eges);
            const programId = hashUniverProgram[key];
            const egeInfo = eges.map((subject: string): EgeInfo => {
                const subjectId: number = hashSubject[subject.toLowerCase()];
                return {
                    subjectId,
                    subjectName: subject,
                };
            });
            const data: EgeExamInfo = {
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
        console.log(
            'egeExams=', util.inspect(egeExams, { depth: 4 }),
            egeExams.length
        );
        return egeExams;
    }


    private async updateExtraExam(egeExamsFromFile: EgeExamInfo[]) {
        const update = async(egeExam: EgeExamInfo) => {
            const programId: number = egeExam.programId;
            const extraExam: string[] | null = egeExam.extraExam;
            if (!extraExam) {
                return;
            }
            await programService.update(programId, {
                extraExam,
            });
        };
        await promiseMethods.queue(update, egeExamsFromFile);
    }

    private async updateProgramEgeExam(egeExamsFromFile: EgeExamInfo[]) {
        const update = async(egeExam) => {
            const programId: number = egeExam.programId;
            const egeInfo: EgeInfo[] | null = egeExam.egeInfo;
            if (!egeInfo) {
                return;
            }
            await promiseMethods.queue((ege: EgeInfo) => {
                return this.createOrUpdateEge(ege, programId);
            }, egeInfo);
        };
        await promiseMethods.queue(update, egeExamsFromFile);
    }

    private async createOrUpdateEge(
        ege: EgeInfo,
        programId: number
    ): Promise<ProgramEgeExamAttribute> {
        let res: ProgramEgeExamAttribute;
        const hashProgramEge = this.hashProgramEge_;
        const subjectId: number = ege.subjectId;
        const key: string =
            this.uniteProgramIdAndSubjectId(programId, subjectId);
        const programEgeId: number | null = hashProgramEge[key];
        if (!programEgeId) {
            try {
                // console.log('CREATE', {
                //     programId,
                //     subjectId
                // });
                res = await programEgeExamService.create({
                    programId,
                    subjectId
                });
            } catch (error) {
                logger.critical('programEge.create =>', error);
            }
        } else {
            try {
                // console.log('UPDATE', programEgeId, {
                //     programId,
                //     subjectId
                // });
                res = await programEgeExamService.update(programEgeId, {
                    programId,
                    subjectId
                });
            } catch (error) {
                logger.critical('programEge.update =>', error);
            }
        }
        return res;
    }

    private async getHashProgramEge(): Promise<Hash<number>> {
        const hashProgramEge: Hash<number> = {};
        const programEgeExam = await programEgeExamService.getAll();
        programEgeExam.forEach((programEge) => {
            const {programId, subjectId} = programEge;
            const key: string =
                this.uniteProgramIdAndSubjectId(programId, subjectId);
            hashProgramEge[key] = programEge.id;
        });
        return hashProgramEge;
    }

    // str ––
    // '"ЕГЭМатематика-27Обществознание-42Русский язык-36
    // 1 вариант ЕГЭМатематика-от27Обществознание-от42Русский язык-от36"'
    // return ['Математика', 'Обществознание', 'Русский']
    private getListEge(str: string): string[] {
        if (this.formatEgeExam_ === 'human') {
            return this.parseHumanFormatEge(str);
        } else {
            return this.parseEge(str);
        }
    }


    // str ––
    //'Экзамены в вузеПрофессиональное испытание-от70Творческое испытание-от70'
    //return ['Профессиональное испытание', 'Творческое испытание']
    private getListExtraExam(str: string): string[] {
        if (this.formatEgeExam_ === 'human') {
            return this.parseHumanFormatExtraExam(str);
        } else {
            return this.parseExtraExam(str);
        }
    }


    private parseEge(str: string): string[] {
        str = str.replace(/\s+/g, ' ')
            .trim()
            .replace(/[\'\"]/g, '')
            .replace(/\d+ вариант.+/g, '')
            .replace(/Экзамены в вузе.+/g, '')
            .replace(/\,?ЕГЭ/g, '');

        return str.split(/-[а-я]*\d+/)
                 .filter(subject => subject.trim());
    }


    private parseExtraExam(str: string): string[] {
        str = str.replace(/[\'\"]/g, '')
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/^Экзамены в вузе/g, '');

        const list: string[] = str.split(/-[а-я]*\d+/)
            .filter(subject => subject.trim());
        const res: string[] = [];
        list.forEach(function(el) {
            // together-separate writing
            // "СобеседованиеПрофессиональное испытание"
            const m = el.match(/(.+)([А-Я])(.+)/);
            if (m && m[1] && m[2] && m[3]) {
                res.push(m[1]);
                res.push(m[2].toUpperCase() + m[3]);
            } else {
                res.push(el);
            }
        });
        return res;
    }

    // str - "Обществознание, Иностранный язык, Русский язык: 43, 24, 40"
    private parseHumanFormatEge(str: string): string[] {
        str = str.replace(/\s+/g, ' ').trim();
        const [subjects] = str.split(':');
        return subjects.replace(/,\s+\d+,.+/, '')
                       .split(',')
                       .map(el => el.trim())
                       .filter(el => Boolean(el));
    }

    // str - "Обществознание, Иностранный язык, Русский язык: 43, 24, 40"
    private parseHumanFormatExtraExam(str: string) {
        str = str.replace(/:.+/g, '').replace(/\s+/g, ' ').trim();
        return str.split(',');
    }
};
