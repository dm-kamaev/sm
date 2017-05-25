"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramNotFound extends Exception {
    constructor() {
        super(`Program with given id not found`);
        this.name = 'ProgramNotFoundException';
    }
}
exports.ProgramNotFound = ProgramNotFound;
