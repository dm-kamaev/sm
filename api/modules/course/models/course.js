'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls');

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
    }
}, {
    underscored: true,
    tableName: 'course',
    hooks: {
        afterCreate: urlService.generateCourseAlias,
        afterUpdate: urlService.generateCourseAlias
    },
    classMethods: {
        associate: function(models) {
            Course.belongsTo(models.CourseBrand, {
                as: 'courseBrand',
                foreignKey: 'brand_id'
            });
            Course.hasMany(models.CourseOption, {
                as: 'courseOptions',
                foreignKey: 'course_id'
            });
            Course.hasMany(models.Favorite, {
                as: 'favorite',
                foreignKey: 'entity_id',
                onDelete: 'cascade'
            });
        }
    }
});

module.exports = Course;
