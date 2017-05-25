"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class ProgramNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'ProgramNotFound';
        this.status = 404;
        this.message = 'Программа с данным id не найдена';
    }
}
exports.ProgramNotFound = ProgramNotFound;
