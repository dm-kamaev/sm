import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class DepartmentNotFound extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'DepartmentNotFound';
        this.status = 404;
        this.message = 'Department with given id not found';
    }
}
export {DepartmentNotFound}