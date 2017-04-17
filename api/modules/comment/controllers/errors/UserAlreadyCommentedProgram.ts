import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class UserAlreadyCommentedProgram extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'UserAlreadyCommentedProgram';
        this.status = 403;
        this.message = exception.message;
    }
}

export {UserAlreadyCommentedProgram};
