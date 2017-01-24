import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class DepartmentNotFound extends Exception {
    public readonly name: string;

    constructor(departmentId: number) {
        super(`Department with id = ${departmentId} not found`);

        this.name = 'DepartmentNotFoundException';
    }
}
