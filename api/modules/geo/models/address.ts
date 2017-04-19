const DataType = require('sequelize');

const db = require('../../../../app/components/db'),
    entityTypes = require('../../entity/enums/entityType');

import * as Sequelize from 'sequelize/v3';

import {AddressInstance, AddressAttribute} from '../types/address';

interface AddressModel
    extends Sequelize.Model<AddressInstance, AddressAttribute> {}

const Model: AddressModel = db.define('Address', {
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
            this.belongsToMany(models.Program, {
                as: 'programs',
                through: 'program_address'
            });
        }
    }
});

export {Model};
