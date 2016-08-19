var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseSchedule = db.define('CourseSchedule', {
    courseOptionId: {
        type: Sequelize.INTEGER,
        field: 'course_option_id'
    },
    startTime: {
        type: Sequelize.TIME,
        field: 'start_time'
    },
    endTime: {
        type: Sequelize.TIME,
        field: 'end_time'
    },
    day: Sequelize.INTEGER
}, {
    underscored: true,
    tableName: 'course_schedule',
    classMethods: {
        associate: function(models) {
            CourseSchedule.belongsTo(models.CourseOption, {
                foreignKey: 'course_option_id'
            });
        }
    }
});

module.exports = CourseSchedule;
