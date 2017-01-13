'use strict';
const schoolTypes = require('../../enums/schoolType.js');
const Exception = require('nodules/controller/ServiceException');
class SchoolNotExistType extends Exception {
    constructor(schoolType) {
        let message = `Not exist school type "${schoolType}".\n `;
        message += `Valid type: ${schoolTypes.toArray().join(', ')}`;
        super(message);
        this.name_ = 'SchoolNotExistTypeError';
        this.schoolType_ = schoolType;
    }
    get name() {
        return this.name_;
    }
    set name(name) {
        this.name_ = name;
    }
    get schoolType() {
        return this.schoolType_;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SchoolNotExistType;
