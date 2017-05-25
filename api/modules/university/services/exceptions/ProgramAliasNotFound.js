"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramAliasNotFound extends Exception {
    constructor(universityAlias) {
        super(`Program with alias = ${universityAlias} not found`);
        this.name = 'ProgramAliasNotFoundException';
    }
}
exports.ProgramAliasNotFound = ProgramAliasNotFound;
