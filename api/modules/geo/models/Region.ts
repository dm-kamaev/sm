const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

export interface RegionAttribute {
    id?: number;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RegionInstance
    extends Sequelize.Instance<RegionAttribute>, RegionAttribute {}

interface RegionModel
    extends Sequelize.Model<RegionInstance, RegionAttribute> {}


const Region: RegionModel = db.define('Region', {
   id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      name: {
          unique: true,
          allowNull: false,
          type: DataType.STRING,
      },
      createdAt: {
          field: 'created_at',
          type: DataType.DATE
      },
      updatedAt: {
          field: 'updated_at',
          type: DataType.DATE
      }
}, {
    underscored: true,
    tableName: 'region',

    classMethods: {
        associate: function(models) {
            this.hasMany(models.City, {
                as: 'cities',
                foreignKey: 'region_id'
            });
        }
    }
});

export {Region as Model};
