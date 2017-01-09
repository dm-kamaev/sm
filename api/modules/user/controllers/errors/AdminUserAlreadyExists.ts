import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class AdminUserAlreadyExists extends Error {
    public code: String;
    public status: Number;
    public message: String;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'AdminUserAlreadyExists';
        this.status = 403;
        this.message = 'Admin user with given id already exits';
    }

    get exception() {
        return this.exception_;
    }
}

export default AdminUserAlreadyExists;
