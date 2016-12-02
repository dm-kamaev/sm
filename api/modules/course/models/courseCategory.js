'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls'),
    courseCategoryService = require('../services/courseCategory');

const categoryPrice = require('../enums/categoryPrice');

let CourseCategory = db.define('CourseCategory', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    filters: Sequelize.ARRAY(Sequelize.STRING),
    isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active'
    },
    priceType: {
        type: Sequelize.STRING,
        field: 'price_type',
        validate: {
            isIn: [categoryPrice.toArray()]
        }
    }
}, {
    underscored: true,
    tableName: 'course_category',
    hooks: {
        afterCreate: urlService.generateCourseCategoryAlias,
        afterUpdate: urlService.replaceCourseCategoryAlias,
        afterDestroy: courseCategoryService.deleteAlias
    },
    classMethods: {
        associate: function(models) {
            CourseCategory.hasMany(models.CourseType, {
                as: 'types',
                foreignKey: 'category_id'
            });
            CourseCategory.hasOne(models.SeoCourseList, {
                as: 'seoCourseList',
                foreignKey: 'category_id',
                onDelete: 'cascade'
            });
        }
    }
});

module.exports = CourseCategory;
