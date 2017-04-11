import {
    ServiceException,
    ControllerError
} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class InvalidEmail extends Error {
    public code: String;
    public status: Number;
    public message: String;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);
        this.code = 'InvalidEmail';
        this.status = 422;
        this.message = String(exception);
    }

    get exception() {
        return this.exception_;
    }
}

export {InvalidEmail};
