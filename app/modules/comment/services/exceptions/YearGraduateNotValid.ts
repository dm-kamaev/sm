/**
 * @fileoverview Exception, which occurs when year garduate validation does
 * not pass
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class YearGraduateNotValid extends Exception {
    public readonly name: string;

    constructor() {
        const message = `Entered graduation year not in required format`;
        super(message);

        this.name = 'YearGraduateNotValidException';
    }
}

export {YearGraduateNotValid};
