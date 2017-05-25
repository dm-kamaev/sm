"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UniversityNameIsEmptyException extends Exception {
    constructor(universityName) {
        super(`university name is empty "${universityName}"`);
        this.name = 'UniversityNameIsEmptyException';
    }
}
exports.UniversityNameIsEmptyException = UniversityNameIsEmptyException;
