import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class UniversityCommentNotBelongsToProgram extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'UniversityCommentNotBelongsToProgram';
        this.status = 422;
        this.message = exception.message;
    }
}

export {UniversityCommentNotBelongsToProgram};
