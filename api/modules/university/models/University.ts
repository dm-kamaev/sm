const DataType = require('sequelize');
const sequelize = require('../../../../app/components/db');

import {service as universityPageService} from '../services/universityPage';
import * as Sequelize from 'sequelize/v3';

export interface UniversityAttribute {
    id?: number;
    name?: string;
    abbreviation?: string;
    description?: string;
    imageUrl?: string;
    relapImageUrl?: string;
    links?: Array<string>;
    militaryDepartment?: boolean;
    dormitory?: boolean;
    cityId?: number;
    profileIds?: Array<number>;
}

export interface UniversityInstance
    extends Sequelize.Instance<UniversityAttribute>, UniversityAttribute {}

interface UniversityModel
    extends Sequelize.Model<UniversityInstance, UniversityAttribute> {}

const University: UniversityModel = sequelize.define('University', {
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
        afterCreate: universityPageService.createPage.bind(
            universityPageService
        ),
        afterUpdate: universityPageService.updatePage.bind(
            universityPageService
        ),
        afterDestroy: universityPageService.removePage
    },
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.City, {
                foreignKey: 'city_id',
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
        }
    }
});

export {University as Model};
