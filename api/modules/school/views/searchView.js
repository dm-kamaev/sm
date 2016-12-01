'use strict';
const lodash = require('lodash');

const olympResultView = require('../../study/views/olimpResultView'),
    egeResultView = require('../../study/views/egeResultView'),
    giaResultView = require('../../study/views/giaResultView'),
    subjectView = require('../../study/views/subjectView'),
    activityView = require('./activityView'),
    specializedClassesView = require('./specializedClassesView'),
    userView = require('../../user/views/user'),
    schoolView = require('./schoolView');

const FilterPanel = require('../lib/SchoolFilterPanel');

const searchViewEntity = require('../../entity/views/searchView');

const filterName = require('../enums/filterName'),
    mapViewType = require('../../entity/enums/mapViewType'),
    entityType = require('../../entity/enums/entityType'),
    searchTypeEnum = require('../enums/searchType');

const FormatUtils = require('../../entity/lib/FormatUtils');

const DEFAULT_META_DESCRIPTION = 'Интерактивная карта Москвы с полной' +
    'информацией о всех образовательных учреждениях города Москвы. ' +
    'Список школ, лицеев и гимназий. Отзывы родителей и выпускников.';
const DEFAULT_TITLE = 'Школы Москвы на карте. ' +
    'Список школ Москвы с возможностью выбора по параметрам. ' +
    'Школы Мела.';

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

    let rawFiltersData = data.filtersData;
    let filtersData = {
        [filterName.SCHOOL_TYPE]: rawFiltersData.schoolTypes,
        [filterName.OLYMPIAD]: subjectView.getSubjects(
            rawFiltersData.olympiadSubjects, rawFiltersData.subjects
        ),
        [filterName.EGE]: egeResultView.getFilterData(rawFiltersData),
        [filterName.GIA]: giaResultView.getFilterData(rawFiltersData),
        [filterName.ACTIVITY_SPHERE]: rawFiltersData.activitySpheres,
        [filterName.SPECIALIZED_CLASS_TYPE]:
            rawFiltersData.specializedClassesTypes
    };

    return {
        seo: {
            metaTitle: seoParams.title || DEFAULT_TITLE,
            metaDescription:
                seoParams.metaDescription || DEFAULT_META_DESCRIPTION,
            textLeft: seoParams.textLeft,
            textRight: seoParams.textRight
        },
        openGraph: {
            title: 'Школы «Мела»',
            description:
                'Найдите в Москве школу, которая подойдёт вашему ребёнку',
            image: '/static/images/n-clobl/i-layout/schools_sharing.png',
            relapTag: 'школы мела',
            relapImage: '/static/images/n-clobl/i-layout/schools_sharing.png',
            fbClientId: data.fbClientId,
        },
        subHeader: {
            logo: {
                altText: '«Школы Мела»',
                linkUrl: '/',
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
            title: seoParams.title,
            description: seoParams.description,
            linksTitle: seoParams.linksTitle,
            links: seoParams.links,
            countResults: data.countResults,
            searchText: data.searchParams.name,
            declensionEntityType: {
                nom: 'школа',
                gen: 'школы',
                plu: 'школ'
            },
            sort: {
                opener: 'Сортировать ',
                defaultOpenerText: 'по средней оценке',
                content: {
                    items: [{
                        label: 'по средней оценке',
                        value: 0
                    }, {
                        label: 'по образованию',
                        value: 1
                    }, {
                        label: 'по преподавателям',
                        value: 2
                    }, {
                        label: 'по атмосфере',
                        value: 3
                    }, {
                        label: 'по инфраструктуре',
                        value: 4
                    }]
                }
            },
            entityList: {
                items: schoolView.list(aliasedSchools),
                itemType: 'smItemEntity'
            }
        },
        filterPanel: searchView.filterPanel({
            filtersData: filtersData,
            searchParams: data.searchParams
        }),
        searchParams: data.searchParams,
        footer: {
            seoLinks: data.seoLinks
        }
    };
};


/**
 * Normalize query params to search params
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
        [filterName.OLYMPIAD]: formatUtils.transformToArray(params.olimp),
        [filterName.SPECIALIZED_CLASS_TYPE]:
            formatUtils.transformToArray(params.specializedClassType),
        [filterName.ACTIVITY_SPHERE]:
            formatUtils.transformToArray(params.activitySphere),
        page: params.page || 0,
        sortType: params.sortType,
        name: params.name || '',
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
    let filterPanel = new FilterPanel();
    filterPanel.init(data);

    return filterPanel.getParams();
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
