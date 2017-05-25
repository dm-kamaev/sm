"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramMetaNotFound extends Exception {
    constructor(programId) {
        super(`Program meta with program id = ${programId} not found`);
        this.name = 'ProgramMetaNotFoundException';
    }
}
exports.ProgramMetaNotFound = ProgramMetaNotFound;
