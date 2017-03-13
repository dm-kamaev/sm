const DataType = require('sequelize');
const db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';
import {CityAttribute, CityInstance} from '../types/city';

interface CityModel extends Sequelize.Model<CityInstance, CityAttribute> {}

const City: CityModel = db.define('City', {
    name: {
        unique: 'compositeIndex',
        type: DataType.STRING,
    },
    regionId: {
        unique: 'compositeIndex',
        onUpdate: 'cascade',
        type: DataType.INTEGER,
        field: 'region_id',
        references: {
            model: 'region',
            key: 'id'
        }
    }
}, {
    underscored: true,
    tableName: 'city',
    classMethods: {
        associate: function(models) {
            City.hasMany(models.School, {
                as: 'schools',
                foreignKey: 'city_id'
            });
            City.hasMany(models.CityResult, {
                as: 'cityResult',
                foreignKey: 'city_id'
            });
            this.belongsTo(models.Region, {
                as: 'region',
                foreignKey: 'region_id'
            });
        }
    }
});

export {City as Model};