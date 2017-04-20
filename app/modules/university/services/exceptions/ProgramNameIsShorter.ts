/**
 * @fileOverview Exception, which occurs when program not found by id
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ProgramNameIsShorter extends Exception {
    public readonly name: string;

    constructor() {
        super(`Search string must be longer`);

        this.name = 'ProgramNameIsShorterException';
    }
}

export {ProgramNameIsShorter};
