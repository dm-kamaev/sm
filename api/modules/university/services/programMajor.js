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
const squel = require("squel");
squel.useFlavour('postgres');
const sequelize = require('../../../../app/components/db');
const ProgramMajor_1 = require("../models/ProgramMajor");
const CourseTypeModel = require('../../course/models/CourseType').Model;
const EXCLUDE_ATTRIBUTES = ['created_at', 'updated_at'];
class ProgramMajor {
    search(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramMajor_1.Model.findAll({
                attributes: { exclude: EXCLUDE_ATTRIBUTES },
                where: {
                    name: {
                        $ilike: `%${name}%`
                    }
                }
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramMajor_1.Model.findAll({
                attributes: { exclude: EXCLUDE_ATTRIBUTES },
                include: [{
                        attributes: ['id'],
                        model: CourseTypeModel,
                        as: 'courseTypes'
                    }]
            });
        });
    }
    getPopular(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramMajor_1.Model.findAll({
                limit: limit,
                order: [['popularity', 'DESC']]
            });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramMajor_1.Model.findOne({
                attributes: { exclude: EXCLUDE_ATTRIBUTES },
                where: { id },
                include: [{
                        model: CourseTypeModel,
                        as: 'courseTypes'
                    }]
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const programMajor = yield ProgramMajor_1.Model.create({
                name: data.name
            });
            programMajor.setCourseTypes(data.courseTypes);
            return programMajor;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const programMajor = yield ProgramMajor_1.Model.findById(id);
            yield programMajor.update({ name: data.name });
            programMajor.setCourseTypes(data.courseTypes);
            return programMajor;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramMajor_1.Model.destroy({
                where: { id }
            });
        });
    }
    getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProgramMajor_1.Model.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
                ]
            });
            return Number(result[0].getDataValue('count'));
        });
    }
}
exports.service = new ProgramMajor();
