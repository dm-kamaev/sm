import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export default class SchoolNotFound extends Exception {
    readonly name: string;

    constructor(schoolId: number) {
        super(`School with id = ${schoolId} not found`);

        this.name = 'SchoolNotFoundException';
    }
}
