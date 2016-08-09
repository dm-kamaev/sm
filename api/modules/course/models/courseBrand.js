var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseBrand = db.define('CourseBrand', {
    name: Sequelize.STRING
}, {
    underscored: true,
    tableName: 'course_brand',
    classMethods: {
        associate: function(models) {
            CourseBrand.hasMany(models.Course, {
                as: 'courses',
                foreignKey: 'brand_id'
            });
        }
    }
});

module.exports = CourseBrand;
