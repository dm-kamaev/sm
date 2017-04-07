import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class ProgramNameIsShorterException extends Exception {
    public readonly name: string;

    constructor(programName?: string, mustLength?: number) {
        programName = programName || '';
        mustLength = mustLength || 2;
        const message: string = `
            The length of program name for
            search should be greater than or equal to "${mustLength}",\n
            but now length is "${programName.length}"
        `;
        super(message);
        this.name = 'ProgramNameIsShorterException';
    }
}
