"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class UserAlreadyCommentedProgram extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'UserAlreadyCommentedProgram';
        this.status = 403;
        this.message = exception.message;
    }
}
exports.UserAlreadyCommentedProgram = UserAlreadyCommentedProgram;
