var DataType = require('sequelize'),
    db = require('../../../../app/components/db'),
    enums = require('../enums');

var Department = db.define('Department', {
    name: DataType.STRING,
    stage: {
        type: DataType.ENUM,
        values: enums.departmentStage.toArray(),
        allowNull: false
    },
    addressId: {
        type: DataType.INTEGER,
        field: 'address_id'
    }
}, {
    underscored: true,
    tableName: 'department',

    classMethods: {
        associate: function (models) {
            Department.belongsTo(models.Address, {
                foreignKey: 'address_id'
            });
        }
    }
});

module.exports = Department;
