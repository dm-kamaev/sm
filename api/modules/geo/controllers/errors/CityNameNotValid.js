"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class CityNameNotValid extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'CityNameNotValid';
        this.status = 422;
        this.message = exception.message;
    }
}
exports.CityNameNotValid = CityNameNotValid;
