'use strict';

const schoolView = require('../../../../api/modules/school/views/schoolView'),
    courseView = require('../../../../api/modules/course/views/courseView');

const entityTypeEnum =
    require('../../../../api/modules/entity/enums/entityType');

let popularView = {
};

/**
 * Create params for render popular
 * @param {{
 *     header: string,
 *     entities: Array<(models.School|models.Course)>,
 *     aliases: Array<models.Page>,
 *     entityType: string
 * }} data
 * @return {Object}
 */
popularView.render = function(data) {
    let labels = {
        [entityTypeEnum.SCHOOL]: 'Популярные школы',
        [entityTypeEnum.COOURE]: 'Популярные курсы'
    };

    let items = popularView.list(data);

    return {
        header: {
            label: labels[data.entityType]
        },
        list: {
            countItemsPerPage: items.length,
            items: items,
            itemType: 'smItemCompact',
            itemConfig: {
                enableCover: true
            }
        },
    };
};


/**
 * List popular
 * @param {{
 *     entities: Array<(models.School|models.Course)>,
 *     aliases: Array<models.Page>,
 *     entityType: string
 * }} data
 * @param {string} entityType
 * @return {Array<{
 *     id: number,
 *     type: string,
 *     name: {
 *         light: string,
 *         bold: ?string
 *     },
 *     description: ?string,
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
popularView.list = function(data) {
    let entityViews = {
        [entityTypeEnum.SCHOOL]: schoolView,
        [entityTypeEnum.COOURE]: courseView
    };

    let view = entityViews[data.entityType];

    return data.entities.map(entityData => {
        return view.item({
            entity: entityData,
            alias: data.aliases.find(page => page.entityId == entityData.id)
        });
    });
};

module.exports = popularView;
