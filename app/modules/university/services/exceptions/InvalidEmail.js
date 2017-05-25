'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class InvalidEmail extends Exception {
    constructor() {
        const message = `Некорректный email`;
        super(message);
        this.name_ = 'InvalidEmailException';
    }
    get name() {
        return this.name_;
    }
    set name(name) {
        this.name_ = name;
    }
}
exports.InvalidEmail = InvalidEmail;
