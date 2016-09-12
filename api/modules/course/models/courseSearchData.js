var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseSearchData = db.define('CourseSearchData', {
    courseId: {
        type: Sequelize.INTEGER,
        field: 'course_id'
    },
    values: Sequelize.ARRAY(Sequelize.INTEGER),
    type: Sequelize.STRING
}, {
    underscored: true,
    tableName: 'course_search_data',
    classMethods: {
        associate: function(models) {
            CourseSearchData.belongsTo(models.Course, {
                as: 'course',
                foreignKey: 'course_id'
            });
        }
    }
});

module.exports = CourseSearchData;
