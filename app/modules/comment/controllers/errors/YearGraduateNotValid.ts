import {ServiceException} from '../../../../../api/components/interface';
import {ControllerError} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class YearGraduateNotValid extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'YearGraduateNotValid';
        this.status = 422;
        this.message = 'Укажите год выпуска в формате ХХХХ';
    }
}

export {YearGraduateNotValid};
