"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class ProgramCommentNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'ProgramCommentNotFound';
        this.status = 404;
        this.message = 'Комментарий с данным id не найден';
    }
}
exports.ProgramCommentNotFound = ProgramCommentNotFound;
