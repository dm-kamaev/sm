"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class UniversityNameIsEmpty extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'UniversityNameIsEmpty';
        this.status = 422;
        this.message = exception.message;
    }
}
exports.UniversityNameIsEmpty = UniversityNameIsEmpty;
