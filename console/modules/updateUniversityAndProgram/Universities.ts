'use strict';

// author: dm-kamaev
// update universities

import * as lodash from 'lodash';
const logger
    = require('../../../app/components/logger/logger.js').getLogger('app');
// const sequelize = require('../../../app/components/db.js');
import {
    service as universityService
} from '../../../api/modules/university/services/university';
import {Cities} from './Cities';
import {
    service as cityService
} from '../../../api/modules/geo/services/city';
import {Hash, ICities} from './types/updateUniverstyAndProgram';
import {
    UniversityAdminList
} from '../../../api/modules/university/types/university';

import {BaseWorkWithProgram} from './BaseWorkWithProgram';


export class Universities extends BaseWorkWithProgram {
    private listProgram_: any[];
    private hashColumn_: Hash<string>;
    private hashCities_: Hash<number>;
    private citiesInstance: ICities;

    constructor(option?) {
        super();
        option = option || {};
        this.listProgram_ = option.listProgram;
        this.hashColumn_ = option.hashColumn;
        this.citiesInstance = new Cities();
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
            logger.info('Success universities updateViaXlsx');
        } catch (error) {
            logger.critical('Universities.updateViaXlsx => ' + error);
        }
    }


    public async getHashUniversities(): Promise<Hash<number>> {
        const universitiesDb = await universityService.getAll();
        const hashUniverDb: Hash<number> = {};
        universitiesDb.forEach((university) => {
            const {abbreviation, name} = university;
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            hashUniverDb[key] = university.id;
        });
        return hashUniverDb;
    }

    private async validateCities() {
        const hashCity
            = this.hashCities_ = await this.citiesInstance.getHashCity();
        const {city: cityColumn} = this.hashColumn_;
        this.listProgram_.forEach((program, i) => {
            let cityName: string = program[cityColumn] || '';
            cityName = cityService.cleanCityName(cityName);
            let errorText = '';
            const cityId: number | null = hashCity[cityName] || null;
            if (!cityName || !cityId) {
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


    // all program cell the same militaryDepartment and dormitory
    private validateParams() {
        const {
            universityName: universityNameColumn,
            universityAbbreviation: universityAbbreviationColumn,
            // programName: programNameColumn,
            militaryDepartment: militaryDepartmentColumn,
            dormitory: dormitoryColumn,
        } = this.hashColumn_;
        const universities = {};
        this.listProgram_.forEach((program, i) => {
            const universityName: string =
                this.cleanWhiteSpace(program[universityNameColumn]);
            const abbreviation: string =
                this.cleanWhiteSpace(program[universityAbbreviationColumn]);
            const militaryDepartment: boolean | null =
                this.russianBooleanToEnglish(program[militaryDepartmentColumn]);
            const dormitory: boolean | null =
                this.russianBooleanToEnglish(program[dormitoryColumn]);
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, universityName);

            let errorText: string = '';
            // console.log(key, militaryDepartment, dormitory);
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
            let cityName: string = program[cityColumn] || '';
            cityName = cityService.cleanCityName(cityName);
            const cityId: number | null = hashCity[cityName] || null;
            const universityName: string = program[universityNameColumn];
            const abbreviation: string = program[universityAbbreviationColumn];
            const militaryDepartment: boolean | null =
                this.russianBooleanToEnglish(
                    program[militaryDepartmentColumn]
            );
            const dormitory: boolean | null =
                this.russianBooleanToEnglish(program[dormitoryColumn]);
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, universityName);
            const data: any = {
                name: this.cleanWhiteSpace(universityName),
                abbreviation: this.cleanWhiteSpace(abbreviation),
                cityId
                // links: program['ссылка на офиц сайт программы'],
            };
            if (typeof militaryDepartment === 'boolean') {
                data['militaryDepartment'] = militaryDepartment;
            }
            if (typeof dormitory === 'boolean') {
                data.dormitory = dormitory;
            }

            if (!universities[key]) {
                universities[key] = data;
            }
        });
        // console.log('universities=',
        //  universities, Object.keys(universities).length);
        return universities;
    }


    private async updateUniversities(universitiesFromFile) {
        const universitiesDb: UniversityAdminList[] =
            await universityService.getAll();
        const hashUniverDb: Hash<number> = {};
        universitiesDb.forEach((university: UniversityAdminList) => {
            const {abbreviation, name} = university;
            const key: string
                = this.uniteAbbrevationAndName(abbreviation, name);
            hashUniverDb[key] = university.id;
        });

        let promiseUniversities;
        const universityNames: string[] = Object.keys(universitiesFromFile);
        promiseUniversities = universityNames.map(async(key: string) => {
            const universityId: number | null = hashUniverDb[key];
            const data = universitiesFromFile[key];
            let res = null;
            if (universityId) {
                try {
                    res =
                        await universityService.update(universityId, data, []);
                } catch (error) {
                    console.log('Error: update =>', error);
                }
            } else {
                try {
                    res = await universityService.create(data, []);
                } catch (error) {
                    console.log('Error: create =>', error);
                }
            }
            return res;
        });
        // console.log('hashUniverDb=', hashUniverDb);
        await Promise.all(promiseUniversities);
    }

};
