'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    sequelize = require('../../../../app/components/db');

const SuggestSearchQuery = require('../lib/SuggestSearch');

const service = {
    name: 'textSearchData'
};

/**
 * @param {Object} data
 * @return {Object}
 */
service.create = async(function(data) {
    return await(models.TextSearchData.create(data));
});

/**
 * @param {string} type
 * @return {Array<Object>}
 */
service.getByEntityType = async(function(entityType) {
    return await(models.TextSearchData.findAll({
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
    }));
});

/**
 * @type {string} searchString
 * @return {Array<TextSearchData>}
 */
service.search = async(function(searchString) {
    return await(models.TextSearchData.findAll({
        attributes: ['entityId', 'entityType'],
        where: {
            formattedText: {
                $like: '%' + searchString + '%'
            }
        }
    }));
});



/**
 * @public
 * @param {string} searchString,
 * @param {Array<string>} entities
 * @return {Object}
 */
service.entitiesSearch = async(function(searchString, entities) {
    var queryString = new SuggestSearchQuery(entities)
        .setSearchString(searchString)
        .getQuery(),
        foundData = await(sequelize.query(
            queryString,
            {type: sequelize.QueryTypes.SELECT}
        )),
        resultIds = joinSuggestData(foundData);

    return resultIds;
});

/**
 * @param {Array<Object>} data
 * @return {Object}
 */
var joinSuggestData = function(data) {
    var result = {};

    data.forEach(item => {
        result.hasOwnProperty(item.entityType) ?
            result[item.entityType].push(item.entityId) :
            result[item.entityType] = [item.entityId];
    });

    return result;
};

module.exports = service;
