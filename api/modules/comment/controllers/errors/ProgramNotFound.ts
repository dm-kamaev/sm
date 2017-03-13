import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class ProgramNotFound extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'ProgramNotFound';
        this.status = 404;
        this.message = exception.message;
    }
}

export {ProgramNotFound};
