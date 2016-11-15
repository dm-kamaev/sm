'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

const factoryNameEnum = require('../enums/factoryName');

var service = {
    name: 'page'
};

/**
 * @param {{
 *    entityId: ?number,
 *    entityType: string,
 *    alias: string,
 *    views: (number|undefined),
 *    description: (string|undefined)
 * }} data
 * @return {Promise<models.Page>}
 */
service.create = async(function(data) {
    return models.Page.create(data);
});

/**
 * @return {Promise<Array<models.Page>>}
 */
service.getAll = async(function() {
    return models.Page.findAll();
});

/**
 * @param {number} entityId
 * @param {string} entityType
 * @return {Promise<Object>}
 */
service.getOne = async(function(entityId, entityType) {
    return models.Page.findOne({
        attributes: ['id', 'alias', 'views', 'description'],
        where: {
            entityId: entityId,
            entityType: entityType
        }
    });
});

/**
 * @param {number} entityId
 * @param {string} entityType
 * @return {Promise<Object>}
 */
service.getDescription = async(function(entityId, entityType) {
    return models.Page.findOne({
        attributes: ['description'],
        where: {
            entityId: entityId,
            entityType: entityType
        }
    });
});

/**
 * @param {Array<number>} entityIds
 * @param {string} entityType
 * @return {Promise<Array<Object>>}
 */
service.getAliases = async(function(entityIds, entityType) {
    return models.Page.findAll({
        attributes: ['entityId', 'alias'],
        where: {
            entityId: {
                $in: entityIds
            },
            entityType: entityType
        }
    });
});

/**
 * @param {string} entityType
 * @return {Promise<Array<Object>>}
 */
service.getAllAliases = async(function(entityType) {
    return models.Page.findAll({
        attributes: ['entityId', 'alias'],
        where: {
            entityType: entityType
        }
    });
});

/**
 * @param {string} alias
 * @param {string} entityType
 * @return {Object}
 */
service.getByAlias = async(function(alias, entityType) {
    return models.Page.findOne({
        attributes: ['entityId', 'alias'],
        where: {
            alias: alias,
            entityType: entityType
        }
    });
});

/**
 * @param {string} entityType
 * @param {number=} opt_amount
 * @return {Promise<Array<Object>>}
 */
service.getPopular = async(function(entityType, opt_amount) {
    return models.Page.findAll({
        attributes: ['entityId'],
        where: {
            $not: {
                views: 0
            },
            entityType: entityType
        },
        limit: opt_amount || 10,
        order: [['views', 'DESC']]
    });
});

/**
 * @param {number} entityId
 * @param {string} entityType
 */
service.incrementViews = async(function(entityId, entityType) {
    var entity = await(models.Page.findOne({where: {
        entityId: entityId,
        entityType: entityType
    }}));
    entity.increment('views');
});

/**
 * @param  {Object} entity
 * @param  {string} entityType
 * @return {number}
 */
service.delete = async(function(entityId, entityType) {
    await(models.Page.destroy({
        where: {
            entityId: entityId,
            entityType: entityType
        }
    }));
});

/**
 * Get factory name from query params provided with google analytics experiments
 * @param {{
 *     utm_expId: (string|undefined)
 * }} queryParams
 * @return {string}
 */
service.getFactoryByQuery = function(queryParams) {
    let experimentParams = queryParams.utm_expid;
    let result;

    if (experimentParams) {
        // Params is a string with three parameters: experimentId, experiment
        // key and version divided with '.' delimiter
        let params = experimentParams.split('.');
        // The last element in params is version
        let version = params[params.length - 1];

        result = service.getFactoryByVersion(version);
    } else {
        result = factoryNameEnum.STENDHAL;
    }
    return result;
};

/**
 * Return factory name by version id
 * @param {string} version
 * @return {strict}
 */
service.getFactoryByVersion = function(version) {
    let result;
    if (version == '1') {
        result = factoryNameEnum.EXPERIMENTAL;
    } else {
        result = factoryNameEnum.STENDHAL;
    }
    return result;
};

module.exports = service;
