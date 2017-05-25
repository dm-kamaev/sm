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
const lodash = require("lodash");
const page_1 = require("../../entity/models/page");
const ProgramPage_1 = require("../models/ProgramPage");
const program_1 = require("./program");
const page_2 = require("../../entity/services/page");
const universityPage_1 = require("./universityPage");
const urlsService = require('../../entity/services/urls');
const ProgramAliasNotFound_1 = require("./exceptions/ProgramAliasNotFound");
const entityType = require('../../entity/enums/entityType');
const PROGRAM_TYPE = entityType.PROGRAM;
class ProgramPageService {
    createPage(program) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = yield this.getAlias(program.universityId, program);
            const page = yield page_2.service.create({
                entityId: program.id,
                entityType: PROGRAM_TYPE,
                alias: alias,
                views: 0
            });
            program.setPages([page]);
        });
    }
    updatePage(program) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = yield this.getAlias(program.universityId, program);
            page_2.service.update({
                entityId: program.id,
                entityType: PROGRAM_TYPE
            }, {
                alias: alias
            });
        });
    }
    deletePage(program) {
        return __awaiter(this, void 0, void 0, function* () {
            page_2.service.delete(program.id, PROGRAM_TYPE);
        });
    }
    getByAlias(programAlias, universityAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const [programPages, univeristyPage] = yield Promise.all([
                this.getByProgramAlias(programAlias),
                universityPage_1.service.getByAlias(universityAlias)
            ]);
            const programs = yield program_1.service.getUniversityIds(programPages.map(programPage => programPage.programId));
            const foundProgram = lodash.find(programs, program => program.universityId === univeristyPage.universityId);
            if (!foundProgram) {
                throw new ProgramAliasNotFound_1.ProgramAliasNotFound(programAlias);
            }
            return foundProgram;
        });
    }
    getByProgramAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramPage_1.Model.findAll({
                include: [{
                        model: page_1.Model,
                        as: 'page',
                        where: {
                            alias: alias
                        }
                    }]
            });
        });
    }
    getAlias(universityId, program) {
        return __awaiter(this, void 0, void 0, function* () {
            const universityPrograms = yield program_1.service.getByUniversityId(universityId);
            const programIds = universityPrograms
                .filter(universityProgram => universityProgram.id !== program.id)
                .map(universityProgram => universityProgram.id);
            const programPages = yield page_2.service.getAliases(programIds, PROGRAM_TYPE);
            let isAliasUnique = false;
            let alias = urlsService.stringToURL(program.name);
            while (!isAliasUnique) {
                const page = programPages.find(programPage => programPage.alias === alias);
                if (page) {
                    alias += '_';
                }
                else {
                    isAliasUnique = true;
                }
            }
            return alias;
        });
    }
}
exports.service = new ProgramPageService();
