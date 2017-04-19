import * as Sequelize from 'sequelize/v3';
import {DepartmentAttribute} from './department';
import {AreaInstance} from '../models/area';

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
    area?: AreaInstance;

    getDepartments: Sequelize.HasManyGetAssociationsMixin<DepartmentAttribute>;
}
