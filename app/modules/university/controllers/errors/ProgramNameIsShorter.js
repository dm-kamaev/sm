"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class ProgramNameIsShorter extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'ProgramNameIsShorter';
        this.status = 422;
        this.message = 'Недостаточно символов для поиска.';
    }
}
exports.ProgramNameIsShorter = ProgramNameIsShorter;
