'use strict';

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

