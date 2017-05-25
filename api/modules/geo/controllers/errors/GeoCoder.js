"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class GeoCoder extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'GeoCoder';
        this.status = 503;
        this.message = exception.message;
    }
}
exports.GeoCoder = GeoCoder;
