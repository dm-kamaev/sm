'use strict';

var searchView = {};

/**
 * Transform array of school type filters to array with their ids
 * @param {Array.<Object>} typeInstances
 * @return {Array.<number>}
 */
searchView.typeFilterIds = function (typeInstances) {
    return typeInstances.map( (typeInstance) => {
            return typeInstance.id;
        }
    );
};

/**
 * Update filters in params
 * @param {Object} params
 * @param {Object} params.searchParams
 * @param {?string} params.searchParams.name
 * @param {?Array.<number>} params.searchParams.classes
 * @param {?Array.<string>} params.searchParams.schoolType
 * @param {?Array.<string>} params.searchParams.ege
 * @param {?Array.<string>} params.searchParams.gia
 * @param {?Array.<string>} params.searchParams.olimp
 * @param {?number} params.searchParams.metroId
 * @param {?number} params.searchParams.areaId
 * @param {?number} params.searchParams.sortType
 * @param {?number} params.page
 *
 * @param {Object} filters
 * @param {?Array.<number>} filters.schoolType
 * @param {?Array.<number>} filters.ege
 * @param {?Array.<number>} filters.gia
 * @param {?Array.<number>} filters.olimp
 *
 * @return {Object}
 */
searchView.params = function(params, filters) {
    var searchParams = params.searchParams,
        name;

    if (searchParams.areaId || searchParams.metroId || !searchParams.name) {
        name = '';
    } else {
        name = searchParams.name;
    }

    return {
        searchParams: {
            name: name,
            schoolType: filters.schoolType || [],
            classes: searchParams.classes || [],
            gia: filters.gia || [],
            ege: filters.ege || [],
            olimp: filters.olimp || [],
            metroId: searchParams.metroId || null,
            areaId: searchParams.areaId || null,
            sortType: searchParams.sortType || null
        },
        page: params.page || 0
    };
};

module.exports = searchView;
