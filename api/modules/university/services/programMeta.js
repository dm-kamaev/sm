"use strict";
// author: dm-kamaev
// service meta information for program
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = require("../../entity/services/page");
const entityTypes = require('../../entity/enums/entityType.js');
const ProgramPageMetaInformation_1 = require("../models/ProgramPageMetaInformation");
const exceptions_1 = require("./exceptions");
const EXCLUDE_ATTRIBUTES = ['created_at', 'updated_at', 'program_id'];
class ProgramMeta {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProgramPageMetaInformation_1.Model.findOne({
                attributes: {
                    exclude: EXCLUDE_ATTRIBUTES,
                },
                where: {
                    id,
                },
                raw: true,
            });
        });
    }
    create(data, programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = data.url;
            data.url = null;
            data.programId = programId;
            const res = yield ProgramPageMetaInformation_1.Model.create(data);
            yield page_1.service.update({
                entityId: programId,
                entityType: entityTypes.PROGRAM,
            }, {
                alias
            });
            return res;
        });
    }
    update(programId, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = data.url;
            data.url = null;
            const programMeta = yield ProgramPageMetaInformation_1.Model.update(data, {
                where: {
                    id,
                },
                returning: true
            });
            const res = (programMeta && programMeta[1]) ?
                programMeta[1][0] :
                null;
            yield page_1.service.update({
                entityId: programId,
                entityType: entityTypes.PROGRAM,
            }, {
                alias
            });
            return res;
        });
    }
    getByProgramId(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const programMeta = yield ProgramPageMetaInformation_1.Model.findOne({
                where: { programId }
            });
            if (!programMeta) {
                throw new exceptions_1.ProgramMetaNotFound(programId);
            }
            return programMeta;
        });
    }
}
exports.programMetaService = new ProgramMeta();
