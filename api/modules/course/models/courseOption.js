var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseOption = db.define('CourseOption', {
    courseId: {
        type: Sequelize.INTEGER,
        field: 'course_id'
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    totalCost: {
        type: Sequelize.INTEGER,
        field: 'total_cost'
    },
    costPerHour: {
        type: Sequelize.INTEGER,
        field: 'cost_per_hour'
    },
    online: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    age: Sequelize.ARRAY(Sequelize.FLOAT),
    maxGroupSize: {
        type: Sequelize.INTEGER,
        field: 'max_group_size'
    },
    currentGroupSize: {
        type: Sequelize.INTEGER,
        field: 'current_group_size'
    },
    nativeSpeaker: {
        type: Sequelize.BOOLEAN,
        field: 'native_speaker'
    },
    startDate: {
        type: Sequelize.DATEONLY,
        field: 'start_date'
    },
    duration: Sequelize.FLOAT,
    lengthWeeks: {
        type: Sequelize.INTEGER,
        field: 'length_weeks'
    }
}, {
    underscored: true,
    tableName: 'course_option',
    classMethods: {
        associate: function(models) {
            CourseOption.belongsTo(models.Course, {
                foreignKey: 'course_id'
            });
            CourseOption.hasMany(models.CourseSchedule, {
                as: 'schedule',
                foreignKey: 'course_option_id'
            });
            CourseOption.belongsToMany(models.CourseDepartment, {
                as: 'departments',
                through: 'course_option_course_department',
                foreignKey: 'course_option_id'
            });
        }
    }
});

module.exports = CourseOption;
