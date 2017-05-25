"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class UniversityAliasDuplicate extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'UniversityAliasDuplicate';
        this.status = 422;
        this.message = exception.message;
    }
}
exports.UniversityAliasDuplicate = UniversityAliasDuplicate;
