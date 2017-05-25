"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class ProfileNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'ProfileNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.ProfileNotFound = ProfileNotFound;
