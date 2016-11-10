'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db');

let CourseAnalytics = db.define('CourseAnalytics', {
    courseId: {
        type: Sequelize.INTEGER,
        field: 'course_id'
    },
    ctr: Sequelize.DOUBLE,
    clicks: Sequelize.INTEGER,
    views: Sequelize.INTEGER
}, {
    underscored: true,
    tableName: 'course_analytics',
    classMethods: {
        associate: function(models) {
            CourseAnalytics.belongsTo(models.Course, {
                as: 'courseAnalytics',
                foreignKey: 'course_id',
                onDelete: 'cascade'
            });
        }
    }
});

module.exports = CourseAnalytics;
