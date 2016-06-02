'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const models = require('../../../../app/components/models').all;

const errors = require('../lib/errors');


var service = {
    name: 'favorites'
};


/**
 * Get all favorites for user with given id
 * @param {number} userId
 * @return {?Array.<models.Favorite>}
 */
service.getByUserId = async(function(userId) {
    return await(models.Favorite.findAll({
        where: {
            'userId': userId
        },
        order: [['createdAt', 'DESC']],
        include: {
            model: models.School,
            as: 'school'
        }
    }));
});


/**
 * Get one favorite entry by id
 * @param {number} favoriteId
 * @return {models.Favorite}
 */
service.getById = async(function(favoriteId) {
    return await(models.Favorite.findOne({
        where: {
            id: favoriteId
        }
    }));
});


/**
 * Get one favorite by user id and item id
 * @param {number} userId
 * @param {number} itemId
 * @return {models.Favorite}
 */
service.getByUserIdAndItemId = async(function(userId, itemId) {
    return await(models.Favorite.findOne({
        where: {
            $and: [
                {userId: userId},
                {itemId: itemId}
            ]
        }
    }));
});


/**
 * Create favorite entry with given item id for given user
 * @param {number} userId
 * @param {number} itemId
 * @return {models.Favorite}
 */
service.create = async(function(userId, itemId) {
    var favorite = await(models.Favorite.create(
        {
            userId: userId,
            itemId: itemId
        }, {
            include: {
                model: models.School,
                as: 'item'
            }
        }
    ));

    return favorite;
});


/**
 * Delete favorite entry with given id
 * @param {number}
 */
service.delete = async(function(favoriteId) {
    var favorite = await(service.getById(favoriteId));

    if(favorite) {
        await(favorite.destroy());
    } else {
        throw new errors.FavoriteEntryNotFound();
    }
});


/**
 * Delete one favorite by user id and item id
 * @param {number} userId
 * @param {number} itemId
 */
service.deleteByUserIdAndItemId = async(function(userId, itemId) {
    var favorite = await(service.getByUserIdAndItemId(userId, itemId));

    if(favorite) {
        await(favorite.destroy());
    } else {
        throw new errors.FavoriteEntryNotFound();
    }
});


module.exports = service;
