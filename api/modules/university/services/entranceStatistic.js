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
const sequelize = require('../../../../app/components/db');
const EntranceStatistic_1 = require("../models/EntranceStatistic");
const subjectService = require('../../study/services/subject');
const EXCLUDE_FIELDS = ['created_at', 'updated_at', 'program_id'];
class EntranceStatisticService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return EntranceStatistic_1.Model.findAll();
        });
    }
    getByProgramId(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            return EntranceStatistic_1.Model.findAll({
                attributes: {
                    exclude: EXCLUDE_FIELDS
                },
                where: {
                    programId: programId
                }
            });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return EntranceStatistic_1.Model.findOne({
                attributes: {
                    exclude: EXCLUDE_FIELDS
                },
                where: {
                    id: id
                }
            });
        });
    }
    getLast(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entranceStatistics = yield EntranceStatistic_1.Model.findAll({
                where: { programId },
                order: [['year', 'DESC']],
                limit: 1
            });
            return entranceStatistics[0];
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return EntranceStatistic_1.Model.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return EntranceStatistic_1.Model.update(data, {
                where: {
                    id: id
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return EntranceStatistic_1.Model.destroy({
                where: {
                    id: id
                }
            });
        });
    }
}
const entranceStatisticService = new EntranceStatisticService();
exports.service = entranceStatisticService;
