"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class ExamNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'ExamNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.ExamNotFound = ExamNotFound;
