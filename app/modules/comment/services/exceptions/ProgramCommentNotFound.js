"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramCommentNotFound extends Exception {
    constructor() {
        super(`Program comment with given id not found`);
        this.name = 'ProgramCommentNotFoundException';
    }
}
exports.ProgramCommentNotFound = ProgramCommentNotFound;
