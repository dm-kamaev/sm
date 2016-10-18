var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseCategory = db.define('CourseCategory', {
    name: Sequelize.STRING,
    filters: Sequelize.ARRAY(Sequelize.STRING),
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active'
    }
}, {
    underscored: true,
    tableName: 'course_category',
    classMethods: {
        associate: function(models) {
            CourseCategory.hasMany(models.CourseType, {
                as: 'types',
                foreignKey: 'category_id'
            });
        }
    }
});

module.exports = CourseCategory;
