var DataType = require('sequelize'),
    db = require('../../../../app/components/db');

var Address = db.define('Address', {
    schoolId: {
        type: DataType.INTEGER,
        field: 'school_id'
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
        associate: function (models) {
            Address.belongsTo(models.School, {
                foreignKey: 'school_id'
            });
            Address.belongsToMany(models.Metro, {
                as: 'metroStations',
                through: 'address_metro',
                foreignKey: 'address_id'
            });
            Address.hasMany(models.AddressMetro, {
                as: 'addressMetroes',
                foreignKey: 'address_id'
            });
            Address.hasMany(models.Department, {
                as: 'departments',
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
