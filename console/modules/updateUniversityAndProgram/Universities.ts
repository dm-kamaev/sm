'use strict';

// author: dm-kamaev
// update universities

import * as lodash from 'lodash';
const logger
    = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
import {
    service as universityService
} from '../../../api/modules/university/services/university';
import {
    service as cityService
} from '../../../api/modules/geo/services/city';

type BooleanHash = {[key: string]: boolean;};
type HashNumber = {[key: string]: number;};
type HashString = {[key: string]: number;};



export class Universities {
    private listProgram_: any[];
    private hashColumn_: HashString;
    private hashCities_: HashNumber;

    constructor(option) {
        this.listProgram_ = option.listProgram;
        this.hashColumn_ = option.hashColumn;
    }

    public async validate() {
        await this.validateCities();
        this.validateUniversityAndProgramName();
        this.validateParams();
    }

    public async updateViaXlsx() {
        try {
            const universities = await this.extractUniversities();
            await this.updateUniversities(universities);
        } catch (error) {
            console.log('ERROR=', error);
        }
    }

    private async validateCities() {
        const hashCity
            = this.hashCities_ = await this.getHashCity();
        const {city: cityColumn} = this.hashColumn_;
        this.listProgram_.forEach((program, i) => {
            let cityName: string = program[cityColumn] || '';
            cityName = cityService.cleanCityName(cityName);
            let errorText = '';
            const cityId: number | null = hashCity[cityName] || null;
            if (!cityId) {
                errorText =
                    `Error: city is not found
                    cityName="${cityName}", cityId="${cityId}"
                    `;
            }
            if (errorText) {
                errorText += ` ${JSON.stringify(program, null, 2)},
                                row=${i + 2}`;
                logger.critical(errorText);
                throw new Error(errorText);
            }
        });
    }


    private validateUniversityAndProgramName() {
        const {
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            programName: programNameColumn,
        } = this.hashColumn_;
        this.listProgram_.forEach((program, i) => {
            const universityName: string = program[universityNameColumn];
            const abbreviation: string = program[universityAbbreviationColumn];
            const programName: string = program[programNameColumn];
            let errorText: string = '';
            if (!universityName) {
                errorText = `University name is empty "${universityName}"`;
            } else if (!abbreviation) {
                errorText =
                    `University abbreviation is empty "${abbreviation}"`;
            } else if (!programName) {
                errorText = `Program name is empty "${programName}"`;
            }
            if (errorText) {
                errorText += ` ${JSON.stringify(program, null, 2)},
                              row=${i + 2}`;
                logger.critical(errorText);
                throw new Error(errorText);
            }
        });
    }


    private validateParams() {
        const {
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            programName: programNameColumn,
            militaryDepartment: militaryDepartmentColumn,
            dormitory: dormitoryColumn,
        } = this.hashColumn_;
        const universities = {};
        this.listProgram_.forEach((program, i) => {
            const universityName: string = program[universityNameColumn];
            const abbreviation: string = program[universityAbbreviationColumn];
            const militaryDepartment: boolean | null =
                this.russianBooleanToEnglish(program[militaryDepartmentColumn]);
            const dormitory: boolean | null =
                this.russianBooleanToEnglish(program[dormitoryColumn]);
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);

            let errorText: string = '';

            if (!universities[key]) {
                universities[key] = {
                    militaryDepartment,
                    dormitory
                };
            } else {
                const existData = universities[key];
                if (existData.militaryDepartment !== militaryDepartment) {
                    errorText = `
                        University's militaryDepartment
                        is not the same everywhere
                        prevValue: "${existData.dormitory}"
                        currentValue: "${dormitory}"
                    `;
                } else if (existData.dormitory !== dormitory) {
                    errorText = `
                        University's dormitory is not the same everywhere
                        prevValue: "${existData.dormitory}"
                        currentValue: "${dormitory}"
                    `;
                }
            }
            if (errorText) {
                errorText += ` ${JSON.stringify(program, null, 2)},
                               row=${i + 2}`;
                logger.critical(errorText);
                throw new Error(errorText);
            }
        });
    }

    private async extractUniversities() {
        const hashCity = this.hashCities_;
        // console.log(hashCity);
        // console.log('+++++++++++++++++++++++++++++');
        const {
            city: cityColumn,
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            militaryDepartment: militaryDepartmentColumn,
            dormitory: dormitoryColumn,
        } = this.hashColumn_;
        const universities = {};
        this.listProgram_.forEach((program) => {
            // one func for get cityName
            let cityName: string = program[cityColumn] || '';
            cityName = cityService.cleanCityName(cityName);
            const cityId: number | null = hashCity[cityName] || null;
            const name: string = program[universityNameColumn];
            const abbreviation: string = program[universityAbbreviationColumn];
            const militaryDepartment: boolean | null =
                this.russianBooleanToEnglish(
                    program[militaryDepartmentColumn]
            );
            const dormitory: boolean | null =
                this.russianBooleanToEnglish(program[dormitoryColumn]);
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            const data: any = {
                name: this.cleanWhiteSpace(name),
                abbreviation: this.cleanWhiteSpace(abbreviation),
                cityId
                // links: program['ссылка на офиц сайт программы'],
            };
            if (typeof militaryDepartment === 'boolean') {
                data.militaryDepartment = militaryDepartment;
            }
            if (typeof dormitory === 'boolean') {
                data.dormitory = dormitory;
            }

            if (!universities[key]) {
                universities[key] = data;
            }
        });
        console.log('universities=', universities);
        return universities;
    }


    private async getHashCity(): Promise<HashNumber> {
        const cities = await cityService.getAll();
        const hashCity = {};
        cities.forEach((city) => {
            hashCity[city.name] = city.id;
        });
        return hashCity;
    }

    private async updateUniversities(universitiesFromFile) {
        const universitiesDb = await universityService.getAll();
        const hashUniverDb = {};
        universitiesDb.forEach((university) => {
            const {abbreviation, name} = university;
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            hashUniverDb[key] = university.id;
        });
        let promiseUniversities;
        const universityNames: string[] = Object.keys(universitiesFromFile);
        promiseUniversities = universityNames.map(async(key: string) => {
            const universityInDb = hashUniverDb[key];
            const data = universitiesFromFile[key];
            let res;
            if (universityInDb) {
                const universityId: number = universityInDb.id;
                try {
                    res =
                        await universityService.update(universityId, data, []);
                } catch (error) {
                    console.log('Error: create =>', error);
                }
            } else {
                try {
                    res = await universityService.create(data, []);
                } catch (error) {
                    console.log('Error: update =>', error);
                }
            }
            return res;
        });
        console.log('hashUniverDb=', hashUniverDb);
        await Promise.all(promiseUniversities);
    }

    // TODO: remove to another class
    private async getHashUniversities(): Promise<HashNumber> {
        const universitiesDb = await universityService.getAll();
        const hashUniverDb: HashNumber = {};
        universitiesDb.forEach((university) => {
            const {abbreviation, name} = university;
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            hashUniverDb[key] = university.id;
        });
        return hashUniverDb;
    }

    // TODO: remove to another class
    private uniteAbbrevationAndName(abbreviation, name): string {
        return this.cleanWhiteSpace(abbreviation) +
               '::::' +
               this.cleanWhiteSpace(name);
    }

    private russianBooleanToEnglish(russianBoolean: string): boolean | null {
        russianBoolean = russianBoolean || '';
        russianBoolean = russianBoolean.replace(/[\s!-/:-@[-`{-~]/g, '')
            .toLowerCase();
        const englishBoolean = {
            'да': true,
            'нет': false
        };
        return englishBoolean[russianBoolean] || null;
    }

    // TODO: remove to another class
    private cleanWhiteSpace(str: string): string {
        str = str || '';
        return str.replace(/\s+/g, ' ').trim();
    }

};
