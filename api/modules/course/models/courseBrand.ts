const DataType = require('sequelize');

const db = require('../../../../app/components/db'),
    urlService = require('../../entity/services/urls'),
    brandService = require('../services/courseBrand');

import * as Sequelize from 'sequelize/v3';

export interface CourseBrandAttribute {
    id?: number;
    name?: string;
    description?: string;
}

export interface CourseBrandInstance
    extends Sequelize.Instance<CourseBrandAttribute>, CourseBrandAttribute {}
export interface CourseBrandModel
    extends Sequelize.Model<CourseBrandInstance, CourseBrandAttribute> {}

const CourseBrand: CourseBrandModel = db.define('CourseBrand', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    description: DataType.TEXT
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
            this.hasMany(models.Course, {
                as: 'courses',
                foreignKey: 'brand_id',
                onDelete: 'cascade',
                hooks: true
            });
        }
    }
});

export default CourseBrand;
