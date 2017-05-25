"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class RequiredFieldsNotFilledException extends Exception {
    constructor() {
        const message = `Given comment data does not contain all required fields`;
        super(message);
        this.name = 'RequiredFieldsNotFilledException';
    }
}
exports.RequiredFieldsNotFilledException = RequiredFieldsNotFilledException;
