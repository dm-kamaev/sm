/**
 * @fileOverview Interfaces for page meta model
 */
import * as Sequelize from 'sequelize/v3';

export interface PageMetaInformationAttributes {
    id?: number;
    tabTitle?: string;
    seoDescription?: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
    relapTag?: string;
    shareImageUrl?: string;
}

export interface PageMetaInformationInstance
    extends Sequelize.Instance<PageMetaInformationAttributes>,
        PageMetaInformationAttributes {}
