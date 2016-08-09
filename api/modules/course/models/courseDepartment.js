var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseDepartment = db.define('CourseDepartment', {
    courseOptionId: {
        type: Sequelize.INTEGER,
        field: 'course_option_id'
    },
    startTime: {
        type: Sequelize.TIME,
        field: 'start_time'
    },
    day: Sequelize.INTEGER,
    duration: Sequelize.FLOAT
}, {
    underscored: true,
    tableName: 'course_department',
    classMethods: {
        associate: function(models) {
            CourseDepartment.belongsTo(models.CourseOption, {
                foreignKey: 'course_option_id'
            });
            CourseDepartment.belongsToMany(models.CourseOption, {
                through: 'course_option_course_department'
            });
        }
    }
});

module.exports = CourseDepartment;
