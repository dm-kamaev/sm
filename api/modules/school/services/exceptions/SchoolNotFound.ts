import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class SchoolNotFound extends Exception {
    public readonly name: string;

    constructor(schoolId: number) {
        super(`School with id = ${schoolId} not found`);

        this.name = 'SchoolNotFoundException';
    }
}
