'use strict';

import {
    ServiceException,
    ControllerError
} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class AddressDepartmentExist extends Error {
    public code: String;
    public status: Number;
    public message: String;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);
        this.code = 'AddressDepartmentExist';
        this.status = 422;
        this.message = String(exception);
    }

    get exception() {
        return this.exception_;
    }
}
export {AddressDepartmentExist};
