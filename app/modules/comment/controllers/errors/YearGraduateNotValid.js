"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class YearGraduateNotValid extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'YearGraduateNotValid';
        this.status = 422;
        this.message = 'Укажите год выпуска в формате ХХХХ';
    }
}
exports.YearGraduateNotValid = YearGraduateNotValid;
