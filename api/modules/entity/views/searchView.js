'use strict';

const courseView = require('../../course/views/courseView'),
    schoolView = require('../../school/views/schoolView');

const entityTypeEnum = require('../enums/entityType');

let searchView = {};


/**
 * View for list entities on map
 * @param {Array<Object>} entities
 * @param {{
 *     entityType: string,
 *     viewType: string,
 *     position: {
 *         center: Array<number>,
 *         type: string
 *     }
 * }} options
 * @return {{
 *     itemGroups: Array<{
 *         viewType: string,
 *         items: Array<Object>
 *     }>,
 *     position: ({
 *         center: Array<number>,
 *         type: string
 *     }|undefined)
 * }}
 */
searchView.map = function(entities, options) {
    let viewType = options.viewType;

    return {
        itemGroups: [{
            viewType: viewType,
            items: searchView.mapItems(entities, options)
        }],
        position: options.position
    };
};


/**
 * View for list items
 * @param {Array<Object>} entities
 * @param {{
 *     entityType: string,
 *     viewType: string,
 *     position: {
 *         center: Array<number>,
 *         type: string
 *     }
 * }} options
 * @return {Array<Object>}
 */
searchView.mapItems = function(entities, options) {
    let view = {
        [entityTypeEnum.SCHOOL]: schoolView,
        [entityTypeEnum.COURSE]: courseView
    };

    let entityType = options.entityType;

    return view[entityType].listMap(entities, options.viewType);
};

module.exports = searchView;
