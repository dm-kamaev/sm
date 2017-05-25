"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class ProgramMetaNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'ProgramMetaNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.ProgramMetaNotFound = ProgramMetaNotFound;
