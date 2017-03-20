import {ServiceException} from '../../../../../api/components/interface';
import {ControllerError} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class ProgramNotFound extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'ProgramNotFound';
        this.status = 404;
        this.message = 'Программа с данным id не найдена';
    }
}

export {ProgramNotFound};
