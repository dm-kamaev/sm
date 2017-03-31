const DataType = require('sequelize');
import * as Sequelize from 'sequelize/v3';

const sequelize = require('../../../../app/components/db');

import {
    ProgramSearchDataAttribute,
    ProgramSearchDataInstance
} from '../types/programSearchData';

interface ProgramSearchDataModel extends
    Sequelize.Model<ProgramSearchDataInstance, ProgramSearchDataAttribute> {}

const ProgramSearchData: ProgramSearchDataModel = sequelize.define(
    'ProgramSearchData', {
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
        tableName: 'program_search_data',
        classMethods: {}
    }
);

export {ProgramSearchData as Model};
