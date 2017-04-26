'use strict';

// author: dm-kamaev
// node commander.js updateUniverstyAndProgram
// update universities, programs and reltions
// update table university, program, city, program_ege_exam

import * as commander from 'commander';
import * as path from 'path';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
// sequelize.options.logging = function (query) {
//   console.log(query
//      .replace(/(,)/g, '$1\n')
//      .replace(/SELECT/, 'SELECT\n')
//      .replace(/(INSERT)/, '$1\n')
//      .replace(/(UPDATE)/, '$1\n')
//      .replace(/(FROM)/, '\n$1')
//      .replace(/(LEFT OUTER JOIN)/g, '\n$1')
//      .replace(/(LEFT JOIN)/g, '\n$1')
//      .replace(/(WHERE)/g, '\n$1')
//      .replace(/(VALUES)/g, '\n$1\n')
//      .replace(/(ARRAY)/g, '\n$1')
//      .replace(/(GROUP BY)/g, '\n$1\n')
//   );
// };
import {xlsx} from '../api/components/xlsx';
import {Universities} from './modules/updateUniversityAndProgram/Universities';
import {Programs} from './modules/updateUniversityAndProgram/Programs';
import {EgeExams} from './modules/updateUniversityAndProgram/EgeExams';
import {
    EntranceStatistics
} from './modules/updateUniversityAndProgram/EntranceStatistics';
import {Cities} from './modules/updateUniversityAndProgram/Cities';
import {
    Hash, Columns
} from './modules/updateUniversityAndProgram/types/updateUniverstyAndProgram';


class UpdateUniversityProgram {
    private listProgram_: any[];
    private listEgeExams_: any[];
    private hashColumn_: Columns;
    private hashColumnEgeExam_: Columns;

    constructor() {
        this.hashColumn_ = {
            city: 'Город',
            universityName: 'Вуз (полное)',
            universityAbbreviation: 'Аббревиатура вуза',
            programName: 'Программа',
            duration: 'срок обучения',
            descriptionProgram: 'Описание программы',
            specialtyСodificator: 'Специальность (по кодификатору)',
            militaryDepartment: 'Военная кафедра (да/нет)',
            dormitory: 'общежитие (да/нет)',
            programMajor: 'major',
            competition: 'Конкурс (бюджет)',
            budgetPlaces: 'Кол-во бюджетных мест',
            commercialPlaces: 'Кол-во платных мест',
            cost: 'Стоимость в год',
            egePassScore: 'Проходной на бюджет',
            programSite: 'ссылка на офиц сайт программы',
        };

        this.hashColumnEgeExam_ = {
            universityAbbreviation: 'Аббревиатура вуза',
            programName: 'Название программы',
            ege: 'ЕГЭ',
            extraExam: 'Экзамены в вузе',
        };
    }

    // public async updateOtherProgramAndRelation() {
    //     try {
    //         // const pathFile: string
    //         //     = '../assets/universities/listProgramPart.xlsx';
    //         logger.info('Reading file programs and universities...');
    //         const pathFile: string =
    //             '../assets/universities/listProgramAll.xlsx';
    //         this.listProgram_ = await this.getJsonFromXlsx(pathFile);
    //         const data = {
    //             hashColumn: this.hashColumn_,
    //             listProgram: this.listProgram_,
    //         };
    //         // console.log(this.listProgram_);
    //         logger.info('Update cities...');
    //         await new Cities(data).updateViaXlsx();

    //         const universities = new Universities(data);
    //         logger.info('Validate universities...');
    //         await universities.validate();
    //         logger.info('Update...');
    //         await universities.updateViaXlsx();

    //         const programs = new Programs(data);
    //         logger.info('Validate programs...');
    //         await programs.validate();
    //         logger.info('Update...');
    //         await programs.updateViaXlsx();

    //         const entranceStatistics = new EntranceStatistics(data);
    //         logger.info('Validate programs...');
    //         await entranceStatistics.validate();
    //         logger.info('Update...');
    //         await entranceStatistics.updateViaXlsx();
    //     } catch (error) {
    //         console.log('ERROR=', error);
    //     }
    // }

    public async topPrograms() {
        logger.info('------Top programs-----');
        // '../assets/universities/listProgramPart.xlsx'
        const pathFile: string =
            '../assets/universities/listProgramTop.xlsx';
        await this.updateProgramAndRelation(pathFile);
        // await this.updateEgeExam(pathFile, {
        //     formatEgeExam: 'human'
        // });
    }

    public async otherPrograms() {
        logger.info('------Other programs-----');
        // '../assets/universities/listProgramPart.xlsx'
        const pathFile: string =
            '../assets/universities/listProgramAll.xlsx';
        await this.updateProgramAndRelation(pathFile);
        await this.updateEgeExam(pathFile);
    }


    private async updateProgramAndRelation(pathFile: string) {
        try {
            logger.info('Reading file programs and universities...');
            this.listProgram_ = await this.getJsonFromXlsx(pathFile);
            this.filterEmptyRow();
            const data = {
                hashColumn: this.hashColumn_,
                listProgram: this.listProgram_,
            };
            logger.info('Update cities...');
            await new Cities(data).updateViaXlsx();

            const universities = new Universities(data);
            logger.info('Validate universities...');
            await universities.validate();
            logger.info('Update...');
            await universities.updateViaXlsx();

            const programs = new Programs(data);
            logger.info('Validate programs...');
            await programs.validate();
            logger.info('Update...');
            await programs.updateViaXlsx();

            const entranceStatistics = new EntranceStatistics(data);
            logger.info('Validate entranceStatistics...');
            await entranceStatistics.validate();
            logger.info('Update...');
            await entranceStatistics.updateViaXlsx();
        } catch (error) {
            console.log('ERROR=', error);
        }
    }


    private async updateEgeExam(pathFile: string, option?) {
        try {
            logger.info('Reading file egeExam...');
            this.listEgeExams_ = await this.getJsonFromXlsx(
                pathFile, {sheet: 'поступи'}
            );
            const egeExams = new EgeExams({
                hashColumn: this.hashColumnEgeExam_,
                listProgram: this.listEgeExams_,
                formatEgeExam_: option.formatEgeExam
            });
            logger.info('Validate...');
            await egeExams.validate();
            logger.info('Update...');
            await egeExams.updateViaXlsx();
        } catch (error) {
            console.log('Error=', error);
        }
    }


    private async getJsonFromXlsx(
        pathFile: string,
        option?: any
    ): Promise<any[]> {
        const fullPath: string = path.join(__dirname, pathFile);
        return await xlsx.getJson(fullPath, option);
    }

    private filterEmptyRow() {
        this.listProgram_ = this.listProgram_.filter(row => {
            let count = 0;
            const cellNames = Object.keys(row);
            cellNames.forEach((cellName: string) => {
                if (!row[cellName]) {
                    count++;
                }
            });
            return count === cellNames.length ? false : true;
        });
    }

};

commander
    .command('updateUniverstyAndProgram')
    .action(async() => {
        logger.info('-----START-----');
        const updateUniversityProgram = new UpdateUniversityProgram();
        await updateUniversityProgram.topPrograms();
        await updateUniversityProgram.otherPrograms();
        logger.info('-----THE END-----');
    });

exports.Command;
