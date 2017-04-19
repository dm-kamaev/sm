'use strict';

// author: dm-kamaev
// node commander.js updateUniverstyAndProgram
// update universities, programs and reltions
// update table university, program, city,

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
import {Xlsx} from './components/Xlsx';
import {Universities} from './modules/updateUniversityAndProgram/Universities';
import {Programs} from './modules/updateUniversityAndProgram/Programs';
import {EntranceStatistics} from './modules/updateUniversityAndProgram/EntranceStatistics';
import {Cities} from './modules/updateUniversityAndProgram/Cities';


class UpdateUniversityProgram {
    private listProgram_: any[];
    private hashColumn_: { [key: string]: string; };

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
        };
    }

    public async start() {
        logger.info('-----START-----');
        try {
            // const pathFile: string = '../assets/universities/listProgram.xlsx';
            logger.info('Reading files');
            const pathFile: string = '../assets/universities/listProgram_all.xlsx';
            this.listProgram_ = await this.getJsonFromXlsx(pathFile);
            const data = {
                hashColumn: this.hashColumn_,
                listProgram: this.listProgram_,
            };
            // console.log(this.listProgram_);
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
            logger.info('Validate programs...');
            await entranceStatistics.validate();
            logger.info('Update...');
            await entranceStatistics.updateViaXlsx();
        } catch (error) {
            console.log('ERROR=', error);
        }
        logger.info('-----THE END-----');
    }

    private async getJsonFromXlsx(pathFile: string): Promise<any[]> {
        const fullPath: string = path.join(__dirname, pathFile);
        return await new Xlsx().getJson(fullPath);
    }
};

commander
    .command('updateUniverstyAndProgram')
    .action(async() => {
        await new UpdateUniversityProgram().start();
    });

exports.Command;
