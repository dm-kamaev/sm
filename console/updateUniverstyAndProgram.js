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
// node commander.js updateUniverstyAndProgram
// update universities, programs and reltions
// update table university, program, city, program_ege_exam
const commander = require("commander");
const path = require("path");
const logger = require('../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../app/components/db.js');
const xlsx_1 = require("../api/components/xlsx");
const Universities_1 = require("./modules/updateUniversityAndProgram/Universities");
const Programs_1 = require("./modules/updateUniversityAndProgram/Programs");
const EgeExams_1 = require("./modules/updateUniversityAndProgram/EgeExams");
const EntranceStatistics_1 = require("./modules/updateUniversityAndProgram/EntranceStatistics");
const Cities_1 = require("./modules/updateUniversityAndProgram/Cities");
class UpdateUniversityProgram {
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
            exchangeProgram: 'Программы обмена (страны через запятую)',
        };
        this.hashColumnEgeExam_ = {
            universityAbbreviation: 'Аббревиатура вуза',
            programName: 'Название программы',
            ege: 'ЕГЭ',
            extraExam: 'Экзамены в вузе',
        };
    }
    topPrograms() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('------Top programs-----');
            const pathFile = '../assets/universities/listProgramTop.xlsx';
            yield this.updateProgramAndRelation(pathFile);
            yield this.updateEgeExam(pathFile, {
                formatEgeExam: 'human'
            });
        });
    }
    otherPrograms() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('------Other programs-----');
            const pathFile = '../assets/universities/listProgramAll.xlsx';
            yield this.updateProgramAndRelation(pathFile);
            yield this.updateEgeExam(pathFile);
        });
    }
    updateProgramAndRelation(pathFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info('Reading file programs and universities...');
                this.listProgram_ = yield this.getJsonFromXlsx(pathFile);
                this.filterEmptyRow();
                const data = {
                    hashColumn: this.hashColumn_,
                    listProgram: this.listProgram_,
                };
                logger.info('Update cities...');
                yield new Cities_1.Cities(data).updateViaXlsx();
                const universities = new Universities_1.Universities(data);
                logger.info('Validate universities...');
                yield universities.validate();
                logger.info('Update...');
                yield universities.updateViaXlsx();
                const programs = new Programs_1.Programs(data);
                logger.info('Validate programs...');
                yield programs.validate();
                logger.info('Update...');
                yield programs.updateViaXlsx();
                const entranceStatistics = new EntranceStatistics_1.EntranceStatistics(data);
                logger.info('Validate entranceStatistics...');
                yield entranceStatistics.validate();
                logger.info('Update...');
                yield entranceStatistics.updateViaXlsx();
            }
            catch (error) {
                logger.critical('updateProgramAndRelation =>', error);
            }
        });
    }
    updateEgeExam(pathFile, option) {
        return __awaiter(this, void 0, void 0, function* () {
            option = option || {};
            try {
                logger.info('Reading file egeExam...');
                this.listEgeExams_ = yield this.getJsonFromXlsx(pathFile, { sheet: 'поступи' });
                const egeExams = new EgeExams_1.EgeExams({
                    hashColumn: this.hashColumnEgeExam_,
                    listProgram: this.listEgeExams_,
                    formatEgeExam_: option.formatEgeExam
                });
                logger.info('Validate...');
                yield egeExams.validate();
                logger.info('Update...');
                yield egeExams.updateViaXlsx();
            }
            catch (error) {
                logger.critical('updateEgeExam =>', error);
            }
        });
    }
    getJsonFromXlsx(pathFile, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = path.join(__dirname, pathFile);
            return yield xlsx_1.xlsx.getJson(fullPath, option);
        });
    }
    filterEmptyRow() {
        this.listProgram_ = this.listProgram_.filter(row => {
            let count = 0;
            const cellNames = Object.keys(row);
            cellNames.forEach((cellName) => {
                if (!row[cellName]) {
                    count++;
                }
            });
            return count === cellNames.length ? false : true;
        });
    }
}
;
commander
    .command('updateUniverstyAndProgram')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    logger.info('-----START-----');
    const updateUniversityProgram = new UpdateUniversityProgram();
    yield updateUniversityProgram.topPrograms();
    yield updateUniversityProgram.otherPrograms();
    logger.info('-----THE END-----');
}));
exports.Command;
