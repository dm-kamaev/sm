"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramNameIsShorter extends Exception {
    constructor() {
        super(`Search string must be longer`);
        this.name = 'ProgramNameIsShorterException';
    }
}
exports.ProgramNameIsShorter = ProgramNameIsShorter;
