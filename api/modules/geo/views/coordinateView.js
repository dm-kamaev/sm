'use strict';

var coordinateView = {};

/**
 * Transform coordinates given from yapi 1.1 to 2.0
 * @param {Array.<number>} coordinates
 * @return {Array.<number>}
 */
coordinateView.default = function(coordinates) {
    return [coordinates[1], coordinates[0]];
};

module.exports = coordinateView;
