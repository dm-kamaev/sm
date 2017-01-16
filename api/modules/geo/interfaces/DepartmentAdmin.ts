import {DepartmentInstance} from '../models/department';

export interface DepartmentAdmin extends DepartmentInstance {
    addressName?: string;
}
