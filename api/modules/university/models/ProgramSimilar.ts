const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

import {
    ProgramSimilarAttribute,
    ProgramSimilarInstance
} from '../types/programSimilar';


interface ProgramSimilarModel
    extends Sequelize.Model<ProgramSimilarInstance, ProgramSimilarAttribute> {}

const ProgramSimilar: ProgramSimilarModel = sequelize.define('ProgramSimilar', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mainProgramId: {
        unique: true,
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'main_program_id',
        references: {
            model: 'program',
            key: 'id'
        }
    },
    relatedProgramId: {
        unique: true,
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'related_program_id',
        references: {
            model: 'program',
            key: 'id'
        }
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
    tableName: 'program_similar',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.Program, {
                as: 'relatedProgram',
                foreignKey: 'related_program_id'
            });
        }
    }
});

export {ProgramSimilar as Model};
