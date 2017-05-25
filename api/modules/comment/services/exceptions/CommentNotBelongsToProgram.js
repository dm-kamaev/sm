"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class CommentNotBelongsToProgram extends Exception {
    constructor(programId, commentId) {
        const message = `Program comment with id = ${commentId}` +
            ` not belongs to program with id = ${programId}`;
        super(message);
        this.name = 'CommentNotBelongsToProgramException';
    }
}
exports.CommentNotBelongsToProgram = CommentNotBelongsToProgram;
