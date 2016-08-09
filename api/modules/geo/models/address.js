var DataType = require('sequelize');

var db = require('../../../../app/components/db'),
    entityTypes = require('../../entity/enums/entityType');

var Address = db.define('Address', {
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
            Address.belongsTo(models.School, {
                foreignKey: 'entity_id'
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
            Address.hasMany(models.AddressSearchData, {
                as: 'searchData',
                foreignKey: 'address_id',
                onDelete: 'cascade'
            });
        }
    }
});

module.exports = Address;
