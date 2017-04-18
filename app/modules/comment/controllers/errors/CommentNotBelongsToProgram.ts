import {ServiceException} from '../../../../../api/components/interface';
import {ControllerError} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class CommentNotBelongsToProgram extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'CommentNotBelongsToProgram';
        this.status = 422;
        this.message = `Комментарий, который вы хотите отредактировать ` +
            ` не принадлежит к программе с данным id`;
    }
}

export {CommentNotBelongsToProgram };
