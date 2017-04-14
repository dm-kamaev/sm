'use strict';

// author: dm-kamaev
// node commander.js updateUniverstyAndProgram
// update universities, programs and reltions
// update table university, program, city,

// const commander = require('commander');
import * as commander from 'commander';
import * as path from 'path';
import * as lodash from 'lodash';
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
import {Xlsx} from './components/Xlsx';
import {
    service as universityService
} from '../api/modules/university/services/university';
import {Universities} from './modules/updateUniversityAndProgram/Universities';
import {Programs} from './modules/updateUniversityAndProgram/Programs';
// import {
//     Model as ProgramSimilar
// } from '../api/modules/university/models/ProgramSimilar';
// import {
//     ProgramInstance
// } from '../api/modules/university/types/program';
// import {
//     EntranceStatisticInstance
// } from '../api/modules/university/models/EntranceStatistic';
// import {
//     ProgramEgeExamInstance
// } from '../api/modules/university/models/ProgramEgeExam';
import {
    service as cityService
} from '../api/modules/geo/services/city';

type BooleanHash = { [key: string]: boolean; };


class UpdateUniversityProgram {
    private listProgram_: any[];
    private hashColumn_: { [key: string]: string; };
    constructor() {
        this.hashColumn_ = {
            city: 'Город',
            universityName: 'Вуз (полное)',
            universityAbbreviation: 'Аббревиатура вуза',
            programName: 'НАЗВАНИЕ',
            duration: 'срок обучения',
            descriptionProgram: 'Описание программы',
            specialtyСodificator: 'Специальность (по кодификатору)',
            militaryDepartment: 'Военная кафедра (да/нет)',
            dormitory: 'общежитие (да/нет)',
        };
    }

    public async start() {
        logger.info('-----START-----');
        try {
            const pathFile: string = '../assets/universities/listProgram.xlsx';
            const fullPath: string = path.join(__dirname, pathFile);
            this.listProgram_ = await new Xlsx().getJson(fullPath);
            const data = {
                hashColumn: this.hashColumn_,
                listProgram: this.listProgram_,
            };
            // await this.updateCities();
            const universities = new Universities(data);
            await universities.validate();
            // await universities.updateViaXlsx();
            // console.log(this.listProgram_);
            // process.exit();
            // const programs = new Programs(data);
            // await programs.validate();
            // await programs.updateViaXlsx();
        } catch (error) {
            console.log('ERROR=', error);
        }
        logger.info('-----THE END-----');
    }

    private async updateCities() {
        let cities: string[] = this.extractCities_(this.listProgram_);
        cities = lodash.uniq(cities);
        console.log('cities=', cities, cities.length);
        const create = async(cityName: string): Promise<any> => {
            try {
                return await cityService.create(cityName);
            } catch (error) {
                console.log('Error: cityService.create=>', error);
                return null;
            }
        };
        try {
            const promiseCities: Promise<any>[] = cities.map(create);
            await Promise.all(promiseCities);
        } catch (error) {
            console.log('Error: updateCity=> ', error);
        }
    }

    private extractCities_(listProgram: any[]): string[] {
        const cityColumn: string = this.hashColumn_.city;
        return listProgram.map(program => program[cityColumn]);
    }

};

commander
    .command('updateUniverstyAndProgram')
    .action(async() => {
        await new UpdateUniversityProgram().start();
    });

exports.Command;
