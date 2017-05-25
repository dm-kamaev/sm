"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class CityAlreadyExist extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'CityAlreadyExist';
        this.status = 422;
        this.message = exception.message;
    }
}
exports.CityAlreadyExist = CityAlreadyExist;
