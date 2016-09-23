'use strict';

const schoolView = require('../../school/views/schoolView');
const courseView = require('../../course/views/courseView');

const entityType = require('../../entity/enums/entityType');

var favoriteView = {};


/**
 * Default favorite view
 * @param {Object} favorite
 * @return {Object}
 */
favoriteView.default = function(favorite) {
    return {
        item: {
            name: favorite.item.name,
            score: favorite.item.score
        }
    };
};


/**
 * List favorites
 * @param {{
 *     entities: Array<(models.School|models.Course)>,
 *     urls: Array<models.Page>,
 *     type: string
 * }} listData
 * @return {Array<{
 *     id: number,
 *     type: string,
 *     name: {
 *         light: string,
 *         bold: ?string
 *     },
 *     alias: string,
 *     score: number,
 *     metro: ?Array<{
 *         id: number,
 *         name: string
 *     }>,
 *     area: ?Array<{
 *         id: number,
 *         name: string
 *     }>
 * }>}
 */
favoriteView.list = function(listData) {
    return listData.map(entityData => {
        return this.item({
            entity: entityData.entity,
            url: entityData.url,
            type: entityData.type
        });
    });
};


/**
 * Item for list favorites
 * @param {{
 *     entity: (models.School|models.Course),
 *     url: models.Page,
 *     type: string
 * }} entityData
 * @return {{
 *     id: number,
 *     type: string,
 *     name: {
 *         light: string,
 *         bold: ?string
 *     },
 *     alias: string,
 *     score: number,
 *     metro: ?Array<{
 *         id: number,
 *         name: string
 *     }>,
 *     area: ?Array<{
 *         id: number,
 *         name: string
 *     }>
 * }}
 */
favoriteView.item = function(entityData) {
    var result;

    if (entityData.type == entityType.SCHOOL) {
        result = schoolView.item(entityData);
    } else if (entityData.type == entityType.COURSE) {
        result = courseView.item(entityData);
    }
    return result;
};

module.exports = favoriteView;
