"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UniversityAliasNotFoundException extends Exception {
    constructor(universityAlias) {
        super(`University with alias = ${universityAlias} not found`);
        this.name = 'UniversityAliasNotFoundException';
    }
}
exports.UniversityAliasNotFoundException = UniversityAliasNotFoundException;
