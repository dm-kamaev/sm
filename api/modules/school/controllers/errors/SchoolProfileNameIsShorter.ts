import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class SchoolProfileNameIsShorter extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'SchoolProfileNameIsShorter';
        this.status = 422;
        this.message = String(exception);
    }
}
export {SchoolProfileNameIsShorter}
