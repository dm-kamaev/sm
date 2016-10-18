var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseType = db.define('CourseType', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    popularity: Sequelize.INTEGER,
    categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id'
    }
}, {
    underscored: true,
    tableName: 'course_type',
    classMethods: {
        associate: function(models) {
            CourseType.hasMany(models.Course, {
                as: 'courses',
                foreignKey: 'type'
            });
            CourseType.belongsTo(models.CourseCategory, {
                as: 'category',
                foreignKey: 'category_id',
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });
        }
    }
});

module.exports = CourseType;
