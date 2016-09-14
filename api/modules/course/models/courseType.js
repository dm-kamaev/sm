var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseType = db.define('CourseType', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    popularity: Sequelize.INTEGER
}, {
    underscored: true,
    tableName: 'course_type'
});

module.exports = CourseType;
