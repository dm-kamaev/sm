"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class CommentNotBelongsToProgram extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'CommentNotBelongsToProgram';
        this.status = 422;
        this.message = `Комментарий, который вы хотите отредактировать ` +
            ` не принадлежит к программе с данным id`;
    }
}
exports.CommentNotBelongsToProgram = CommentNotBelongsToProgram;
