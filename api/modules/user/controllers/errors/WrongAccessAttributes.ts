import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class WrongAttributes extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'WrongAttributes';
        this.status = 400;
        this.message = 'One of access attributes not found';
    }
}

export default WrongAttributes;
