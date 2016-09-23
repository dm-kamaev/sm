'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

const errors = require('../lib/errors');

const entityType = require('../../entity/enums/entityType');

var service = {
    name: 'favorite'
};


/**
 * Get all data of favorite entries for user with given id
 * @param {number} userId
 * @return {Array<models.Favorite>}
 */
service.getByUserId = async(function(userId) {
    return await(models.Favorite.findAll({
        attributes: ['id', 'entityId', 'entityType'],
        where: {
            userId: userId
        },
        order: [['createdAt', 'DESC']]
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
 * Get one favorite by user id and entity id and entity type
 * @param {number} userId
 * @param {{
 *     id: numder,
 *     type: string
 * }} entityData
 * @return {models.Favorite}
 */
service.getByUserIdAndEntityData = async(function(userId, entityData) {
    return await(models.Favorite.findOne({
        where: {
            $and: [
                {userId: userId},
                {entityId: entityData.id},
                {entityType: entityData.type}
            ]
        }
    }));
});


/**
 * Create favorite entry with given entity id and type for given user
 * @param {number} userId
 * @param {{
 *     id: numder,
 *     type: string
 * }} entityData
 * @return {models.Favorite}
 */
service.create = async(function(userId, entityData) {
    var favorite = await(models.Favorite.create(
        {
            userId: userId,
            entityId: entityData.id,
            entityType: entityData.type
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
    if (favorite) {
        await(favorite.destroy());
    } else {
        throw new errors.FavoriteEntryNotFound();
    }
});


/**
 * Delete one favorite by user id and entity id and type
 * @param {number} userId
 * @param {{
 *     id: numder,
 *     type: string
 * }} entityData
 */
service.deleteByUserIdAndEntityData = async(function(userId, entityData) {
    var favorite = await(service.getByUserIdAndEntityData(userId, entityData));

    if (favorite) {
        await(favorite.destroy());
    } else {
        throw new errors.FavoriteEntryNotFound();
    }
});


/**
 * Create favorite entry with given entity id and type for given user and
 * get added favorite entry
 * @param {number} userId
 * @param {{
 *     id: numder,
 *     type: string
 * }} entity
 * @return {{
 *     entity: (models.School|models.Course),
 *     url: models.Page,
 *     type: string
 * }}
 */
service.addToFavoriteAndGetEntity = async(function(userId, entity) {
    var entities;

    var getDataFavoriteEntities = {
        [entityType.SCHOOL]: this.getListFavoriteSchools,
        [entityType.COURSE]: this.getListFavoriteCourses
    };

    if (this.addToFavorite(userId, entity)) {
        entities = await(getDataFavoriteEntities[entity.type]([entity.id]));
    }

    return entities[0];
});


/**
 * Create favorite entry with given entity id and type for given user
 * @param {number} userId
 * @param {{
 *     id: numder,
 *     type: string
 * }} entity
 * @return {boolean}
 */
service.addToFavorite = async(function(userId, entity) {
    var isFavorite = await(this.isFavorite(userId, entity));

    if (!isFavorite) {
        await(this.create(userId, {
            id: entity.id,
            type: entity.type
        }));
    }

    return !isFavorite;
});


/**
 * Return true if given entity id is favorites user, else return false
 * @param {number} userId
 * @param {{
 *     id: number,
 *     type: string
 * }} entity
 * @return {boolean}
 */
service.isFavorite = async(function(userId, entity) {
    var userFavorites = await(this.getByUserId(userId));

    var entityIdsByType =
        this.getEntityIdsFiltredByType(userFavorites, entity.type);

    return entityIdsByType.some(entityId =>
        entityId == entity.id
    );
});


/**
 * Get favorite schools data for list favorites
 * @param {number} schoolsIds
 * @return {Array<{
 *     entity: models.School,
 *     url: models.Page,
 *     type: string
 * }>}
 */
service.getListFavoriteSchools = async(function(schoolsIds) {
    var listFavoriteSchools = await({
        entities: services.school.getByIdsWithGeoData(schoolsIds),
        urls: services.page.getAliases(
            schoolsIds,
            entityType.SCHOOL
        ),
        type: entityType.SCHOOL
    });

    return service.groupDataByIds(listFavoriteSchools);
});


/**
 * Get favorite courses data for list favorites
 * @param {number} coursesIds
 * @return {Array<{
 *     entity: models.Course,
 *     url: models.Page,
 *     type: string
 * }>}
 */
service.getListFavoriteCourses = async(function(coursesIds) {
    var listFavoriteCourses = await({
        entities: services.course.getByIds(coursesIds, {metro: true}),
        urls: services.page.getAliases(
            coursesIds,
            entityType.COURSE
        ),
        type: entityType.COURSE
    });

    return service.groupDataByIds(listFavoriteCourses);
});


/**
 * Group entity and url by given id and add entity type
 * @param {{
 *     entities: Array<(models.School|models.Course)>,
 *     urls: Array<models.Page>,
 *     type: string
 * }} data
 * @param {Array<models.Favorite>} listFavorites
 * @return {Array<{
 *     entity: (models.School|models.Course),
 *     url: models.Page,
 *     type: string
 * }>}
 */
service.groupDataByIds = function(data) {
    return data.entities.map(entity => {
        return {
            entity: entity,
            url: data.urls.find(url => entity.id == url.entityId),
            type: data.type
        };
    });
};


/**
 * Get ids filtred by given type
 * @param {Array<models.Favorite>} listFavorites
 * @param {string} type
 * @return {Array<number>}
 */
service.getEntityIdsFiltredByType = function(listFavorites, type) {
    var ids = [];

    listFavorites.forEach(favorite =>
        favorite.entityType == type ? ids.push(favorite.entityId) : false
    );

    return ids;
};


module.exports = service;
