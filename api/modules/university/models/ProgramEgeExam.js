"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const ProgramEgeExam = sequelize.define('ProgramEgeExam', {
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
        associate: function (models) {
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
exports.Model = ProgramEgeExam;
