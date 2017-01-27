'use strict';
const DataType = require('sequelize');
const db = require('../../../../app/components/db');
const SpecializedClassType = db.define('SpecializedClassType', {
    id: {
        field: 'id',
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataType.STRING,
    popularity: DataType.INTEGER
}, {
    underscored: true,
    tableName: 'specialized_class_type'
});
exports.Model = SpecializedClassType;
