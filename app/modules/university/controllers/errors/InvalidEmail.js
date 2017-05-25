"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class InvalidEmail extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'InvalidEmail';
        this.status = 422;
        this.message = String(exception);
    }
    get exception() {
        return this.exception_;
    }
}
exports.InvalidEmail = InvalidEmail;
