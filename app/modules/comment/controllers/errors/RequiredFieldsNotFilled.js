"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error = require('nodules/controller/ControllerError');
class RequiredFieldsNotFilled extends Error {
    constructor(exception) {
        super(exception);
        this.code = 'RequiredFieldsNotFilled';
        this.status = 422;
        this.message = 'Оставьте оценку или комментарий';
    }
}
exports.RequiredFieldsNotFilled = RequiredFieldsNotFilled;
