"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UniversityNotFound extends Exception {
    constructor() {
        super(`Program not found`);
        this.name = 'UniversityNotFoundException';
    }
}
exports.UniversityNotFound = UniversityNotFound;
