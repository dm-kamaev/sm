/**
 * @fileOverview
 */
import {ServiceException} from '../../../../components/interface';
import {ControllerError} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

export class OlympiadResultNotFound extends Error {
    public code: String;
    public status: Number;
    public message: String;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'OlympiadResultNotFound';
        this.status = 404;
        this.message = 'Olympiad result with given id not found';
    }
}