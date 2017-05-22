const DataType = require('sequelize');
import * as Sequelize from 'sequelize/v3';

const sequelize = require('../../../../app/components/db');

import {
    UniversitySearchDataAttribute,
    UniversitySearchDataInstance
} from '../types/universitySearchData';

interface UniversitySearchDataModel extends
    Sequelize.Model<
    UniversitySearchDataInstance, UniversitySearchDataAttribute
    > {}

const UniversitySearchData: UniversitySearchDataModel = sequelize.define(
    'UniversitySearchData', {
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
    }
);

export {UniversitySearchData as Model};
