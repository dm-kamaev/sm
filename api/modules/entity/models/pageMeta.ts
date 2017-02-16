/**
 * @fileOverview Page meta information like meta description, tab title,
 * sharing tags and other
 */

const DataType = require('sequelize'),
    db = require('../../../../app/components/db');

import * as Sequelize from 'sequelize/v3';

export interface PageMetaAttributes {
    id: number;
    tabTitle: string;
    seoDescription: string;
    openGraphTitle: string;
    openGraphDescription: string;
    relapTag: string;
    shareImageUrl: string;
}

export interface PageMetaInstance
    extends Sequelize.Instance<PageMetaAttributes>, PageMetaAttributes {}

interface PageMetaModel
    extends Sequelize.Model<PageMetaInstance, PageMetaAttributes> {}

const Model: PageMetaModel = db.define('PageMeta', {
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
        type: DataType.STRING,
        field: 'seo_description'
    },
    openGraphTitle: {
        type: DataType.STRING,
        field: 'open_graph_title'
    },
    openGraphDescription: {
        type: DataType.STRING,
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
});

export {Model};
