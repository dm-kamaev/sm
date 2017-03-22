/**
 * @fileOverview Page meta information like meta description, tab title,
 * sharing tags and other
 */

const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

import {
    PageMetaInformationAttributes,
    PageMetaInformationInstance
} from '../types/pageMetaInterfaces';

interface PageMetaInformationModel
    extends Sequelize.Model<PageMetaInformationInstance,
        PageMetaInformationAttributes> {}

const Model: PageMetaInformationModel = db.define('PageMetaInformation', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    tabTitle: {
        type: DataType.STRING,
        field: 'tab_title'
    },
    seoDescription: {
        type: DataType.TEXT,
        field: 'seo_description'
    },
    openGraphTitle: {
        type: DataType.STRING,
        field: 'open_graph_title'
    },
    openGraphDescription: {
        type: DataType.TEXT,
        field: 'open_graph_description'
    },
    relapTag: {
        type: DataType.STRING,
        field: 'relap_tag'
    },
    shareImageUrl: {
        type: DataType.STRING,
        field: 'share_image_url'
    }
}, {
    underscored: true,
    tableName: 'page_meta_information'
}, {
    classMethods: {
        associate: function(models) {
            this.belongsToMany(models.Course, {
                as: 'courses',
                through: 'course_page_meta_information',
                foreignKey: 'page_meta_information_id'
            });
            this.belongsToMany(models.Program, {
                as: 'programs',
                through: 'program_page_meta_information',
                foreignKey: 'page_meta_information_id',
            });
        }
    }
});

export {Model};
