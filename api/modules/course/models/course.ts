'use strict';

const DataType = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls'),
    courseService = require('../services/course');

import * as Sequelize from 'sequelize/v3';

import {
    CourseAttributes,
    CourseInstance
} from '../types/courseInterfaces';

interface CourseModel
    extends Sequelize.Model<CourseInstance, CourseAttributes> {}

const Course: CourseModel = db.define('Course', {
    name: DataType.STRING,
    brandId: {
        type: DataType.INTEGER,
        field: 'brand_id'
    },
    type: {
        type: DataType.STRING,
        references: {
            model: 'course_type',
            key: 'id'
        },
        onUpdate: 'cascade'
    },
    description: DataType.STRING,
    fullDescription: {
        type: DataType.TEXT,
        field: 'full_description'
    },
    about: DataType.STRING,
    entranceExam: {
        type: DataType.TEXT,
        field: 'entrance_exam'
    },
    learningOutcome: {
        type: DataType.TEXT,
        field: 'learning_outcome'
    },
    leadType: {
        type: DataType.STRING,
        field: 'lead_type'
    },
    score: DataType.ARRAY(DataType.FLOAT),
    scoreCount: {
        type: DataType.ARRAY(DataType.INTEGER),
        field: 'score_count'
    },
    totalScore: {
        type: DataType.FLOAT,
        field: 'total_score'
    },
    imageUrl: {
        type: DataType.STRING(511),
        field: 'image_url'
    },
    embedId: {
        type: DataType.STRING,
        field: 'embed_id'
    },
    ctr: DataType.DOUBLE
}, {
    underscored: true,
    tableName: 'course',
    hooks: {
        afterCreate: urlService.generateCourseAlias,
        afterUpdate: urlService.replaceCourseAlias,
        afterDestroy: courseService.deleteAlias
    },
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.CourseBrand, {
                as: 'courseBrand',
                foreignKey: 'brand_id'
            });
            this.belongsTo(models.CourseType, {
                as: 'courseType',
                foreignKey: 'type',
                onDelete: 'set null',
                onUpdate: 'cascade'
            });
            this.hasMany(models.CourseOption, {
                as: 'courseOptions',
                foreignKey: 'course_id',
                onDelete: 'cascade'
            });
            this.hasMany(models.Favorite, {
                as: 'favorite',
                foreignKey: 'entity_id',
                onDelete: 'cascade'
            });
            this.belongsToMany(models.PageMetaInformation, {
                as: 'pageMetaInformations',
                through: 'course_page_meta_information',
                foreignKey: 'course_id'
            });
        }
    }
});

export {Course as Model};
