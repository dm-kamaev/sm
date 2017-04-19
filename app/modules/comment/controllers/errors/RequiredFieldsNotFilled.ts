import {ServiceException} from '../../../../../api/components/interface';
import {ControllerError} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class RequiredFieldsNotFilled extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'RequiredFieldsNotFilled';
        this.status = 422;
        this.message = 'Оставьте оценку или комментарий';
    }
}

export {RequiredFieldsNotFilled};
