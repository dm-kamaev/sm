var lodash = require('lodash');

var searchType = require('../enums/searchType');

var specializedClassesView = {};

/**
 * @param {Array<Array<number>>} schoolSpecializedClasses
 * @param {Array<models.SpecializedClassType>} specializedClassTypes
 * @return {{
 *     data: {
 *        name: string,
 *        items: Array<Object>,
 *     },
 *     config: {
 *         type: string
 *     }
 * }}
 */
specializedClassesView.list = function(
    schoolSpecializedClasses, specializedClassTypes
) {
    var steps = ['Начальная школа', 'Средняя школа', 'Старшая школа'],
        specializedClasses = specializedClassesView.withTypeName(
            schoolSpecializedClasses, specializedClassTypes
        );

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
 * Combine school specialized classes an their type name by type id
 * @param {Array<Array<number>>} schoolSpecializedClasses
 * @param {Array<models.SpecializedClassType>} specializedClassTypes
 * @return {Array<Array<(string|number)>>}
 */
specializedClassesView.withTypeName = function(
    schoolSpecializedClasses, specializedClassTypes
) {
    return schoolSpecializedClasses ?
        schoolSpecializedClasses.map(specializedClass => {
            var typeId = specializedClass[1],
                type = specializedClassTypes.find(type => {
                    return type.id == typeId;
                });

            return [specializedClass[0], type.name];
        }) : null;
};


/**
 * creates an array of the classes (from, to)
 * @param {Array<Array<(string|number)>>} specializedClasses
 * @param {number} start
 * @param {number} end
 * @return {Array<string>}
 */
specializedClassesView.itemsByClasses_ = function(
    specializedClasses, start, end
) {
    var classes = lodash.filter(specializedClasses, function(collection) {
        /** Element in array with index 0 means grade of pupils
         * for current specialized class. If current specialized class
         * between start and end => place it into result array **/
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
 * @param {Array<string|Object>} items
 * @param {string=} opt_name
 * @return {{
 *     data: {
 *        name: string,
 *        items: Array<(string|Object)>,
 *     },
 *     config: {
 *         type: string
 *     }
 * }}
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
            id: type.id,
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
specializedClassesView.typeSearchFilter = function(specializedClassTypes) {
    var typeFilters = specializedClassesView.typeFilters(specializedClassTypes);
    return {
        filterType: searchType.fields.SPECIALIZED_CLASS_TYPE,
        values: typeFilters
    };
};

module.exports = specializedClassesView;
