/**
 * @fileOverview Exception, which occurs when program not found by id
 */
import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class ProgramNotFound extends Exception {
    public readonly name: string;

    constructor(programId: number) {
        super(`Program with id = ${programId} not found`);

        this.name = 'ProgramNotFoundException';
    }
}

export {ProgramNotFound};
