var lodash = require('lodash');

var searchType = require('../enums/searchType');

var specializedClassesView = {};

/**
 * @param {object} specializedClasses
 * @return {object}
 */
specializedClassesView.list = function(specializedClasses) {
    var steps = ['Начальная школа', 'Средняя школа', 'Старшая школа'];

    var itemsData = [
        specializedClassesView.itemsByClasses_(specializedClasses, 0, 4),
        specializedClassesView.itemsByClasses_(specializedClasses, 5, 9),
        specializedClassesView.itemsByClasses_(specializedClasses, 9, 11)
    ];

    var items = itemsData
            .map((data, index) => {
                var step = steps[index];
                return data.length ?
                    specializedClassesView.listParams_(data, step) :
                    null;
            })
            .filter(item => item != null);

    return specializedClassesView.listParams_(items);
};

/**
 * creates an array of the classes (from, to)
 * @param {object} specializedClasses
 * @param {number} start
 * @param {number} end
 * @return {array}
 */
specializedClassesView.itemsByClasses_ = function(
    specializedClasses, start, end
) {
    var classes = lodash.filter(specializedClasses, function(collection) {
        if (collection[0] >= start && collection[0] <= end) {
            return collection[1];
        }
    });

    var items = [];

    lodash.forEach(classes, function(item) {
        items.push(lodash.last(item));
    });

    return items;
};

/**
 * @param {array} items
 * @param {srting=} opt_name
 * @return {object}
 */
specializedClassesView.listParams_ = function(items, opt_name) {
    return {
        data: {
            name: opt_name || '',
            items: items
        },
        config: {
            type: 'unfolded'
        }
    };
};


/**
 * Create filters from given specialized classes types
 * @param {Array<models.SpecializedClassType>} specializedClassTypes
 * @return {Array<{
 *     label: string,
 *     value: number
 * }>}
 */
specializedClassesView.typeFilters = function(specializedClassTypes) {
    return specializedClassTypes.map(type => {
        return {
            label: type.name,
            value: type.id
        };
    });
};


/**
 * Create filters with name and values from given specialized classes types
 * @param {Array<models.SpecializedClassType>} specializedClassTypes
 * @return {{
 *     filterType: string,
 *     values: Array<{
 *         label: string,
 *         value: number
 *     }>
 * }}
 */
specializedClassesView.sphereSearchFilter = function(specializedClassTypes) {
    var typeFilters = specializedClassesView.typeFilters(specializedClassTypes);
    return {
        filterType: searchType.fields.SPECIALIZED_CLASS_TYPE,
        values: typeFilters
    };
};

module.exports = specializedClassesView;
