const DataType = require('sequelize');
const db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

import {DepartmentInstance, DepartmentAttribute} from '../types/department';

interface DepartmentModel
    extends Sequelize.Model<DepartmentInstance, DepartmentAttribute> {}

const Model: DepartmentModel = db.define('Department', {
    name: DataType.STRING,
    addressId: {
        type: DataType.INTEGER,
        field: 'address_id'
    },
    educationalGrades: {
        type: DataType.ARRAY(DataType.INTEGER),
        field: 'educational_grades'
    },
    updatedAt: {
        type: DataType.DATE,
        field: 'updated_at'
    }
}, {
    underscored: true,
    tableName: 'department',

    classMethods: {
        associate: function(models) {
            this.belongsTo(models.Address, {
                foreignKey: 'address_id'
            });
        }
    }
});

export {Model};
