"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UniversityAliasDuplicateException extends Exception {
    constructor(alias, duplicate) {
        super(`university with alias: "${alias}" already exist\n` +
            `page=${JSON.stringify(duplicate, null, 2)}`);
        this.name = 'UniversityAliasDuplicateException';
    }
}
exports.UniversityAliasDuplicateException = UniversityAliasDuplicateException;
