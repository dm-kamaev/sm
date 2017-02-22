const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface ProgramEgeExamAttribute {
    id: number;
    subjectId: number;
    programId: number;
    isMain: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProgramEgeExamInstance
    extends Sequelize.Instance<ProgramEgeExamAttribute>, ProgramEgeExamAttribute {}

interface ProgramEgeExamModel
    extends Sequelize.Model<ProgramEgeExamInstance, ProgramEgeExamAttribute> {}

const ProgramEgeExam: ProgramEgeExamModel = sequelize.define('ProgramEgeExam', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    subjectId: {
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'subject_id',
        references: {
            model: 'subject',
            key: 'id'
        }
    },
    programId: {
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'program_id',
        references: {
            model: 'program',
            key: 'id'
        }
    },
    isMain: {
        type: DataType.INTEGER,
        field: 'is_main',
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
    tableName: 'program_ege_exam',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.Program, {
                as: 'program',
                foreignKey: 'program_id',
            });
            this.belongsTo(models.Subject, {
                as: 'subject',
                foreignKey: 'subject_id',
            });
        }
    }
});

export {ProgramEgeExam as Model};
