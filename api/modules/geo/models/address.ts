var DataType = require('sequelize');

var db = require('../../../../app/components/db'),
    entityTypes = require('../../entity/enums/entityType');

import * as Sequelize from 'sequelize/v3';
import {DepartmentAttribute} from './department';

interface AddressAttribute {
    id?: number,
    entityId?: number,
    entityType?: string,
    areaId?: number,
    name?: string,
    coords?: Array<number>,
    isSchool?: boolean
}

export interface AddressInstance
    extends Sequelize.Instance<AddressAttribute>, AddressAttribute {
    getDepartments: Sequelize.HasManyGetAssociationsMixin<DepartmentAttribute>;
}

interface AddressModel
    extends Sequelize.Model<AddressInstance, AddressAttribute> {}

let Address: AddressModel = db.define('Address', {
    entityId: {
        type: DataType.INTEGER,
        field: 'entity_id'
    },
    entityType: {
        type: DataType.STRING,
        field: 'entity_type',
        validate: {
            isIn: [entityTypes.toArray()]
        }
    },
    areaId: {
        type: DataType.INTEGER,
        field: 'area_id'
    },
    name: DataType.STRING,
    coords: DataType.ARRAY(DataType.FLOAT),
    isSchool: {
        type: DataType.BOOLEAN,
        field: 'is_school'
    }
}, {
    underscored: true,
    tableName: 'address',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.School, {
                foreignKey: 'entity_id'
            });
            this.belongsToMany(models.Metro, {
                as: 'metroStations',
                through: 'address_metro',
                foreignKey: 'address_id'
            });
            this.hasMany(models.AddressMetro, {
                as: 'addressMetroes',
                foreignKey: 'address_id'
            });
            this.hasMany(models.Department, {
                as: 'departments',
                foreignKey: 'address_id'
            });
            this.belongsTo(models.Area, {
                as: 'area',
                foreignKey: 'area_id'
            });
            this.hasMany(models.CourseDepartment, {
                as: 'courseDepartments',
                foreignKey: 'address_id'
            });
            this.hasMany(models.AddressSearchData, {
                as: 'searchData',
                foreignKey: 'address_id',
                onDelete: 'cascade'
            });
        }
    }
});

export default Address;
