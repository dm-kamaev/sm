"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const programPage_1 = require("../services/programPage");
const Program = sequelize.define('Program', {
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
    description: DataType.TEXT,
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
    links: DataType.ARRAY(DataType.STRING),
    specializations: DataType.ARRAY(DataType.STRING),
    duration: DataType.INTEGER,
    employment: DataType.FLOAT,
    salary: DataType.INTEGER,
    extraExam: {
        type: DataType.ARRAY(DataType.STRING),
        field: 'extra_exam'
    },
    exchangeProgram: {
        type: DataType.STRING,
        field: 'exchange_program'
    },
    programMajorId: {
        allowNull: false,
        onUpdate: 'cascade',
        type: DataType.INTEGER,
        field: 'program_major_id',
        references: {
            model: 'program_major',
            key: 'id'
        }
    },
    phone: DataType.STRING,
    oksoCode: {
        type: DataType.STRING,
        field: 'okso_code',
    },
    totalScore: {
        field: 'total_score',
        type: DataType.INTEGER
    },
    score: DataType.ARRAY(DataType.INTEGER),
    scoreCount: {
        field: 'score_count',
        type: DataType.ARRAY(DataType.INTEGER)
    },
    reviewCount: {
        field: 'review_count',
        type: DataType.ARRAY(DataType.INTEGER)
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
    tableName: 'program',
    hooks: {
        afterCreate: programPage_1.service.createPage.bind(programPage_1.service),
        afterUpdate: programPage_1.service.updatePage.bind(programPage_1.service),
        afterDestroy: programPage_1.service.deletePage
    },
    classMethods: {
        associate: function (models) {
            this.belongsTo(models.University, {
                foreignKey: 'university_id',
                as: 'university'
            });
            this.belongsTo(models.CommentGroup, {
                foreignKey: 'comment_group_id',
                as: 'commentGroup'
            });
            this.belongsToMany(models.Page, {
                as: 'pages',
                through: 'program_page',
                foreignKey: 'program_id',
            });
            this.hasMany(models.ProgramEgeExam, {
                as: 'programEgeExams',
                foreignKey: 'program_id'
            });
            this.belongsToMany(models.Address, {
                as: 'addresses',
                through: 'program_address'
            });
            this.hasMany(models.EntranceStatistic, {
                as: 'entranceStatistics',
                foreignKey: 'program_id',
            });
            this.belongsTo(models.ProgramMajor, {
                foreignKey: 'program_major_id',
                as: 'programMajor'
            });
            this.hasOne(models.ProgramPageMetaInformation, {
                as: 'programPageMetaInformations',
                foreignKey: 'program_id',
            });
            this.belongsToMany(models.PageMetaInformation, {
                as: 'pageMetaInformations',
                through: 'program_page_meta_information',
                foreignKey: 'program_id',
            });
        }
    }
});
exports.Model = Program;
