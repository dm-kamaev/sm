import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class ProgramCommentNotFound extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'ProgramCommentNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}

export {ProgramCommentNotFound};
