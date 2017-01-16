import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export default class DepartmentNotFound extends Exception {
    readonly name: string;

    constructor(departmentId: number) {
        super(`Department with id = ${departmentId} not found`);

        this.name = 'DepartmentNotFoundException';
    }
}
