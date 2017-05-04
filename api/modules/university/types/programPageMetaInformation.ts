import * as Sequelize from 'sequelize/v3';

export interface ProgramPageMetaInformationAttribute {
    id?: number;
    programId?: number;
    keywords?: string;
    tabTitle?: string;
    seoDescription?: string;
    openGraphDescription?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface ProgramPageMetaInformationInstance
    extends Sequelize.Instance<ProgramPageMetaInformationAttribute>,
            ProgramPageMetaInformationAttribute {};


export interface ProgramMetaAdmin extends ProgramPageMetaInformationAttribute {
    url?: string;
};