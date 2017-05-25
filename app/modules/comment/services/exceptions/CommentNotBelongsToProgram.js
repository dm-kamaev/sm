"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class CommentNotBelongsToProgram extends Exception {
    constructor() {
        const message = `Program comment with given id` +
            ` not belongs to program with given id`;
        super(message);
        this.name = 'CommentNotBelongsToProgramException';
    }
}
exports.CommentNotBelongsToProgram = CommentNotBelongsToProgram;
