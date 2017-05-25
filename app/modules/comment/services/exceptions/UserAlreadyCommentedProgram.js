"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UserAlreadyCommentedProgram extends Exception {
    constructor() {
        const message = `User with given id` +
            ` already place comment to program with given id`;
        super(message);
        this.name = 'UserAlreadyCommentedProgramException';
    }
}
exports.UserAlreadyCommentedProgram = UserAlreadyCommentedProgram;
