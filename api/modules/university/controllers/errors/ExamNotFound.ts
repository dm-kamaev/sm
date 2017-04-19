import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

export class ExamNotFound extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'ExamNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}
