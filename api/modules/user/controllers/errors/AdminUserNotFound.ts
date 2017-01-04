import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class AdminUserAlreadyExists extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'AdminUserNotFound';
        this.status = 404;
        this.message = 'Admin user with given id not found';
    }
}

export default AdminUserAlreadyExists;
