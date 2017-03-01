var lodash = require('lodash');

var specializedClassesView = {};

/**
 * @param {Array<({
 *     schoolId: number,
 *     specializedClassTypeId: number,
 *     class: number
 * }|models.SchoolSpecializedClass)>} schoolSpecializedClasses
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
        schoolSpecializedClasses.map(schoolSpecializedClass => {
            var typeId = schoolSpecializedClass.specializedClassTypeId,
                type = specializedClassTypes.find(type => {
                    return type.id == typeId;
                });

            return [schoolSpecializedClass.class, type.name];
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

module.exports = specializedClassesView;
