'use strict';

const DataType = require('sequelize');
const db = require('../../../../app/components/db');

const Department = db.define('Department', {
    name: DataType.STRING,
    oldName: {
        type: DataType.STRING,
        field: 'old_name'
    },
    addressId: {
        type: DataType.INTEGER,
        field: 'address_id'
    },
    educationalGrades: {
        type: DataType.ARRAY(DataType.INTEGER),
        field: 'educational_grades'
    }
}, {
    underscored: true,
    tableName: 'department',

    classMethods: {
        associate: function(models) {
            Department.belongsTo(models.Address, {
                foreignKey: 'address_id'
            });
        }
    }
});

module.exports = Department;
