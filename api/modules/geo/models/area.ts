const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

export interface AreaAttribute {
    id: number;
    name: string;
    districtId: number;
    cityId: number;
    centerCoords: Array<number>;
}

export interface AreaInstance
    extends Sequelize.Instance<AreaAttribute>, AreaAttribute {}

interface AreaModel
    extends Sequelize.Model<AreaInstance, AreaAttribute> {}


const Area: AreaModel = db.define('Area', {
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
        associate: function(models) {
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

export {Area as Model};
