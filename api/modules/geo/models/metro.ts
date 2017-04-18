const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

export interface MetroAttribute {
    id: number;
    name: string;
    coords: Array<number>;
    cityId: number;
}

export interface MetroInstance
    extends Sequelize.Instance<MetroAttribute>, MetroAttribute {}

interface MetroModel
    extends Sequelize.Model<MetroInstance, MetroAttribute> {}

const Metro: MetroModel = db.define('Metro', {
    name: DataType.STRING,
    coords: DataType.ARRAY(DataType.FLOAT),
    cityId: {
        type: DataType.INTEGER,
        field: 'city_id'
    },
}, {
    underscored: true,
    tableName: 'metro',
    classMethods: {
        associate: function(models) {
            Metro.belongsToMany(models.Address, {
                as: 'addressesNear',
                through: 'address_metro',
                foreignKey: 'metro_id'
            });
            Metro.hasMany(models.AddressMetro, {
                as: 'addressMetroes',
                foreignKey: 'metro_id'
            });
            Metro.belongsTo(models.City, {
                as: 'city',
                foreignKey: 'city_id'
            });
        }
    }
});

export {Metro as Model};
