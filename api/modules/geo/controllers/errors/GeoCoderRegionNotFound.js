"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class GeoCoderRegionNotFound extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'GeoCoderRegionNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
exports.GeoCoderRegionNotFound = GeoCoderRegionNotFound;
