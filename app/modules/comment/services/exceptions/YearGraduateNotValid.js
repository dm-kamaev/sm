"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class YearGraduateNotValid extends Exception {
    constructor() {
        const message = `Entered graduation year not in required format`;
        super(message);
        this.name = 'YearGraduateNotValidException';
    }
}
exports.YearGraduateNotValid = YearGraduateNotValid;
