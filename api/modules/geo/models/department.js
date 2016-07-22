var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Department = db.define('Department', {
    name: DataType.STRING,
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
