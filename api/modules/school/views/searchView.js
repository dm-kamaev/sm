'use strict';
const lodash = require('lodash');

const olympResultView = require('../../study/views/olimpResultView'),
    egeResultView = require('../../study/views/egeResultView'),
    giaResultView = require('../../study/views/giaResultView'),
    activityView = require('./activityView'),
    specializedClassesView = require('./specializedClassesView');

const searchViewEntity = require('../../entity/views/searchView');

const filterName = require('../enums/filterName'),
    mapViewType = require('../../entity/enums/mapViewType'),
    entityType = require('../../entity/enums/entityType'),
    searchTypeEnum = require('../enums/searchType');

const FormatUtils = require('../../entity/lib/FormatUtils');

// FilterPanel = require('../lib/SchoolFilterPanel');

const userView = require('../../user/views/user'),
    schoolView = require('./schoolView');

// favoriteView = require('../../favorite/views/favoriteView');

var searchView = {};

/**
 * @param {{
 *     user: Object,
 *     fbClientId: string,
 *     favorites: Array<Object>,
 *     authSocialLinks: Object,
 *     schoolsList: Array<Object>,
 *     mapSchools: Object<Object>,
 *     mapPosition: Object,
 *     searchParams: Object,
 *     filtersData: Array<Object>,
 *     schoolAliases: Array<Object>,
 *     seoParams: Object
 * }} data
 * @return {Object}
 */
searchView.render = function(data) {
    let user = userView.default(data.user),
        seoParams = data.seoParams || {};

    let aliasedSchools = schoolView.joinAliases(
        data.schoolsList, data.schoolAliases
    );

    return {
        seo: {
            metaTitle: seoParams.tabTitle,
            metaDescription: seoParams.metaDescription
        },
        openGraph: {
            title: seoParams.openGraphTitle,
            description: seoParams.openGraphDescription,
            image: '/static/images/n-clobl/i-layout/schools_sharing.png',
            relapTag: 'школы мела',
            relapImage: '/static/images/n-clobl/i-layout/schools_sharing.png',
            fbClientId: data.fbClientId,
        },
        subHeader: {
            logo: {
                imgUrl: '/static/images/n-common/b-sm-subheader/school-logo.svg'
            },
            links: {
                nameL: 'Все школы Москвы',
                nameM: 'Все школы',
                nameS: 'Все школы Москвы',
                url: '',
            },
            search: {
                placeholder: 'Район, метро, номер школы',
                pageAlias: '',
            },
            user: user,
            favorites: {
                items: [],
                //favoriteView.list(data.favorites)
            },
        },
        user: user,
        authSocialLinks: data.authSocialLinks,
        map: searchViewEntity.map(aliasedSchools, {
            entityType: entityType.SCHOOL,
            viewType: mapViewType.PIN,
            position: data.mapPosition
        }),
        search: {
            searchText: data.searchParams.name,
            placeholder: 'Район, метро, номер школы',
            pageAlias: '',
        },
        resultsList: {
            title: seoParams.listTitle,
            description: seoParams.text && seoParams.text[0] || null,
            countResults: data.schoolsList[0] &&
                data.schoolsList[0].countResults ||
                0,
            searchText: data.searchParams.name,
            declensionEntityType: {
                nom: 'школа',
                gen: 'школы',
                plu: 'школ'
            },
            sort: {
                listItems: [{
                    'label': 'по средней оценке',
                    'text': 'средней оценке'
                }, {
                    'label': 'по образованию',
                    'text': 'образованию'
                }, {
                    'label': 'по преподавателям',
                    'text': 'преподавателям'
                }, {
                    'label': 'по атмосфере',
                    'text': 'атмосфере'
                }, {
                    'label': 'по инфраструктуре',
                    'text': 'инфраструктуре'
                }],
                staticText: 'Сортировать по ',
                defaultOpenerText: 'средней оценке'
            },
            entityList: {
                items: schoolView.list(aliasedSchools),
                itemType: 'smItemEntity'
            }
        },
        filterPanel: searchView.filterPanel({
            filtersData: data.filtersData,
            searchParams: data.searchParams
        }),
        searchParams: data.searchParams
    };
};


/**
 * @param {Object} params
 * @return {Object}
 */
searchView.initSearchParams = function(params) {
    let formatUtils = new FormatUtils();

    return {
        [filterName.CLASSES]: formatUtils.transformToArray(params.classes),
        [filterName.SCHOOL_TYPE]:
            formatUtils.transformToArray(params.schoolType),
        [filterName.EGE]: formatUtils.transformToArray(params.ege),
        [filterName.GIA]: formatUtils.transformToArray(params.gia),
        [filterName.OLIMP]: formatUtils.transformToArray(params.olimp),
        [filterName.SPECIALIZED_CLASS_TYPE]:
            formatUtils.transformToArray(params.specializedClassType),
        [filterName.ACTIVITY_SPHERE]:
            formatUtils.transformToArray(params.activitySphere),
        page: params.page || 0,
        sortType: params.sortType,
        name: params.name,
        metroId: params.metroId || null,
        areaId: params.areaId || null,
        districtId: params.districtId || null
    };
};


/**
 * Data for filter panel
 * @param {{
 *     filtersData: Array<Object>,
 *     searchParams: {
 *         classes: Array<(string|number)>,
 *         schoolType: Array<(string|number)>,
 *         ege: Array<(string|number)>,
 *         gia: Array<(string|number)>,
 *         olimp: Array<(string|number)>,
 *         specializedClassType: Array<(string|number)>,
 *         activitySphere: Array<(string|number)>
 *     },
 *     filters: Array<string>
 * }} data
 * @return {{
 *     data: {
 *         filters: Array<{
 *             data: {
 *                 header: {
 *                     title: (string|undefined),
 *                     tooltip: (string|undefined)
 *                 },
 *                 name: string,
 *                 options: Array<({
 *                     label: string,
 *                     value: string,
 *                     isChecked: boolean
 *                   }|{
 *                     title: (string|undefined),
 *                     value: (number|undefined),
 *                     placeholder: (string|undefined),
 *                     maxLength: (number|undefined)
 *                 })>
 *             },
 *             config: {
 *                 type: (string|undefined),
 *                 optionsToShow: (boolean|undefined),
 *                 cannotBeHidden: (boolean|undefined),
 *                 isShowed: (boolean|undefined),
 *                 showMoreButtonText: (number|undefined),
 *                 theme: (string|undefined),
 *                 align: (string|undefined)
 *             }
 *         }>
 *     },
 *     config: {
 *         hasCheckedFilters: (boolean|undefined)
 *     }
 * }}
 */
searchView.filterPanel = function(data) {
    // let filterPanel = new FilterPanel();
    // filterPanel.init(data);

    // return filterPanel.getParams();
    return {};
};


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
 * Update opt_filters in params and set default values
 * @param {{
 *     name: string,
 *     schoolType: (Array<number>|undefined),
 *     classes: (Array<number>|undefined),
 *     gia: (Array<number>|undefined),
 *     ege: (Array<number>|undefined),
 *     olimp: (Array<number>|undefined),
 *     activitySphere: (Array<number>|undefined),
 *     specializedClassType: (Array<number>|undefined),
 *     metroId: (number|undefined),
 *     areaId: (number|undefined),
 *     districtId: (number|undefined),
 *     sortType: (number|undefined),
 *     page: (number|undefined)
 * }} searchParams
 *
 * @param {{
 *     schoolType: (Array.<number>|undefined),
 *     ege: (Array.<number>|undefined),
 *     gia: (Array.<number>|undefined)
 * }=} opt_filters
 *
 * @return {{
 *     name: string,
 *     schoolType: Array<number>,
 *     classes: Array<number>,
 *     gia: Array<number>,
 *     ege: Array<number>,
 *     olimp: Array<number>,
 *     activitySphere: Array<number>,
 *     specializedClassType: Array<number>,
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
 *     subjects: Array<models.Subject>,
 *     schoolTypes: Array<models.SchoolTypeFilter>,
 *     egeSubjects: Array<models.EgeResult>,
 *     giaSubjects: Array<models.GiaResult>,
 *     olympiadSubjects: Array<models.OlimpResult>,
 *     activitySpheres: Array<models.AdditionalEducationSphere>,
 *     specializedClassesTypes: Array<models.SpecializedClassType>
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
        specializedClassesView.typeSearchFilter(
            filtersData.specializedClassesTypes),
        activityView.typeSearchFilter(filtersData.activitySpheres)
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
 * @param {Array.<{
 *     label: string,
 *     value: (string|number),
 *     id: (number|undefined)
 * }>} filters
 * @param {Array.<number>} checkedFilters -
 * array with id of currently checked
 * filters
 * @return {Array.<{
 *     label: string,
 *     value: string,
 *     isChecked: boolean
 * }>}
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
