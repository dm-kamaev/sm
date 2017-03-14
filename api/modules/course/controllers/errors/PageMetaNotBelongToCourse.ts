import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class PageMetaNotBelongsToCourse extends Error {
    public code: String;
    public status: Number;
    public message: String;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'PageMetaNotBelongsToCourse';
        this.status = 422;
        this.message =
            'Given course page meta information not belongs to course';
    }

    get exception() {
        return this.exception_;
    }
}

export {PageMetaNotBelongsToCourse};
