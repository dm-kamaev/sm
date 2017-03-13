import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

export class CityNameNotValid extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'CityNameNotValid';
        this.status = 422;
        this.message = exception.message;
    }
}
