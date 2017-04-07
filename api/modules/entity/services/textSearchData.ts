'use strict';

const models = require('../../../../app/components/models').all,
    sequelize = require('../../../../app/components/db');

const SuggestSearchQuery = require('../lib/SuggestSearch');

const MissingSearchString =
    require('../controllers/errors/MissingSearchString');

import {EntitiesSearch} from '../types/textSearchData';

class TextSearchDataService {
    public readonly name: string = 'textSearchData';

    /**
     * @param {Object} data
     * @return {Object}
     */
    public async create(data) {
        return await models.TextSearchData.create(data);
    };



    /**
     * @param {string} type
     * @return {Array<Object>}
     */
    public async getByEntityType(entityType) {
        return await models.TextSearchData.findAll({
            attributes: [
                'id',
                'entityId',
                'entityType',
                'formattedText',
                'originalText',
                'type'
            ],
            where: {
                entityType: entityType
            }
        });
    };

    /**
     * @type {string} searchString
     * @return {Array<TextSearchData>}
     */
    public async search(searchString: string) {
        return await models.TextSearchData.findAll({
            attributes: ['entityId', 'entityType'],
            where: {
                formattedText: {
                    $like: '%' + searchString + '%'
                }
            }
        });
    }



    /**
     * @param  {string}        searchString
     * @param  {Array<string>} entities
     * @return {Object}
     */
    public async entitiesSearch(
        searchString: string,
        entities: string[]
    ): Promise<EntitiesSearch> {
        if (!searchString && typeof searchString !== 'string') {
            throw new MissingSearchString();
        }
        const query: string = new SuggestSearchQuery(entities)
            .setSearchString(searchString)
            .getQuery(),
            foundData = await sequelize.query(
                query,
                {type: sequelize.QueryTypes.SELECT}
            ),
            resultIds: EntitiesSearch = this.joinSuggestData(foundData);

        return resultIds;
    }


    /**
     * @param {Array<Object>} data
     * @return {Object}  { program: [ 12, ] }
     */
    private joinSuggestData(data) {
        const result = {};

        data.forEach(item => {
            result.hasOwnProperty(item.entityType) ?
                result[item.entityType].push(item.entityId) :
                result[item.entityType] = [item.entityId];
        });

        return result;
    };


};

export const service = new TextSearchDataService();

