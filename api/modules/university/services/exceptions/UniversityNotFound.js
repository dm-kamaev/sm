"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UniversityNotFound extends Exception {
    constructor(universityId) {
        super(`University with id = ${universityId} not found`);
        this.name = 'UniversityNotFoundException';
    }
}
exports.UniversityNotFound = UniversityNotFound;
