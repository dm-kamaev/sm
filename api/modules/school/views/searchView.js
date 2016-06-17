'use strict';
const lodash = require('lodash');

var searchView = {};

/**
 * Transform array of school type filters to array with their ids
 * @param {Array.<Object>} typeInstances
 * @return {Array.<number>}
 */
searchView.schoolTypeFilterIds = function(typeInstances) {
    return typeInstances.map(typeInstance => {
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

/**
 * @param {Array.<Object>} filters
 * @param {Object.<string, Array.<number>>} searchParams
 * @return {Object}
 */
searchView.filters = function(filters, searchParams) {
    var schoolFilters = searchView.schoolFilters(filters, searchParams),
        classesFilter = searchView.classesFilter(searchParams);

    return {
        filters: schoolFilters,
        classesFilter: classesFilter,
        url: '/api/school/search',
        config: {
            hasCheckedFilters: hasCheckedFilters(schoolFilters, classesFilter)
        }
    };
};

/**
 * Verify that one of filters is checked and return true in this case
 * @param {Object} schoolFilters
 * @param {Object} classesFilter
 * @return {boolean}
 */
var hasCheckedFilters = function(schoolFilters, classesFilter) {
    var isChecked =
        classesFilter.data.isKindergartenSelected ||
        classesFilter.data.selectedClass;

    if (!isChecked) {
        isChecked = lodash.some(schoolFilters, function(subjectFilter) {
            return subjectFilter.config.isShowed;
        });
    }

    return isChecked;
};

/**
 * Generate school filters
 * @param {Array.<Object.<string, string|number>>} filters
 * @param {Object.<string, Array.<number>>} searchParams
 * @return {Array.<Object.<string, Object>>}
 */
searchView.schoolFilters = function(filters, searchParams) {
    return filters.map(filter => {
        var filterType = lodash.camelCase(filter.filter),
            checkedItems = searchParams[filterType];

        return schoolFilter(filter, checkedItems, filterType);
    });
};

/**
 * Generate school filter
 * @param {Object.<string, string|Array>} filterItem
 * @param {Array.<number>} checkedItems
 * @param {string} filterType
 * @return {Object.<string, Object>}
 */
var schoolFilter = function(filterItem, checkedItems, filterType) {
    var filter = filterValues(filterItem.values, checkedItems);

    return {
        data: {
            header: {
                title: filterTitle(filterType),
                tooltip: filterTooltip(filterType)
            },
            name: filterType,
            filters: filter
        },
        config: {
            isShowed: hasCheckedItems(filter)
        }
    };
};

/**
 * Return title for given filter type
 * @param {string} filterType
 * @return {?string}
 */
var filterTitle = function(filterType) {
    var titles = {
        schoolType: 'Тип школы',
        ege: 'Высокие результаты ЕГЭ',
        gia: 'Высокие результаты ГИА',
        olimp: 'Есть победы в\u00A0олимпиадах'
    };

    return titles[filterType];
};

/**
 * Return tooltip for given filter type
 * @param {string} filterType
 * @return {?string}
 */
var filterTooltip = function(filterType) {
    var tooltips = {
        schoolType: '',
        ege: 'Выше среднего значения по\u00A0нашей базе.' +
            ' Учитываются результаты московских школ за\u00A0последний год.',
        gia: 'Выше среднего значения по\u00A0нашей базе.' +
            ' Учитываются результаты московских школ за\u00A0последний год.',
        olimp: ''
    };
    return tooltips[filterType];
};

/**
 * Generate each filter object
 * @param {Array.<number>} filters
 * @param {Array.<number>} checkedFilters - array with id of currently checked
 * filters
 * @return {Array.<Object.<string, boolean|string>>}
 */
var filterValues = function(filters, checkedFilters) {
    return filters.map(filter => {
        return {
            label: filter.label,
            value: filter.value,
            isChecked: isCheckedItem(checkedFilters, filter.id)
        };
    });
};

/**
 * Search for given filterId in checkedFilters array
 * @param {Array.<number>} checkedFilters
 * @param {number} filterId
 * @return {boolean}
 */
var isCheckedItem = function(checkedFilters, filterId) {
    return !!checkedFilters.find(checkedFilter => {
        return checkedFilter == filterId;
    });
};

/**
 * Verify that one of filters is checked and return true in this case
 * @param {Array<Object>} filters
 * @return {boolean}
 */
var hasCheckedItems = function(filters) {
    return lodash.some(filters, function(filter) {
        return filter.isChecked;
    });
};

/**
 * Create classes filter settings from search params
 * @param {Object.<string, Array.<number>>} searchParams
 * @return {Object.<string, Object>}
 */
searchView.classesFilter = function(searchParams) {
    var selectedClasses = searchParams.classes;
    return {
        data: {
            header: {
                title: 'В какой класс Вы хотите отдать ребенка?'
            },
            name: 'classes',
            isKindergartenSelected: lodash.some(
                selectedClasses, selectedClass => {
                    return parseInt(selectedClass) === 0;
                }
            ),
            selectedClass: selectedClasses.find(selectedClass => {
                return parseInt(selectedClass) > 0;
            })
        }
    };
};

module.exports = searchView;
