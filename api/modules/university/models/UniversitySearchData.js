"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const UniversitySearchData = sequelize.define('UniversitySearchData', {
    id: {
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    programId: {
        type: DataType.INTEGER,
        field: 'program_id',
        references: {
            model: 'program',
            key: 'id'
        },
        onDelete: 'cascade'
    },
    values: DataType.ARRAY(DataType.INTEGER),
    type: DataType.STRING,
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
    tableName: 'university_search_data',
    classMethods: {}
});
exports.Model = UniversitySearchData;
