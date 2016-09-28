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
 *     alias: models.Page,
 *     type: string,
 *     brandAlias: ?models.Page
 * }}
 */
service.addToFavorite = async(function(userId, entity) {
    var entities;

    var getDataFavoriteEntities = {
        [entityType.SCHOOL]: this.getListFavoriteSchools,
        [entityType.COURSE]: this.getListFavoriteCourses
    };

    if (!await(this.isFavorite(userId, entity))) {
        await(this.create(userId, entity));
        entities = await(getDataFavoriteEntities[entity.type]([entity.id]));
    }

    return entities ? entities[0] : null;
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
 * Get favorite entities data for list favorites
 * @param {Array<models.Favorite>} listFavorites
 * @return {Array<{
 *     entity: (models.School|models.Course),
 *     alias: models.Page,
 *     type: string,
 *     brandAlias: ?models.Page
 * }>}
 */
service.getFavoriteEntities = async(function(userId) {
    var listFavorites = await(this.getByUserId(userId));

    var coursesIds =
        this.getEntityIdsFiltredByType(listFavorites, entityType.COURSE);
    var schoolsIds =
        this.getEntityIdsFiltredByType(listFavorites, entityType.SCHOOL);

    var entities = await({
        courses: this.getListFavoriteCourses(coursesIds),
        schools: this.getListFavoriteSchools(schoolsIds)
    });

    var listEntities = entities.courses.concat(entities.schools);
    return this.sortListEntities(listEntities, listFavorites);
});


/**
 * Get favorite schools data for list favorites
 * @param {number} schoolsIds
 * @return {Array<{
 *     entity: models.School,
 *     alias: models.Page,
 *     type: string
 * }>}
 */
service.getListFavoriteSchools = async(function(schoolsIds) {
    var listFavoriteSchools = await({
        entities: services.school.getByIdsWithGeoData(schoolsIds),
        aliases: services.page.getAliases(schoolsIds, entityType.SCHOOL),
        type: entityType.SCHOOL
    });

    return service.groupDataByIds(listFavoriteSchools);
});


/**
 * Get favorite courses data for list favorites
 * @param {number} coursesIds
 * @return {Array<{
 *     entity: models.Course,
 *     alias: models.Page,
 *     type: string,
 *     brandAlias: models.Page
 * }>}
 */
service.getListFavoriteCourses = async(function(coursesIds) {
    let listFavoriteCourses = await({
            entities: services.course.getByIds(coursesIds, {metro: true}),
            type: entityType.COURSE
        }),
        aliases = await(services.course.getAliases(
            listFavoriteCourses.entities, entityType.COURSE
        ));

    listFavoriteCourses.aliases = aliases.course;
    listFavoriteCourses.brandAliases = aliases.brand;

    return service.groupDataByIds(listFavoriteCourses);
});


/**
 * Group entity and url by given id and add entity type
 * @param {{
 *     entities: Array<(models.School|models.Course)>,
 *     aliases: Array<models.Page>,
 *     type: string,
 *     brandAliases: (Array<models.Page>|undefined)
 * }} data
 * @return {Array<{
 *     entity: (models.School|models.Course),
 *     alias: models.Page,
 *     type: string,
 *     brandAlias: ?models.Page
 * }>}
 */
service.groupDataByIds = function(data) {
    return data.entities.map(entity => ({
        entity: entity,
        alias: data.aliases.find(alias => entity.id == alias.entityId),
        type: data.type,
        brandAlias: data.brandAliases ? data.brandAliases.find(alias =>
            entity.brandId == alias.entityId) : undefined
    }));
};


/**
 * Sort list Entities based on list Favorites
 * @param {Array<{
 *     entity: (models.School|models.Course),
 *     alias: models.Page,
 *     type: string,
 *     brandAlias: (models.Page|undefined)
 * }>} listEntities
 * @param {Array<models.Favorite>} listFavorites
 * @return {Array<{
 *     entity: (models.School|models.Course),
 *     alias: models.Page,
 *     type: string,
 *     brandAlias: ?models.Page
 * }>}
 */
service.sortListEntities = function(listEntities, listFavorites) {
    return listFavorites.map(favorite => {
        return listEntities.find(entityData =>
            (favorite.entityType == entityData.type &&
            favorite.entityId == entityData.entity.id)
        );
    });
};


/**
 * Get ids filtred by given type
 * @param {Array<models.Favorite>} listFavorites
 * @param {string} type
 * @return {Array<number>}
 */
service.getEntityIdsFiltredByType = function(listFavorites, type) {
    return listFavorites.map(favorite =>
            favorite.entityType == type ? favorite.entityId : false
        )
        .filter(id => id);
};


module.exports = service;
