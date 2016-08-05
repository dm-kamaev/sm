var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseOption = db.define('CourseOption', {
    courseId: {
        type: Sequelize.INTEGER,
        field: 'course_id'
    },
    costPerHour: {
        type: Sequelize.INTEGER,
        field: 'cost_per_hour'
    },
    online: Sequelize.BOOLEAN,
    age: Sequelize.ARRAY(Sequelize.FLOAT),
    group: Sequelize.BOOLEAN,
    teacher: Sequelize.STRING
}, {
    underscored: true,
    tableName: 'course_brand',
    classMethods: {
        associate: function(models) {
            CourseOption.belongsTo(models.Course, {
                foreignKey: 'course_id'
            });
        }
    }
});

module.exports = CourseBrand;
