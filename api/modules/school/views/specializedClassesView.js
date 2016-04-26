var lodash = require('lodash');
var specializedClassesView = {};

/**
 * @param {object} specializedClasses
 * @return {array}
 */
specializedClassesView.list = function(specializedClasses) {
    var result = specializedClassesView.listParams_([], 'unfolded');

    var items = specializedClassesView.itemsToLevel_(specializedClasses, 0, 4);
    if (items.length) {
        result.data.items.push(
            specializedClassesView.listParams_(
                items,
                'unfolded',
                'Начальная школа'
            )
        );
    }

    var items = specializedClassesView.itemsToLevel_(specializedClasses, 5, 9);
    if (items.length) {
        result.data.items.push(
            specializedClassesView.listParams_(
                items,
                'unfolded',
                'Средняя школа'
            )
        );
    }

    var items = specializedClassesView.itemsToLevel_(specializedClasses, 9, 11);
    if (items.length) {
        result.data.items.push(
            specializedClassesView.listParams_(
                items,
                'unfolded',
                'Старшая школа'
            )
        );
    }

    return result;
};


specializedClassesView.itemsToLevel_ = function(specializedClasses, start, end) {
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

specializedClassesView.listParams_ = function(items, type, opt_name) {
    return {
        data: {
            name: opt_name || '',
            items: items
        },
        config: {
            type: type
        }
    };
}

module.exports = specializedClassesView;