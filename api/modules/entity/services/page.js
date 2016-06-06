'use strict';

const async = require('asyncawait/async'),
      await = require('asyncawait/await');

const sequelize = require('../../../../app/components/db'),
      logger = require('../../../../app/components/logger/logger')
          .getLogger('app'),
      models = require('../../../../app/components/models').all;

var service = {
    name: 'page'
};

/**
 * @param {number} entityId
 * @param {string} entityType
 * @return {Promise<Object>}
 */
service.getOne = async(function(entityId, entityType) {
    return models.Page.findOne({
        attributes: ['alias', 'views', 'description'],
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
        attributes: ['entityId', 'views'],
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

module.exports = service;
