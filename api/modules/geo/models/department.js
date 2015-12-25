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
    availability: {
        type: DataType.ARRAY(DataType.BOOLEAN),
        allowNull: false
    },
}, {
    underscored: true,
    tableName: 'department',

    classMethods: {
        associate: function (models) {
            Department.belongsToMany(models.Address, {
                as: 'address',
                through: {
                    model: 'Department_address',
                    unique: false
                },
                foreignKey: 'department_id'
            });
        }
    }
});

module.exports = Department;
