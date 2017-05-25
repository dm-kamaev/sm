"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramCommentNotFound extends Exception {
    constructor(programCommentId) {
        super(`Program comment with id = ${programCommentId} not found`);
        this.name = 'ProgramCommentNotFoundException';
    }
}
exports.ProgramCommentNotFound = ProgramCommentNotFound;
