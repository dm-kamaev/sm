'use strict';
const lodash = require('lodash');

const olympResultView = require('../../study/views/olimpResultView'),
    egeResultView = require('../../study/views/egeResultView'),
    giaResultView = require('../../study/views/giaResultView'),
    activityView = require('./activityView'),
    specializedClassesView = require('./specializedClassesView'),
    searchTypeEnum = require('../enums/searchType');

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
 * Update opt_filters in params
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
 * @param {Object=} opt_filters
 * @param {?Array.<number>} opt_filters.schoolType
 * @param {?Array.<number>} opt_filters.ege
 * @param {?Array.<number>} opt_filters.gia
 * @param {?Array.<number>} opt_filters.olimp
 *
 * @return {{
 *     name: string,
 *     schoolType: Array<number>,
 *     classes: Array<number>,
 *     gia: Array<number>,
 *     ege: Array<number>,
 *     olimp: Array<number>,
 *     metroId: ?number,
 *     areaId: ?number,
 *     districtId: ?number,
 *     sortType: ?number,
 *     page: number
 * }}
 */
searchView.params = function(searchParams, opt_filters) {
    var name,
        filters = opt_filters || {};

    if (searchParams.areaId ||
        searchParams.metroId ||
        searchParams.districtId ||
        !searchParams.name) {
        name = '';
    } else {
        name = searchParams.name;
    }

    return {
        name: name,
        schoolType: filters.schoolType ||
            searchParams.schoolType ||
            [],
        classes: searchParams.classes || [],
        gia: filters.gia ||
            searchParams.gia ||
            [],
        ege: filters.ege ||
            searchParams.ege ||
            [],
        olimp: filters.olimp ||
            searchParams.olimp ||
            [],
        activitySphere: searchParams.activitySphere || [],
        specializedClassType: searchParams.specializedClassType || [],
        metroId: searchParams.metroId || null,
        areaId: searchParams.areaId || null,
        districtId: searchParams.districtId || null,
        sortType: searchParams.sortType || null,
        page: searchParams.page || 0
    };
};


/**
 * @param {{
 *      subjects: Array<models.Subject>,
 *      schoolTypes: Array<models.SchoolTypeFilter>,
 *      egeSubjects: Array<models.EgeResult>,
 *      giaSubjects: Array<models.GiaResult>,
 *      olympiadSubjects: Array<models.OlimpResult>,
 *      activitySpheres: Array<models.AdditionalEducationSphere>,
 *      specializedClassesTypes: Array<models.SpecializedClassType>
 * }} filtersData
 * @param {{
 *     schoolType: Array<number>,
 *     classes: Array<number>,
 *     gia: Array<number>,
 *     ege: Array<number>,
 *     olimp: Array<number>
 * }} searchParams
 * @return {{
 *     filters: Array<{
 *         header: string,
 *         name: string,
 *         filters: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     }>,
 *     classesFilter: {
 *         data: {
 *             header: string,
 *             name: string,
 *             isKindergartenSelected: boolean,
 *             selectedClass: Array<number>
 *         }
 *     }
 * }}
 */
searchView.filters = function(filtersData, searchParams) {
    var schoolFilters = searchView.schoolFilters(filtersData, searchParams),
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
 * @param {{
 *      subjects: Array<models.Subject>,
 *      schoolTypes: Array<models.SchoolTypeFilter>,
 *      egeSubjects: Array<models.EgeResult>,
 *      giaSubjects: Array<models.GiaResult>,
 *      olympiadSubjects: Array<models.OlimpResult>,
 *      activitySpheres: Array<models.AdditionalEducationSphere>,
 *      specializedClassesTypes: Array<models.SpecializedClassType>
 * }} filtersData
 * @param {{
 *     schoolType: Array<number>,
 *     classes: Array<number>,
 *     gia: Array<number>,
 *     ege: Array<number>,
 *     olimp: Array<number>
 * }} searchParams
 * @return {Array.<Object.<string, Object>>}
 */
searchView.schoolFilters = function(filtersData, searchParams) {
    /** here makes order of filters in left menu **/
    var filters = [
        searchView.typeFilter(filtersData.schoolTypes),
        egeResultView.searchFilter(
            filtersData.egeSubjects, filtersData.subjects),
        giaResultView.searchFilter(
            filtersData.giaSubjects, filtersData.subjects),
        olympResultView.searchFilter(
            filtersData.olympiadSubjects, filtersData.subjects),
        activityView.sphereSearchFilter(filtersData.activitySpheres),
        specializedClassesView.sphereSearchFilter(
            filtersData.specializedClassesTypes)
    ];

    return filters.map(filter => {
        var filterType = lodash.camelCase(filter.filterType),
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
            isShowed: hasCheckedItems(filter),
            type: transformFilterType(filterType)
        }
    };
};


/**
 * Transform given filter type to type for template
 * @param {string} type
 * @return {?string}
 */
var transformFilterType = function(type) {
    return type == lodash.camelCase(searchTypeEnum.ACTIVITY_SPHERE) ||
            type == lodash.camelCase(searchTypeEnum.SPECIALIZED_CLASS_TYPE) ?
        'extended' :
        null;
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
        olimp: 'Есть победы в\u00A0олимпиадах',
        activitySphere: 'Курсы, кружки и\u00A0секции',
        specializedClassType: 'Профильные классы'
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
 * @return {{
 *     data: {
 *         header: string,
 *         name: string,
 *         isKindergartenSelected: boolean,
 *         selectedClass: Array<number>
 *     }
 * }}
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
                    return Number(selectedClass) === 0;
                }
            ),
            selectedClass: selectedClasses.find(selectedClass => {
                return Number(selectedClass) > 0;
            })
        }
    };
};

/**
 * Create school type filter
 * @param {Array<models.schoolTypeFilter>} schoolTypes
 * @return {{
 *     filterType: string,
 *     values: Array<{
 *         label: string,
 *         value: string,
 *         id: number
 *     }>
 * }}
 */
searchView.typeFilter = function(schoolTypes) {
    var formattedTypeFilter = schoolTypes.map(filter => {
        return {
            label: filter.name,
            value: filter.alias,
            id: filter.id
        };
    });
    return {
        filterType: searchTypeEnum.fields.SCHOOL_TYPE,
        values: formattedTypeFilter
    };
};

module.exports = searchView;
