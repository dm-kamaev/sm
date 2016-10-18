'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls'),
    courseCategoryService = require('../services/corseCategory');

let CourseCategory = db.define('CourseCategory', {
    name: Sequelize.STRING,
    filters: Sequelize.ARRAY(Sequelize.STRING),
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active'
    }
}, {
    underscored: true,
    tableName: 'course_category',
    hooks: {
        afterCreate: urlService.generateCourseCategoryAlias,
        afterUpdate: urlService.generateCourseCategoryAlias,
        afterDestroy: courseCategoryService.deleteAlias
    },
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
