"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UserAlreadyCommentedProgram extends Exception {
    constructor(programId, userId) {
        const message = `User with id = ${userId}` +
            ` already place comment to program with id = ${programId}`;
        super(message);
        this.name = 'UserAlreadyCommentedProgramException';
    }
}
exports.UserAlreadyCommentedProgram = UserAlreadyCommentedProgram;
