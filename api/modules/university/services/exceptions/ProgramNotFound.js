"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramNotFound extends Exception {
    constructor(programId) {
        super(`Program with id = ${programId} not found`);
        this.name = 'ProgramNotFoundException';
    }
}
exports.ProgramNotFound = ProgramNotFound;
