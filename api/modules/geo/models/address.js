var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Address = db.define('Address', {
    name: DataType.STRING,
    coords: DataType.ARRAY(DataType.FLOAT)
}, {
    underscored: true,
    tableName: 'address',
    classMethods: {
        associate: function (models) {
            Address.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            Address.belongsToMany(models.Metro, {
                as: 'metroStations',
                through: 'address_metro',
                foreignKey: 'address_id'
            });
            Address.belongsToMany(models.Department, {
                as: 'departments',
                through: {
                    model: 'Department_address',
                    unique: false
                },
                foreignKey: 'address_id'
            });
            Address.belongsTo(models.Area, {
                as: 'area',
                foreignKey: 'area_id'
            });
        }
    }
});

module.exports = Address;
