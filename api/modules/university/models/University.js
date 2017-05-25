"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');
const universityPage_1 = require("../services/universityPage");
const University = sequelize.define('University', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    abbreviation: DataType.STRING,
    description: DataType.TEXT,
    imageUrl: {
        type: DataType.STRING(511),
        field: 'image_url'
    },
    relapImageUrl: {
        type: DataType.STRING(511),
        field: 'relap_image_url'
    },
    links: DataType.ARRAY(DataType.STRING),
    militaryDepartment: {
        type: DataType.BOOLEAN,
        field: 'military_department'
    },
    dormitory: DataType.BOOLEAN,
    cityId: {
        type: DataType.INTEGER,
        field: 'city_id',
        references: {
            model: 'city',
            key: 'id'
        }
    },
    totalScore: {
        field: 'total_score',
        type: DataType.INTEGER
    },
    score: DataType.ARRAY(DataType.INTEGER),
    scoreCount: {
        field: 'score_count',
        type: DataType.ARRAY(DataType.INTEGER)
    },
    reviewCount: {
        field: 'review_count',
        type: DataType.ARRAY(DataType.INTEGER)
    }
}, {
    underscored: true,
    tableName: 'university',
    hooks: {
        afterCreate: universityPage_1.service.createPage.bind(universityPage_1.service),
        afterUpdate: universityPage_1.service.updatePage.bind(universityPage_1.service),
        afterDestroy: universityPage_1.service.removePage
    },
    classMethods: {
        associate: function (models) {
            this.belongsTo(models.City, {
                foreignKey: 'cityId',
                as: 'city'
            });
            this.belongsToMany(models.Profile, {
                as: 'profiles',
                through: 'university_profile',
                foreignKey: 'university_id',
            });
            this.belongsToMany(models.Page, {
                as: 'page',
                through: 'university_page',
                foreignKey: 'university_id',
            });
            this.hasMany(models.Program, {
                as: 'programs',
                foreignKey: 'university_id'
            });
        }
    }
});
exports.Model = University;
