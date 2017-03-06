import * as Sequelize from 'sequelize/v3';
import {DepartmentAttribute} from './department';

export interface AddressAttribute {
    id?: number;
    entityId?: number;
    entityType?: string;
    areaId?: number;
    name?: string;
    coords?: Array<number>;
    isSchool?: boolean;
}

export interface AddressInstance
        extends Sequelize.Instance<AddressAttribute>, AddressAttribute {
    getDepartments: Sequelize.HasManyGetAssociationsMixin<DepartmentAttribute>;
}
