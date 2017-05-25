"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Service for make CRUD operations on program model
 */
const Sequelize = require("sequelize");
const sequelize = require('../../../../app/components/db');
const textSearchData_js_1 = require("../../entity/services/textSearchData.js");
const entityTypes = require('../../entity/enums/entityType.js');
const page_1 = require("../../entity/models/page");
const Program_1 = require("../models/Program");
const ProgramMajor_1 = require("../models/ProgramMajor");
const ProgramPageMetaInformation_1 = require("../models/ProgramPageMetaInformation");
const commentGroup_1 = require("../../comment/models/commentGroup");
const ProgramComment_1 = require("../../comment/models/ProgramComment");
const EntranceStatistic_1 = require("../models/EntranceStatistic");
const ProgramEgeExam_1 = require("../models/ProgramEgeExam");
const University_1 = require("../models/University");
const commentGroup_2 = require("../../comment/services/commentGroup");
const address_1 = require("../../geo/services/address");
const university_1 = require("./university");
const page_2 = require("../../entity/services/page");
const programSearch_1 = require("./programSearch");
const entityType = require('../../entity/enums/entityType');
const UrlTemplate_1 = require("../constants/UrlTemplate");
const exceptions_1 = require("./exceptions");
const EXCLUDE_FIELDS = [
    'created_at',
    'updated_at',
    'university_id',
    'comment_group_id',
    'program_major_id',
    'programMajorId',
];
class ProgramService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const programs = yield Program_1.Model.findAll({
                attributes: {
                    exclude: EXCLUDE_FIELDS
                },
                include: [{
                        model: commentGroup_1.Model,
                        as: 'commentGroup',
                        include: [{
                                model: ProgramComment_1.Model,
                                as: 'programComments'
                            }]
                    }, {
                        model: EntranceStatistic_1.Model,
                        as: 'entranceStatistics'
                    }]
            });
            return programs;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = yield Program_1.Model.findOne({
                attributes: {
                    exclude: EXCLUDE_FIELDS
                },
                where: {
                    id: id
                },
                include: [{
                        attributes: ['id', 'name'],
                        model: ProgramMajor_1.Model,
                        as: 'programMajor'
                    }, {
                        attributes: ['id'],
                        model: ProgramPageMetaInformation_1.Model,
                        as: 'programPageMetaInformations'
                    }]
            });
            if (!program) {
                throw new exceptions_1.ProgramNotFound(id);
            }
            const data = program.toJSON();
            const result = {};
            Object.keys(data).forEach(key => {
                if (key != 'programPageMetaInformations') {
                    result[key] = data[key];
                }
            });
            result.pageMetaId = data.programPageMetaInformations ?
                data.programPageMetaInformations.id :
                null;
            const addresses = yield program.getAddresses();
            result.addressName = addresses[0] ? addresses[0].name : null;
            return result;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                return this.fullCreate(data);
            })).catch(error => {
                throw error;
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                return this.fullUpdate(id, data);
            })).catch(error => {
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Program_1.Model.destroy({
                where: {
                    id: id
                },
                individualHooks: true
            });
        });
    }
    getOne(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield this.silentGetOne_(programId);
            if (!instance) {
                throw new exceptions_1.ProgramNotFound(programId);
            }
            return instance;
        });
    }
    getByIds(programIds, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const include = params && params.includeUniversities && [{
                    model: University_1.Model,
                    as: 'university'
                }];
            return Program_1.Model.findAll({
                where: {
                    id: programIds
                },
                attributes: {
                    exclude: EXCLUDE_FIELDS
                },
                include: include
            });
        });
    }
    getCommentGroup(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = yield this.getOne(programId);
            return yield program.getCommentGroup();
        });
    }
    getByUniversityId(universityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Program_1.Model.findAll({
                where: { universityId },
                attributes: {
                    exclude: EXCLUDE_FIELDS
                },
                include: [{
                        model: commentGroup_1.Model,
                        as: 'commentGroup',
                        include: [{
                                model: ProgramComment_1.Model,
                                as: 'programComments'
                            }]
                    }, {
                        model: EntranceStatistic_1.Model,
                        as: 'entranceStatistics'
                    }]
            });
        });
    }
    getByCommentGroup(commentGroupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Program_1.Model.findOne({
                where: {
                    commentGroupId: commentGroupId
                }
            });
        });
    }
    getProgramAlias(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const program = yield page_2.service.getOne(id, entityType.PROGRAM);
            return program.alias;
        });
    }
    getUrl(program) {
        return __awaiter(this, void 0, void 0, function* () {
            const programPage = yield page_2.service.getOne(program.id, entityType.PROGRAM), universityPage = yield page_2.service.getOne(program.universityId, entityType.UNIVERSITY);
            return this.convertToUrl(universityPage.alias, programPage.alias);
        });
    }
    getUrls(programs) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityIds = programs.reduce((result, program) => {
                result.program.push(program.id);
                result.university.push(program.universityId);
                return result;
            }, {
                program: [],
                university: []
            });
            const [programPages, universityPages] = yield Promise.all([
                page_2.service.getAliases(entityIds.program, entityType.PROGRAM),
                page_2.service.getAliases(entityIds.university, entityType.UNIVERSITY)
            ]);
            return programs.map(program => {
                const programAlias = programPages
                    .find(programPage => programPage.entityId === program.id)
                    .alias;
                const universityAlias = universityPages
                    .find(universityPage => universityPage.entityId === program.universityId)
                    .alias;
                return {
                    id: program.id,
                    url: this.convertToUrl(universityAlias, programAlias)
                };
            });
        });
    }
    getAllWithEgeAndStatistic() {
        return __awaiter(this, void 0, void 0, function* () {
            const programs = yield Program_1.Model.findAll({
                attributes: {
                    exclude: EXCLUDE_FIELDS
                },
                include: [{
                        model: EntranceStatistic_1.Model,
                        as: 'entranceStatistics',
                    }, {
                        model: ProgramEgeExam_1.Model,
                        as: 'programEgeExams'
                    }, {
                        model: University_1.Model,
                        as: 'university',
                        attributes: ['cityId']
                    }],
            });
            return programs;
        });
    }
    getFullList() {
        return __awaiter(this, void 0, void 0, function* () {
            return Program_1.Model.findAll({
                include: [{
                        model: University_1.Model,
                        as: 'university'
                    }, {
                        model: EntranceStatistic_1.Model,
                        as: 'entranceStatistics'
                    }, {
                        model: ProgramEgeExam_1.Model,
                        as: 'programEgeExams'
                    }],
                order: [[
                        {
                            model: EntranceStatistic_1.Model,
                            as: 'entranceStatistics'
                        },
                        'year',
                        'DESC'
                    ]]
            });
        });
    }
    suggestSearch(searchString) {
        return __awaiter(this, void 0, void 0, function* () {
            const mustLength = 2;
            if (!searchString || searchString.length < mustLength) {
                throw new exceptions_1.ProgramNameIsShorterException(searchString, mustLength);
            }
            const founded = yield textSearchData_js_1.service.entitiesSearch(searchString, [entityTypes.PROGRAM]);
            if (!founded.program) {
                return null;
            }
            const programIds = founded.program;
            return yield this.getByIds(programIds, { includeUniversities: true });
        });
    }
    searchList(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield this.getRawSearchList_(queryParams);
            let result;
            if (!queryResult.length) {
                result = {
                    programCount: 0,
                    universityCount: 0,
                    programs: []
                };
            }
            else {
                result = {
                    programCount: Number(queryResult[0].programCount),
                    universityCount: Object.keys(queryResult[0].universities).length,
                    programs: queryResult.map(program => ({
                        id: program.id,
                        name: program.name,
                        totalScore: program.totalScore,
                        exchangeProgram: program.exchangeProgram,
                        extraExam: program.extraExam,
                        egeScore: program.egeScore,
                        cost: program.cost,
                        budgetPlaces: program.budgetPlaces,
                        commercialPlaces: program.commercialPlaces,
                        competition: program.competition,
                        imageUrl: program.imageUrl,
                        universityName: program.universityName,
                        universityAbbreviation: program.universityAbbreviation,
                        cityName: program.cityName,
                        programAlias: program.programAlias,
                        universityAlias: program.universityAlias
                    }))
                };
            }
            return result;
        });
    }
    searchCountList(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchParams = programSearch_1.programSearchService.converSearchParams(queryParams);
            const searchQuery = programSearch_1.programSearchService.getCountSearchQuery(searchParams);
            const result = yield sequelize.query(searchQuery, {
                type: Sequelize.QueryTypes.SELECT
            });
            return result[0];
        });
    }
    getUniversityIds(programIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return Program_1.Model.findAll({
                attributes: ['id', 'universityId'],
                where: {
                    id: {
                        $in: programIds
                    }
                }
            });
        });
    }
    getRawSearchList_(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchParams = programSearch_1.programSearchService.converSearchParams(queryParams);
            const searchQuery = programSearch_1.programSearchService.getListSearchQuery(searchParams);
            return sequelize.query(searchQuery, {
                type: Sequelize.QueryTypes.SELECT
            });
        });
    }
    getProgramsWithAlias_(programIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Program_1.Model.findAll({
                attributes: ['id', 'name', 'score', 'totalScore'],
                where: {
                    id: {
                        $in: programIds
                    }
                },
                include: [{
                        attributes: ['alias'],
                        model: page_1.Model,
                        as: 'pages'
                    }],
            });
        });
    }
    convertToUrl(universityAlias, programAlias) {
        return UrlTemplate_1.UrlTemplate.PROGRAM
            .replace('${universityAlias}', universityAlias)
            .replace('${programAlias}', programAlias);
    }
    fullCreate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentGroup = yield commentGroup_2.service.create();
            data.commentGroupId = commentGroup.id;
            const program = yield Program_1.Model.create(data);
            const university = yield university_1.service.get(program.universityId);
            if (data.addressName) {
                const address = yield address_1.service.getOrCreateByName(data.addressName, university.cityId);
                yield program.setAddresses([address]);
            }
            return program;
        });
    }
    fullUpdate(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedResult = yield Program_1.Model.update(data, {
                where: {
                    id: id
                },
                individualHooks: true
            });
            const program = yield Program_1.Model.findById(id);
            const university = yield university_1.service.get(program.universityId);
            if (data.addressName) {
                const address = yield address_1.service.getOrCreateByName(data.addressName, university.cityId);
                yield program.setAddresses([address]);
            }
            return updatedResult;
        });
    }
    silentGetOne_(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Program_1.Model.findById(programId);
        });
    }
}
const programService = new ProgramService();
exports.service = programService;
