const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

interface ProgramAttribute {
    id: number;
    name: string;
    universityId: number;
    description: string;
    commentGroupId: number;
    category: string;
    links: Array<string>;
    specializations: Array<string>;
    duration: number;
    employment: number;
    salary: number;
    extraExam: Array<string>;
    discount: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProgramInstance
    extends Sequelize.Instance<ProgramAttribute>, ProgramAttribute {}

interface ProgramModel
    extends Sequelize.Model<ProgramInstance, ProgramAttribute> {}

const Program: ProgramModel = sequelize.define('Program', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    universityId: {
        allowNull: false,
        onDelete: 'cascade',
        type: DataType.INTEGER,
        field: 'university_id',
        references: {
            model: 'university',
            key: 'id'
        }
    },
    description: DataType.STRING,
    commentGroupId: {
        allowNull: false,
        onUpdate: 'cascade',
        type: DataType.INTEGER,
        field: 'comment_group_id',
        references: {
            model: 'comment_group',
            key: 'id'
        }
    },
    category: DataType.STRING,
    links: DataType.ARRAY(DataType.STRING),
    specializations: DataType.ARRAY(DataType.STRING),
    duration: DataType.INTEGER,
    employment: DataType.FLOAT,
    salary: DataType.INTEGER,
    extraExam: {
        type: DataType.ARRAY(DataType.STRING),
        field: 'extra_exam'
    },
    discount: DataType.BOOLEAN,
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
    tableName: 'program',
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.University, {
                foreignKey: 'university_id',
                as: 'university'
            });
            this.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id',
                as: 'commentGroup'
            });
            this.belongsToMany(models.Page, {
                as: 'page',
                through: 'program_page',
                foreignKey: 'program_id',
            });
            this.hasMany(models.ProgramEgeExam, {
                as: 'programEgeExams',
                foreignKey: 'program_id'
            });
        }
    }
});

export {Program as Model};
