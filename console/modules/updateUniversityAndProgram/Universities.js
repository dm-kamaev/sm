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
const city_1 = require("../../../api/modules/geo/services/city");
class Universities {
    constructor(option) {
        this.listProgram_ = option.listProgram;
        this.hashColumn_ = option.hashColumn;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateCities();
            this.validateUniversityAndProgramName();
            this.validateParams();
        });
    }
    updateViaXlsx() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const universities = yield this.extractUniversities();
                yield this.updateUniversities(universities);
            }
            catch (error) {
                console.log('ERROR=', error);
            }
        });
    }
    validateCities() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashCity = this.hashCities_ = yield this.getHashCity();
            const { city: cityColumn } = this.hashColumn_;
            this.listProgram_.forEach((program, i) => {
                let cityName = program[cityColumn] || '';
                cityName = city_1.service.cleanCityName(cityName);
                let errorText = '';
                const cityId = hashCity[cityName] || null;
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
        });
    }
    validateUniversityAndProgramName() {
        const { universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, programName: programNameColumn, } = this.hashColumn_;
        this.listProgram_.forEach((program, i) => {
            const universityName = program[universityNameColumn];
            const abbreviation = program[universityAbbreviationColumn];
            const programName = program[programNameColumn];
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
            if (errorText) {
                errorText += ` ${JSON.stringify(program, null, 2)},
                              row=${i + 2}`;
                logger.critical(errorText);
                throw new Error(errorText);
            }
        });
    }
    validateParams() {
        const { universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, programName: programNameColumn, militaryDepartment: militaryDepartmentColumn, dormitory: dormitoryColumn, } = this.hashColumn_;
        const universities = {};
        this.listProgram_.forEach((program, i) => {
            const universityName = program[universityNameColumn];
            const abbreviation = program[universityAbbreviationColumn];
            const militaryDepartment = this.russianBooleanToEnglish(program[militaryDepartmentColumn]);
            const dormitory = this.russianBooleanToEnglish(program[dormitoryColumn]);
            const key = this.uniteAbbrevationAndName(abbreviation, name);
            let errorText = '';
            if (!universities[key]) {
                universities[key] = {
                    militaryDepartment,
                    dormitory
                };
            }
            else {
                const existData = universities[key];
                if (existData.militaryDepartment !== militaryDepartment) {
                    errorText = `
                        University's militaryDepartment
                        is not the same everywhere
                        prevValue: "${existData.dormitory}"
                        currentValue: "${dormitory}"
                    `;
                }
                else if (existData.dormitory !== dormitory) {
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
    extractUniversities() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashCity = this.hashCities_;
            // console.log(hashCity);
            // console.log('+++++++++++++++++++++++++++++');
            const { city: cityColumn, universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, militaryDepartment: militaryDepartmentColumn, dormitory: dormitoryColumn, } = this.hashColumn_;
            const universities = {};
            this.listProgram_.forEach((program) => {
                // one func for get cityName
                let cityName = program[cityColumn] || '';
                cityName = city_1.service.cleanCityName(cityName);
                const cityId = hashCity[cityName] || null;
                const name = program[universityNameColumn];
                const abbreviation = program[universityAbbreviationColumn];
                const militaryDepartment = this.russianBooleanToEnglish(program[militaryDepartmentColumn]);
                const dormitory = this.russianBooleanToEnglish(program[dormitoryColumn]);
                const key = this.uniteAbbrevationAndName(abbreviation, name);
                const data = {
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
        });
    }
    getHashCity() {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield city_1.service.getAll();
            const hashCity = {};
            cities.forEach((city) => {
                hashCity[city.name] = city.id;
            });
            return hashCity;
        });
    }
    updateUniversities(universitiesFromFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const universitiesDb = yield university_1.service.getAll();
            const hashUniverDb = {};
            universitiesDb.forEach((university) => {
                const { abbreviation, name } = university;
                const key = this.uniteAbbrevationAndName(abbreviation, name);
                hashUniverDb[key] = university.id;
            });
            let promiseUniversities;
            const universityNames = Object.keys(universitiesFromFile);
            promiseUniversities = universityNames.map((key) => __awaiter(this, void 0, void 0, function* () {
                const universityInDb = hashUniverDb[key];
                const data = universitiesFromFile[key];
                let res;
                if (universityInDb) {
                    const universityId = universityInDb.id;
                    try {
                        res =
                            yield university_1.service.update(universityId, data, []);
                    }
                    catch (error) {
                        console.log('Error: create =>', error);
                    }
                }
                else {
                    try {
                        res = yield university_1.service.create(data, []);
                    }
                    catch (error) {
                        console.log('Error: update =>', error);
                    }
                }
                return res;
            }));
            console.log('hashUniverDb=', hashUniverDb);
            yield Promise.all(promiseUniversities);
        });
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
    russianBooleanToEnglish(russianBoolean) {
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
    cleanWhiteSpace(str) {
        str = str || '';
        return str.replace(/\s+/g, ' ').trim();
    }
}
exports.Universities = Universities;
;
