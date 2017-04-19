import * as Sequelize from 'sequelize/v3';
export interface DepartmentAttribute {
    id?: number;
    name?: string;
    addressId?: number;
    educationalGrades?: Array<number>;
    updatedAt?: Date;
}

export interface DepartmentInstance
    extends Sequelize.Instance<DepartmentAttribute>, DepartmentAttribute {}

export interface DepartmentAdmin extends DepartmentInstance {
    addressName?: string;
}
