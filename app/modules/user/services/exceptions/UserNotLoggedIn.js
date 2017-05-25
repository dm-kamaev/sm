"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class UserNotLoggedInException extends Exception {
    constructor() {
        super(`User not logged in`);
        this.name = 'UserNotLoggedInException';
    }
}
exports.UserNotLoggedInException = UserNotLoggedInException;
