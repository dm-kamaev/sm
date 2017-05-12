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
 *     numberEntities: number,
 *     entityType: string
 * }} data
 * @return {Object}
 */
popularView.render = function(data) {
    let headers = {
        [entityTypeEnum.SCHOOL]: 'Популярные школы',
        [entityTypeEnum.COOURE]: 'Популярные курсы'
    };

    let items = popularView.list(data);

    return {
        header: headers[data.entityType],
        list: {
            countItemsPerPage: items.length,
            items: items,
            itemType: 'smItemCompact',
            itemConfig: {
                enableCover: true
            }
        },
        catalog: popularView.catalog(data.entityType, data.numberEntities)
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


/**
 * @param {string} entityType
 * @param {number} numberEntities
 * @return {Object}
 */
popularView.catalog = function(entityType, numberEntities) {
    let entityViews = {
        [entityTypeEnum.COURSE]: courseView,
        [entityTypeEnum.SCHOOL]: schoolView
    };

    let declensionEntity =
        entityViews[entityType].declensionEntity(numberEntities);

    return {
        name: {
            light: 'Каталог'
        },
        type: 'catalog',
        picture: {
            sources: [{
                url: '/static/images/n-school/images/catalog.svg',
                size: 'default',
            }],
            altText: 'Каталог',
            size: 'original'
        },
        description: 'Мы&nbsp;составили полный каталог школ Москвы&nbsp;' +
            '&mdash; в&nbsp;нём сейчас',
        descriptionLink: {
            content: `${numberEntities} ${declensionEntity}`,
            url: '/school'
        },
        url: '/school'
    };
};

module.exports = popularView;
