import {ServiceException} from '../../../../../api/components/interface';
import {ControllerError} from '../../../../../api/components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class ProgramNameIsShorter extends Error {
    public code: string;
    public status: number;
    public message: string;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'ProgramNameIsShorter';
        this.status = 422;
        this.message = 'Недостаточно символов для поиска.';
    }
}

export {ProgramNameIsShorter};
