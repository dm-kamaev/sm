'use strict';

var searchView = {};

/**
 * Transform array of school type filters to array with their ids
 * @param {Array.<Object>} typeInstances
 * @return {Array.<number>}
 */
searchView.schoolTypeFilterIds = function (typeInstances) {
    return typeInstances.map( (typeInstance) => {
            return typeInstance.id;
        }
    );
};

/**
 * Update filters in params
 * @param {Object} searchParams
 * @param {?string} searchParams.name
 * @param {?Array.<number>} searchParams.classes
 * @param {?Array.<string>} searchParams.schoolType
 * @param {?Array.<string>} searchParams.ege
 * @param {?Array.<string>} searchParams.gia
 * @param {?Array.<string>} searchParams.olimp
 * @param {?number} searchParams.metroId
 * @param {?number} searchParams.areaId
 * @param {?number} searchParams.sortType
 * @param {?number} searchParams.page
 *
 * @param {Object} filters
 * @param {?Array.<number>} filters.schoolType
 * @param {?Array.<number>} filters.ege
 * @param {?Array.<number>} filters.gia
 * @param {?Array.<number>} filters.olimp
 *
 * @return {Object}
 */
searchView.params = function(searchParams, filters) {
    var name;

    if (searchParams.areaId || searchParams.metroId || !searchParams.name) {
        name = '';
    } else {
        name = searchParams.name;
    }

    return {
        name: name,
        schoolType: filters.schoolType || [],
        classes: searchParams.classes || [],
        gia: filters.gia || [],
        ege: filters.ege || [],
        olimp: filters.olimp || [],
        metroId: searchParams.metroId || null,
        areaId: searchParams.areaId || null,
        sortType: searchParams.sortType || null,
        page: searchParams.page || 0
    };
};

module.exports = searchView;
