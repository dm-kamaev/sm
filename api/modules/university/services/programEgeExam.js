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
const ProgramEgeExam_1 = require("../models/ProgramEgeExam");
const ExamNotFound_1 = require("./exceptions/ExamNotFound");
const subjectService = require('../../study/services/subject');
class ProgramEgeExamService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProgramEgeExam_1.Model.findAll();
        });
    }
    getByProgramId(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exams = yield ProgramEgeExam_1.Model.findAll({
                attributes: {
                    exclude: [
                        'created_at', 'updated_at', 'program_id', 'subject_id'
                    ]
                },
                where: {
                    programId: programId
                },
                raw: true
            });
            const subjects = (yield subjectService.getByIds(exams.map(exam => exam.subjectId))) || [];
            return exams.map(exam => {
                const subject = subjects.find(subject => subject.id == exam.subjectId);
                exam.subjectName = subject.displayName;
                return exam;
            });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exam = yield ProgramEgeExam_1.Model.findOne({
                attributes: {
                    exclude: [
                        'created_at', 'updated_at', 'program_id', 'subject_id'
                    ]
                },
                where: {
                    id: id
                },
                raw: true
            });
            if (!exam) {
                throw new ExamNotFound_1.ExamNotFound(id);
            }
            const subject = yield subjectService.get({ id: exam.subjectId }, { count: 'one' });
            exam.subjectName = subject.displayName;
            return exam;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramEgeExam_1.Model.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramEgeExam_1.Model.update(data, {
                where: {
                    id: id
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProgramEgeExam_1.Model.destroy({
                where: {
                    id: id
                }
            });
        });
    }
}
const programEgeExamService = new ProgramEgeExamService();
exports.service = programEgeExamService;
