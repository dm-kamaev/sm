/**
 * @fileOverview Exception, which occurs when program not found by id
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ProgramNotFound extends Exception {
    public readonly name: string;

    constructor() {
        super(`Program not found`);

        this.name = 'ProgramNotFoundException';
    }
}

export {ProgramNotFound};