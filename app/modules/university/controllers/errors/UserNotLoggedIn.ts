import {ServiceException} from '../../../../../api/components/interface';
import {ControllerError} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class UserNotLoggedIn extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'UserNotLoggedIn';
        this.status = 403;
        this.message = 'Необходимо войти';
    }
}

export {UserNotLoggedIn};
