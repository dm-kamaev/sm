import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class UniversityCommentNotFound extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'UniversityCommentNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}

export {UniversityCommentNotFound};
