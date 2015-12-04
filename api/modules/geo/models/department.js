var DataType = require('sequelize'),
    db = require.main.require('./app/components/db');

var Department = db.define('Department', {
    name: DataType.STRING,
    stage: {
        type: DataType.ENUM,
        values: ['Дошкольное', 'Начальное', 'Основное и среднее', 'Дополнительное', 'Профессиональное'],
        allowNull: false
    }
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
