var lodash = require('lodash');
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
    specializedClasses, start, end) {

    var classes = lodash.filter(specializedClasses, function(collection) {
        if(collection[0] >= start && collection[0] <= end) {
            return collection[1];
        }
    });

    var items = [];

    lodash.forEach(classes, function(item){
        items.push(lodash.last(item));
    });

    return items;
};

/**
 * @param {object} specializedClasses
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
}

module.exports = specializedClassesView;