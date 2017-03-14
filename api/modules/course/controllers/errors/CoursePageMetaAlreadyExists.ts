import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class CoursePageMetaAlreadyExists extends Error {
    public code: String;
    public status: Number;
    public message: String;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'CoursePageMetaAlreadyExists';
        this.status = 422;
        this.message = 'Course page already have meta information';
    }

    get exception() {
        return this.exception_;
    }
}

export {CoursePageMetaAlreadyExists};
