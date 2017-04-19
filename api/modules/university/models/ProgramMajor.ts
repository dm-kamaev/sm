const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface ProgramMajorAttribute {
    id?: number;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProgramMajorInstance
    extends Sequelize.Instance<ProgramMajorAttribute>, ProgramMajorAttribute {}

interface ProgramMajorModel
    extends Sequelize.Model<ProgramMajorInstance, ProgramMajorAttribute> {}

const ProgramMajor: ProgramMajorModel = sequelize.define('ProgramMajor', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataType.STRING,
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
    tableName: 'program_major',
    classMethods: {
        associate: function(models) {
            this.hasMany(models.Program, {
                as: 'programs',
                foreignKey: 'program_major_id'
            });
        }
    }
});

export {ProgramMajor as Model};
