'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db');

let CourseApplication = db.define('CourseApplication', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: Sequelize.STRING,
    comment: Sequelize.STRING(300),
    alias: Sequelize.STRING,
    option: Sequelize.JSON
}, {
    underscored: true,
    tableName: 'course_application',
    classMethods: {
        associate: function(models) {}
    }
});

module.exports = CourseApplication;
