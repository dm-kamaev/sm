'use strict';

import * as Sequelize from 'sequelize/v3';
const models = require('../../../../app/components/models').all;

class PageService {
    public readonly name: string = 'page';

    /**
     * @param {{
     *    entityId: ?number,
     *    entityType: string,
     *    alias: string,
     *    views: (number|undefined),
     *    description: (string|undefined)
     * }} data
     * { transaction: Object } ?transaction
     * @return {Promise<models.Page>}
     */
     public async create(data, transaction?: {
         transaction: Sequelize.Transaction
     }) {
        transaction = (transaction) ? transaction : null;
        return await models.Page.create(data, transaction);
    }


    /**
     * @param {{
     *    entityId?: ?number,
     *    entityType?: string,
     *    alias?: string,
     *    views?: (number|undefined),
     *    description?: (string|undefined)
     * }} data
     * @return {Promise<models.Page>}
     */
     public async update(where, data) {
        return await models.Page.update(data, { where });
    }

    /**
     * @return {Promise<Array<models.Page>>}
     */
     public async getAll() {
        return models.Page.findAll();
    }


    /**
     * @param {number} entityId
     * @param {string} entityType
     * @return {Promise<Object>}
     */
    public async getOne(entityId: number, entityType: string) {
        return await models.Page.findOne({
            attributes: ['id', 'alias', 'views', 'description'],
            where: {
                entityId: entityId,
                entityType: entityType
            }
        });
    }

    // search duplicate page by type and alias and ignore
    // current page
    public async searchDuplicateAlias(data: {
        entityId: number,
        entityType: string,
        alias: string
    }) {
        const entityId: number = data.entityId,
        entityType: string = data.entityType,
        alias: string = data.alias;
        return await models.Page.findOne({
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


    /**
     * @param {number} entityId
     * @param {string} entityType
     * @return {Promise<Object>}
     */
    public async getDescription(entityId, entityType) {
        return models.Page.findOne({
            attributes: ['description'],
            where: {
                entityId: entityId,
                entityType: entityType
            }
        });
    }

    /**
     * @param {Array<number>} entityIds
     * @param {string} entityType
     * @return {Promise<Array<Object>>}
     */
    public async getAliases(entityIds, entityType) {
        return models.Page.findAll({
            attributes: ['entityId', 'alias'],
            where: {
                entityId: {
                    $in: entityIds
                },
                entityType: entityType
            }
        });
    }

    /**
     * @param {string} entityType
     * @return {Promise<Array<Object>>}
     */
    public async getAllAliases(entityType) {
        return models.Page.findAll({
            attributes: ['entityId', 'alias'],
            where: {
                entityType: entityType
            }
        });
    }

    /**
     * @param {string} alias
     * @param {string} entityType
     * @return {Object}
     */
    public async getByAlias(alias, entityType) {
        return models.Page.findOne({
            attributes: ['entityId', 'alias'],
            where: {
                alias: alias,
                entityType: entityType
            }
        });
    }

    /**
     * @param {string} entityType
     * @param {number=} optAmount?
     * @return {Promise<Array<Object>>}
     */
    public async getPopular(entityType, optAmount?) {
        return models.Page.findAll({
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

    /**
     * @param {number} entityId
     * @param {string} entityType
     */
    public async incrementViews(entityId, entityType) {
        const entity = await models.Page.findOne({where: {
            entityId: entityId,
            entityType: entityType
        }});
        entity.increment('views');
    }

    /**
     * @param  {Object} entity
     * @param  {string} entityType
     * @return {number}
     */
    public async delete(entityId: number, entityType: string): Promise<void> {
        await models.Page.destroy({
            where: {
                entityId: entityId,
                entityType: entityType
            }
        });
    }
};

export const service = new PageService();
