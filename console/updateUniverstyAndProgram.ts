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
// import * as xlsxj from 'xlsx-to-json';
import {
    service as universityService
} from '../api/modules/university/services/university';
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

type BooleanHash = { [ key: string ]: boolean; };


class UpdateUniversityProgram {
    private listProgram_: any[];
    constructor() {
        // code...
    }

    public async start() {
        logger.info('-----START-----');

        const pathFile: string = path.join(__dirname, '../assets/universities/list_program.xlsx');
        this.listProgram_ = await new Xlsx().getJson(pathFile);
        // await this.updateCities();
        const universities = await this.extractUniversities();
        await this.updateUniversities(universities);
        logger.info('-----THE END-----');
    }

    public async extractUniversities() {
        const cities = await cityService.getAll();
        const hashCity = {};
        cities.forEach((city) => {
            hashCity[city.name] = city.id;
        });
        console.log(hashCity);
        console.log('+++++++++++++++++++++++++++++');
        let universities = this.listProgram_.map(program => {
            const cityName: string =  cityService.cleanCityName(program['Город'] || '');
            const cityId: number | null = hashCity[cityName] || null;
            if (!cityId) {
                logger.critical(`Error: city is not found cityName="${cityName}", cityId="${cityId}"`);
                return null;
            }
            return {
                name: this.cleanWhiteSpace(program['Вуз (полное)']),
                abbreviation: this.cleanWhiteSpace(program['Вуз (полное)']),
                description: this.cleanWhiteSpace(program['Описание программы']),
                // links: program['ссылка на офиц сайт программы'],
                militaryDepartment: this.russianBooleanToEnglish(program['Военная кафедра (да/нет)']),
                dormitory: this.russianBooleanToEnglish(program['общежитие (да/нет)']),
                cityId
            };
        });
        universities = universities.filter(university => Boolean(university));
        console.log('universities=', universities);
    }

    private async updateUniversities(universitiesFromFile) {
        const universitiesDb = await universityService.getAll();
        const hashUniver = {};
        universitiesDb.forEach((university) => {
            const key: string
                = this.cleanWhiteSpace(university.name) + this.cleanWhiteSpace(university.abbreviation);
            hashUniver[key] = university.id;
        });
        universitiesFromFile.forEach((university) => {
            const key: string
                = this.cleanWhiteSpace(university.name) + this.cleanWhiteSpace(university.abbreviation);
            university.
        });
        console.log('hashUniver=', hashUniver);
    }

    private async updateCities() {
        let cities: string[] = this.extractCities_(this.listProgram_);
        cities = lodash.uniq(cities);
        console.log('cities=', cities, cities.length);
        try {
            const promiseCities: Promise<any>[] = cities.map(async(cityName: string): Promise<any> => {
                try {
                    return await cityService.create(cityName);
                } catch(error) {
                    console.log('Error: cityService.create=>', error);
                    return null;
                }
            });
            await Promise.all(promiseCities);
        } catch(error) {
            console.log('Error: updateCity=> ', error);
        }
    }

    private extractCities_(listProgram: any[]): string[] {
        return listProgram.map(program => program['Город']);
    }

    private russianBooleanToEnglish(russianBoolean: string): string {
        russianBoolean = russianBoolean || '';
        russianBoolean = russianBoolean.replace(/[\s!-/:-@[-`{-~]/g, '')
                                       .toLowerCase();
        const englishBoolean = {
            'да': true,
            'нет': false
        };
        return englishBoolean[russianBoolean] || false;
    }

    private cleanWhiteSpace(str: string): string {
        str = str || '';
        return str.replace(/\s+/g, ' ').trim();
    }

};

commander
    .command('updateUniverstyAndProgram')
    .action(async() => {
        await new UpdateUniversityProgram().start();
    });

exports.Command;
