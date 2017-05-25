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
// update entrance_statistic
const logger = require('../../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../../app/components/db.js');
const fs = require("fs");
const path = require("path");
const entranceStatistic_1 = require("../../../api/modules/university/services/entranceStatistic");
const BaseWorkWithProgram_1 = require("./BaseWorkWithProgram");
const Universities_1 = require("./Universities");
const Programs_1 = require("./Programs");
const promiseMethods_1 = require("../../../api/components/promiseMethods");
class EntranceStatistics extends BaseWorkWithProgram_1.BaseWorkWithProgram {
    constructor(option) {
        super();
        this.hashColumn_ = option.hashColumn;
        this.listProgram_ = option.listProgram;
        this.STATISTIC_YEAR = 2016;
        this.universitiesInstance = new Universities_1.Universities();
        this.programsInstance = new Programs_1.Programs();
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateParams();
        });
    }
    updateViaXlsx() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.hashEgeSkipScore_ = this.getHashSkipEgeScore('../../../assets/universities/skipEge.json');
                const statistics = this.extractStatistics();
                yield this.updateStatistics(statistics);
                logger.info('success entranceStatistics updateViaXlsx');
            }
            catch (error) {
                console.log('EntranceStatistics.updateViaXlsx => ', error);
                logger.critical('EntranceStatistics.updateViaXlsx => ' + error);
            }
        });
    }
    validateParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashUniversities = this.hashUniversities_ =
                yield this.universitiesInstance.getHashUniversities();
            const hashPrograms = this.hashPrograms_ =
                yield this.programsInstance.getHashPrograms();
            const { programName: programNameColumn, universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, specialtyСodificator: specialtyСodificatorColumn, } = this.hashColumn_;
            this.listProgram_.forEach((program, i) => {
                const universityName = program[universityNameColumn];
                const abbreviation = program[universityAbbreviationColumn];
                const programName = program[programNameColumn];
                const specialtyСodificator = program[specialtyСodificatorColumn];
                const universityKey = this.uniteAbbrevationAndName(abbreviation, universityName);
                const universityId = hashUniversities[universityKey] || 0;
                const programKey = this.uniteUniversityIdAndProgramName(universityId, programName);
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
                else if (!universityId) {
                    errorText =
                        `University is not found in db for
                    program name="${programNameColumn}"`;
                }
                else if (!hashPrograms[programKey]) {
                    errorText =
                        `Program is not found in db for
                    program name="${programNameColumn}"`;
                }
                else if (!specialtyСodificator) {
                    errorText =
                        `Specialty for program is not exist
                    specialty="${specialtyСodificator}"`;
                }
                if (errorText) {
                    errorText += ` ${JSON.stringify(program, null, 2)}, row=${i}`;
                    logger.critical(errorText);
                    throw new Error(errorText);
                }
            });
        });
    }
    extractStatistics() {
        const hashPrograms = this.hashPrograms_;
        const hashUniversities = this.hashUniversities_;
        const hashEgeSkipScore = this.hashEgeSkipScore_;
        const { programName: programNameColumn, universityName: universityNameColumn, universityAbbreviation: universityAbbreviationColumn, competition: competitionColumn, budgetPlaces: budgetPlacesColumn, commercialPlaces: commercialPlacesColumn, cost: costColumn, egePassScore: egePassScoreColumn, } = this.hashColumn_;
        let statistics;
        let count = 0;
        statistics = this.listProgram_.map((program) => {
            const programName = this.cleanWhiteSpace(program[programNameColumn]);
            const universityName = this.cleanWhiteSpace(program[universityNameColumn]);
            const abbreviation = this.cleanWhiteSpace(program[universityAbbreviationColumn]);
            const competition = this.getCompetition(program[competitionColumn]);
            const budgetPlaces = this.int(program[budgetPlacesColumn]);
            const commercialPlaces = this.int(program[commercialPlacesColumn]);
            const cost = this.int(program[costColumn].replace(/,/g, ''));
            const egePassScore = this.int(program[egePassScoreColumn]);
            const universityKey = this.uniteAbbrevationAndName(abbreviation, universityName);
            const universityId = hashUniversities[universityKey];
            const programKey = this.uniteUniversityIdAndProgramName(universityId, programName);
            const data = {
                programId: hashPrograms[programKey],
                year: this.STATISTIC_YEAR,
            };
            if (competition) {
                data.competition = competition;
            }
            if (budgetPlaces) {
                data.budgetPlaces = budgetPlaces;
            }
            if (commercialPlaces) {
                data.commercialPlaces = commercialPlaces;
            }
            if (cost) {
                data.cost = cost;
            }
            const egeKey = this.uniteUniversityNameAndProgramName(universityName, programName);
            if (egePassScore && hashEgeSkipScore[egeKey]) {
                // console.log(hashEgeSkipScore[egeKey]);
                // console.log(universityName, programName);
                count++;
            }
            if (egePassScore && !hashEgeSkipScore[egeKey]) {
                data.egePassScore = egePassScore;
            }
            return data;
        });
        console.log('count=', count);
        // console.log('statistics=', statistics, statistics.length);
        return statistics;
    }
    updateStatistics(statisticsFromFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const statisticsDb = yield entranceStatistic_1.service.getAll();
            const hashStatisticDb = {};
            statisticsDb.forEach((statistic) => {
                const { id, programId, year } = statistic;
                const key = this.uniteProgramIdAndYear(programId, year);
                hashStatisticDb[key] = id;
            });
            const update = (statistic) => {
                const key = this.uniteProgramIdAndYear(statistic.programId, statistic.year);
                const statisticId = hashStatisticDb[key];
                let res = null;
                if (!statisticId) {
                    try {
                        // console.log('INSERT');
                        res = entranceStatistic_1.service.create(statistic);
                    }
                    catch (error) {
                        console.log('Error: create =>', error);
                    }
                }
                else {
                    try {
                        // console.log('UPDATE');
                        res = entranceStatistic_1.service.update(statisticId, statistic);
                    }
                    catch (error) {
                        console.log('Error: update =>', error);
                    }
                }
                return res;
            };
            yield promiseMethods_1.promiseMethods.queue(update, statisticsFromFile);
        });
    }
    getHashSkipEgeScore(pathFile) {
        const fullPath = path.join(__dirname, pathFile);
        return JSON.parse(fs.readFileSync(fullPath).toString());
    }
    getCompetition(str) {
        let res;
        let num = this.float(str);
        if (num > 1000) {
            num = num.toString();
            // convert 18266 to 18,266
            res = Number(num.replace(/^(\d{2})/, '$1.'));
            // console.log(str, res);
        }
        else {
            res = num;
        }
        return res;
    }
    int(str) {
        str = str.replace(/\s+/g, '');
        const res = parseInt(str, 10);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
    float(str) {
        str = str.replace(/\s+/g, '');
        if (typeof str === 'string') {
            str = str.replace(/\,/g, '.');
        }
        const res = parseFloat(str);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
}
exports.EntranceStatistics = EntranceStatistics;
;
