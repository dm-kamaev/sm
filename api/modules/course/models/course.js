'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls'),
    courseService = require('../services/course');

let Course = db.define('Course', {
    name: Sequelize.STRING,
    brandId: {
        type: Sequelize.INTEGER,
        field: 'brand_id'
    },
    type: {
        type: Sequelize.STRING,
        references: {
            model: 'course_type',
            key: 'id'
        },
        onUpdate: 'cascade'
    },
    description: Sequelize.STRING,
    fullDescription: {
        type: Sequelize.TEXT,
        field: 'full_description'
    },
    about: Sequelize.STRING,
    entranceExam: {
        type: Sequelize.TEXT,
        field: 'entrance_exam'
    },
    learningOutcome: {
        type: Sequelize.TEXT,
        field: 'learning_outcome'
    },
    leadType: {
        type: Sequelize.STRING,
        field: 'lead_type'
    },
    score: Sequelize.ARRAY(Sequelize.FLOAT),
    scoreCount: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        field: 'score_count'
    },
    totalScore: {
        type: Sequelize.FLOAT,
        field: 'total_score'
    },
    imageUrl: {
        type: Sequelize.STRING(511),
        field: 'image_url'
    },
    embedId: {
        type: Sequelize.STRING,
        field: 'embed_id'
    },
    ctr: Sequelize.DOUBLE
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
            this.belongsToMany(models.PageMeta, {
                as: 'courses',
                through: 'course_page_meta',
                foreignKey: 'course_id'
            });
        }
    }
});

module.exports = Course;
