"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ExamNotFound extends Exception {
    constructor(examId) {
        super(`Exam with id = ${examId} not found`);
        this.name = 'ExamNotFoundException';
    }
}
exports.ExamNotFound = ExamNotFound;
