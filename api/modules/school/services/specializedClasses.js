/**
 * @fileOverview Services to operate with specialized classes types
 */

'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

var service = {
    name: 'specializedClasses'
};


/**
 * Create one scpecialized class type with given data and return it
 * @param {{
 *     name: (string|undefined),
 *     popularity: (number|undefined)
 * }} data
 * @return {models.SpecializedClassType}
 */
service.createType = async(function(data) {
    return await(models.SpecializedClassType.create(data));
});


/**
 * Return all possible specialized class types
 * @return {Array<models.SpecializedClassType>}
 */
service.getAllTypes = async(function() {
    return await(models.SpecializedClassType.findAll({
        attributes: ['id', 'name']
    }));
});


/**
 * @param {Array<number>} typeIds
 * @return {Array<models.SpecializedClassType>}
 */
service.getTypesBySearchParams = async(function(typeIds) {
    var result;

    if (typeIds.length) {
        result = this.getById(typeIds);
    } else {
        result = this.getPopularTypes();
    }

    return await(result);
});

/**
 * Return aray of specialized class types,
 * with name containing given name string
 * @param {string} name
 * @return {Array<models.SpecializedClassType>}
 */
service.searchTypeByName = async(function(name) {
    return await(models.SpecializedClassType.findAll({
        where: {
            name: {
                $iLike: '%' + name + '%'
            }
        }
    }));
});


/**
 * Return array of most popular addition education spheres
 * by their popularity
 * @param {number=} opt_amount
 * @return {Array<models.SpecializedClassType>}
 */
service.getPopularTypes = async(function(opt_amount) {
    return await(models.SpecializedClassType.findAll({
        limit: opt_amount || 6,
        order: [['popularity', 'DESC']]
    }));
});


/**
 * Return specialized class types by given id
 * @param {(Array<number>|number)} ids
 * @return {
 *     (Array<models.SpecializedClassType>|
 *     models.SpecializedClassType)
 * }
 */
service.getById = async(function(id) {
    var condition;

    if (Array.isArray(id)) {
        condition = {
            id: {
                $in: id
            }
        };
    } else {
        condition = {
            id: id
        };
    }

    return await(models.SpecializedClassType.findAll(
        {
            attributes: ['id', 'name'],
            where: condition
        }
    ));
});

module.exports = service;

