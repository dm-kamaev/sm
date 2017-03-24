/**
 * @fileOverview Exception, which occurs where comment entered data
 * not contains all needed information
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class RequiredFieldsNotFilledException extends Exception {
    public readonly name: string;

    constructor() {
        const message =
            `Given comment data does not contain all required fields`;
        super(message);

        this.name = 'RequiredFieldsNotFilledException';
    }
}

export {RequiredFieldsNotFilledException};
