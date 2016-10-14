var Sequelize = require('sequelize');

var db = require('../../../../app/components/db');

var CourseDepartment = db.define('CourseDepartment', {
    brandId: {
        type: Sequelize.INTEGER,
        field: 'brand_id',
        references: {
            model: 'brand',
            key: 'id'
        },
        onDelete: 'cascade'
    },
    addressId: {
        type: Sequelize.INTEGER,
        field: 'address_id',
        references: {
            model: 'address',
            key: 'id'
        }
    },
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
            CourseDepartment.belongsTo(models.Address, {
                as: 'address',
                foreignKey: 'address_id'
            });
        }
    }
});

module.exports = CourseDepartment;
