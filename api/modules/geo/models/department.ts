const DataType = require('sequelize');
const db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface DepartmentAttribute {
    id?: number,
    name?: string,
    addressId?: number,
    educationalGrades?: Array<number>,
    updatedAt?: Date
}

export interface DepartmentInstance
    extends Sequelize.Instance<DepartmentAttribute>, DepartmentAttribute {}

interface DepartmentModel
    extends Sequelize.Model<DepartmentInstance, DepartmentAttribute> {}

let Department: DepartmentModel = db.define('Department', {
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

export default Department;
