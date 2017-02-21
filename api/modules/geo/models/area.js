"use strict";
const DataType = require('sequelize'), db = require('../../../../app/components/db');
const Area = db.define('Area', {
    name: DataType.STRING,
    districtId: {
        type: DataType.INTEGER,
        field: 'district_id'
    },
    cityId: {
        type: DataType.INTEGER,
        field: 'city_id'
    },
    centerCoords: {
        type: DataType.ARRAY(DataType.FLOAT),
        field: 'center_coords'
    }
}, {
    underscored: true,
    tableName: 'area',
    classMethods: {
        associate: function (models) {
            Area.hasMany(models.Address, {
                as: 'adress',
                foreignKey: 'area_id'
            });
            Area.belongsTo(models.District, {
                as: 'district',
                foreignKey: 'district_id'
            });
            Area.belongsTo(models.City, {
                as: 'city',
                foreignKey: 'city_id'
            });
        }
    }
});
exports.Model = Area;
