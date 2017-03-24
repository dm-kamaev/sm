import {ServiceException} from '../../../../../api/components/interface';
import {ControllerError} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class UserAlreadyCommentedProgram extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'UserAlreadyCommentedProgram';
        this.status = 403;
        this.message = 'Вы уже оставляли комментарий у этой программы';
    }
}

export {UserAlreadyCommentedProgram};
