'use strict';
const lodash = require('lodash');

var districtView = {};

/**
 * List of districts fo suggest search results
 * @param {Array<models.District>} districts
 * @return {Array<{
 *     id: number,
 *     name: string
 * }>}
 */
districtView.list = function(districts) {
    var uniqueDistricts = lodash.uniq(districts, 'id');

    return uniqueDistricts.map(district => {
        return {
            id: district.id,
            name: district.name
        };
    });
};

module.exports = districtView;
