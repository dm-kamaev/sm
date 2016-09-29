'use strict';

const Sequelize = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls');

let CourseBrand = db.define('CourseBrand', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    underscored: true,
    tableName: 'course_brand',
    hooks: {
        afterCreate: urlService.generateCourseBrandAlias,
        afterUpdate: urlService.generateCourseBrandAlias
    },
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
