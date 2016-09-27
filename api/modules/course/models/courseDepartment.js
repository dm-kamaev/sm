var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseDepartment = db.define('CourseDepartment', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    phone: Sequelize.STRING
}, {
    underscored: true,
    tableName: 'course_department',
    classMethods: {
        associate: function(models) {
            CourseDepartment.belongsToMany(models.CourseOption, {
                as: 'courseOptions',
                through: 'course_option_course_department',
                foreignKey: 'course_department_id'
            });
            CourseDepartment.hasOne(models.Address, {
                as: 'address',
                foreignKey: 'entity_id'
            });
        }
    }
});

module.exports = CourseDepartment;
