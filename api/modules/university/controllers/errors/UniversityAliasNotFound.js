"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class UniversityAliasNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'UniversityAliasNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.UniversityAliasNotFound = UniversityAliasNotFound;
