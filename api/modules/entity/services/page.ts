'use strict';

import * as Sequelize from 'sequelize/v3';
import {PageIntstance, PageAttribute} from '../types/page';
import {Model as PageModel} from '../models/page';

class PageService {
    public readonly name: string = 'page';

     public async create(data, transaction?: {
         transaction: Sequelize.Transaction
     }) {
        transaction = (transaction) ? transaction : null;
        return await PageModel.create(data, transaction);
    }

     public async update(where, data) {
        return await PageModel.update(data, { where });
    }

     public async getAll() {
        return PageModel.findAll();
    }

    public async getOne(entityId: number, entityType: string) {
        return await PageModel.findOne({
            attributes: ['id', 'alias', 'views', 'description'],
            where: {
                entityId: entityId,
                entityType: entityType
            }
        });
    }

    /**
     * Search duplicate page by type and alias and ignore current page
     */
    public async searchDuplicateAlias(data: {
        entityId: number,
        entityType: string,
        alias: string
    }): Promise<PageIntstance> {
        const entityId: number = data.entityId,
        entityType: string = data.entityType,
        alias: string = data.alias;
        return await PageModel.findOne({
            attributes: [
                'id', 'alias', 'entityId', 'entityType', 'views', 'description'
            ],
            where: {
                alias: {
                    $eq: alias
                },
                entityId: {
                    $ne: entityId
                },
                entityType: entityType
            }
        });
    }


    public async getDescription(entityId, entityType) {
        return PageModel.findOne({
            attributes: ['description'],
            where: {
                entityId: entityId,
                entityType: entityType
            }
        });
    }


    public async getAlias(
        entityId: number,
        entityType: string
    ): Promise<PageIntstance> {
        return await PageModel.findOne({
            attributes: ['entityId', 'alias'],
            where: {
                entityId,
                entityType,
            }
        });
    }

    public async getAliases(entityIds, entityType) {
        return PageModel.findAll({
            attributes: ['entityId', 'alias'],
            where: {
                entityId: {
                    $in: entityIds
                },
                entityType: entityType
            }
        });
    }

    public async getAllAliases(entityType) {
        return PageModel.findAll({
            attributes: ['entityId', 'alias'],
            where: {
                entityType: entityType
            }
        });
    }

    public async getByAlias(alias, entityType): Promise<PageIntstance> {
        return PageModel.findOne({
            attributes: ['entityId', 'alias'],
            where: {
                alias: alias,
                entityType: entityType
            }
        });
    }

    public async getPopular(entityType, optAmount?) {
        return PageModel.findAll({
            attributes: ['entityId'],
            where: {
                $not: {
                    views: 0
                },
                entityType: entityType
            },
            limit: optAmount || 10,
            order: [['views', 'DESC']]
        });
    }

    public async incrementViews(entityId, entityType) {
        const entity = await PageModel.findOne({where: {
            entityId: entityId,
            entityType: entityType
        }});
        entity.increment('views');
    }

    public async delete(entityId: number, entityType: string): Promise<void> {
        await PageModel.destroy({
            where: {
                entityId: entityId,
                entityType: entityType
            }
        });
    }
}

export const service = new PageService();
