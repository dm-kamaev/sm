import * as Sequelize from 'sequelize/v3';

export interface PageAttribute {
    entityId: number;
    entityType: string;
    alias: string;
    views?: number;
    description?: string;
}

export interface PageIntstance extends
        Sequelize.Instance<PageAttribute>, PageAttribute {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
