import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class WrongAttributes extends Error {
    public code: string;
    public status: number;
    public message: string;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'WrongAttributes';
        this.status = 400;
        this.message = 'One of access attributes not found';
    }

    get exception(): ServiceException {
        return this.exception_;
    }

}

export {WrongAttributes};
