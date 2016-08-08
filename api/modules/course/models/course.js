var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var Course = db.define('Course', {
    name: Sequelize.STRING,
    brandId: {
        type: Sequelize.INTEGER,
        field: 'brand_id'
    },
    description: Sequelize.STRING,
    score: Sequelize.ARRAY(Sequelize.FLOAT),
    scoreCount: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        field: 'score_count'
    },
    totalScore: {
        type: Sequelize.FLOAT,
        field: 'total_score'
    }
}, {
    underscored: true,
    tableName: 'course',
    classMethods: {
        associate: function(models) {
            Course.hasMany(models.CourseOption, {
                as: 'courseOptions',
                foreignKey: 'course_id'
            });
        }
    }
});

module.exports = Course;
