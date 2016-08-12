var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseDepartment = db.define('CourseDepartment', {
    description: Sequelize.STRING
}, {
    underscored: true,
    tableName: 'course_department',
    classMethods: {
        associate: function(models) {
            CourseDepartment.belongsToMany(models.CourseOption, {
                through: 'course_option_course_department'
            });
            CourseDepartment.hasOne(models.Address, {
                as: 'address',
                foreignKey: 'entity_id'
            });
        }
    }
});

module.exports = CourseDepartment;
