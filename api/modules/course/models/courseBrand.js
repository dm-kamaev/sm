'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls'),
    brandService = require('../services/courseBrand');

let CourseBrand = db.define('CourseBrand', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: Sequelize.TEXT
}, {
    underscored: true,
    tableName: 'course_brand',
    hooks: {
        afterCreate: urlService.generateCourseBrandAlias,
        afterUpdate: urlService.generateCourseBrandAlias,
        afterDestroy: brandService.deleteAlias
    },
    classMethods: {
        associate: function(models) {
            CourseBrand.hasMany(models.Course, {
                as: 'courses',
                foreignKey: 'brand_id',
                onDelete: 'cascade',
                hooks: true
            });
        }
    }
});

module.exports = CourseBrand;
