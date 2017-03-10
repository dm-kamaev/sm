import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class SchoolCategoryNameIsShorter extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'SchoolCategoryNameIsShorter';
        this.status = 422;
        this.message = String(exception);
    }
}
export {SchoolCategoryNameIsShorter}
