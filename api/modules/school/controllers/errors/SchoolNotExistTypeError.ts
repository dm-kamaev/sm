'use strict';

import {
    ServiceException,
    ControllerError
} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class SchoolNotExistType extends Error {
    public code: String;
    public status: Number;
    public message: String;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);
        this.code = 'SchoolNotExistType';
        this.status = 404;
        this.message = String(exception);
    }

    get exception() {
        return this.exception_;
    }
}
export {SchoolNotExistType};
