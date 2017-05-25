"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class ProgramAliasNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'ProgramAliasNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.ProgramAliasNotFound = ProgramAliasNotFound;
