'use strict';

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

var service = {
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

module.exports = service;
