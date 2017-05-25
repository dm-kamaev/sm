"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class CityNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'CityNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.CityNotFound = CityNotFound;
