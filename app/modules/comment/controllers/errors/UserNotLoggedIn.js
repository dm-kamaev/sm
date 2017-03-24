"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class UserNotLoggedIn extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'UserNotLoggedIn';
        this.status = 403;
        this.message = 'Необходимо войти';
    }
}
exports.UserNotLoggedIn = UserNotLoggedIn;
