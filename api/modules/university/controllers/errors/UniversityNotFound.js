"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class UniversityNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'UniversityNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.UniversityNotFound = UniversityNotFound;
