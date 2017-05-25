"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class CityNameEmpty extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'CityNameEmpty';
        this.status = 422;
        this.message = exception.message;
    }
}
exports.CityNameEmpty = CityNameEmpty;
