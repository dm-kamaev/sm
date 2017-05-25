"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize'), db = require('../../../../app/components/db');
const Region = db.define('Region', {
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
        associate: function (models) {
            this.hasMany(models.City, {
                as: 'cities',
                foreignKey: 'region_id'
            });
        }
    }
});
exports.Model = Region;
