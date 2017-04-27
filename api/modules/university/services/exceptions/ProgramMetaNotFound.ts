import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class ProgramMetaNotFound extends Exception {
    public readonly name: string;

    constructor(programId: number) {
        super(`Program meta with program id = ${programId} not found`);

        this.name = 'ProgramMetaNotFoundException';
    }
}
