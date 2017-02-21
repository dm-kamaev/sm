import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class OlympiadResultsAlreadyExists extends Error {
    public readonly code: String;
    public readonly status: Number;
    public readonly message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'OlympiadResultsAlreadyExists';
        this.status = 422;
        this.message = 'Olympiad result with given parameters already exists';
    }
}
export {OlympiadResultsAlreadyExists}
