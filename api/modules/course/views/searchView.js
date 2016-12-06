'use strict';

const FilterPanel = require('../lib/CourseFilterPanel'),
    courseView = require('./courseView'),
    mapViewType = require('../../entity/enums/mapViewType'),
    userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView'),
    courseCategoryView = require('./courseCategoryView');

const filterName = require('../enums/filterName');

let searchView = {};

/**
 * Data for filter panel
 * @param {{
 *     filtersData: Array<Object>,
 *     searchParams: {
 *         age: Array<(string|number)>,
 *         course: Array<(string|number)>,
 *         cost: Array<(string|number)>,
 *         schedule: Array<(string|number)>,
 *         time: Array<(string|number)>,
 *         regularity: Array<(string|number)>,
 *         formTraining: Array<(string|number)>,
 *         duration: Array<(string|number)>
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
 * View for courses on map
 * @param  {Array<Object>} courses
 * @param  {{
 *     viewType: string,
 *     position: {
 *         center: Array<number>,
 *         type: string
 *     }
 * }} options
 * @return {{
 *     itemGroups: Array<{
 *         viewType: string,
 *         items: Array<{Object}>
 *     }>,
 *     position: ({
 *         center: Array<number>,
 *         type: string
 *     }|undefined)
 * }}
 */
searchView.map = function(courses, options) {
    let viewType = options.viewType;
    return {
        itemGroups: [{
            viewType: viewType,
            items: courseView.listMap(courses, viewType)
        }],
        position: options.position
    };
};


/**
 * @param {{
 *     entityType: string,
 *     user: Object,
 *     fbClientId: string,
 *     favorites: Array<Object>,
 *     authSocialLinks: Object,
 *     countResults: number,
 *     coursesList: Array<Object>,
 *     mapCourses: Object<Object>,
 *     mapPosition: Object,
 *     searchParams: Object,
 *     filtersData: Array<Object>,
 *     aliases: Array<Object>,
 *     seoParams: Object,
 *     currentCategory: string,
 *     categories: Array<Object>,
 *     categoryAliases: Array<Object>
 * }} data
 * @return {Object}
 */
searchView.render = function(data) {
    let user = userView.default(data.user),
        aliasedCourses = courseView.joinAliases(
            data.coursesList, data.aliases
        ),
        courses = courseView.list(aliasedCourses, data.categories),
        seoParams = data.seoParams || {};

    return {
        type: data.entityType,
        seo: {
            metaTitle: seoParams.tabTitle,
            metaDescription: seoParams.metaDescription
        },
        openGraph: {
            title: seoParams.openGraphTitle,
            description: seoParams.openGraphDescription,
            image: '/static/images/n-clobl/i-layout/cources_sharing.png',
            relapTag: 'курсы мела',
            relapImage: '/static/images/n-clobl/i-layout/cources_sharing.png',
            fbClientId: data.fbClientId,
        },
        subHeader: {
            logo: {
                imgUrl: '/static/images/n-common/b-sm-subheader/course-logo.svg'
            },
            links: {
                nameL: 'Все курсы, кружки и секции',
                nameM: 'Все курсы',
                url: `/${data.currentCategory}`
            },
            search: {
                placeholder: 'Район, метро, название курса',
                pageAlias: data.currentCategory
            },
            user: user,
            favorites: {
                items: favoriteView.list(data.favorites)
            },
            listLinks: {
                opener: 'Все курсы',
                content: {
                    items: courseCategoryView.listLinks(
                        data.categories,
                        data.categoryAliases
                    )
                }
            }
        },
        user: user,
        authSocialLinks: data.authSocialLinks,
        map: this.map(data.mapCourses, {
            viewType: mapViewType.PIN,
            position: data.mapPosition
        }),
        search: {
            searchText: data.searchParams.name,
            placeholder: 'Район, метро, название курса',
            pageAlias: data.currentCategory
        },
        resultsList: {
            title: seoParams.listTitle,
            description: seoParams.text && seoParams.text[0] || null,
            countResults: data.countResults,
            searchText: data.searchParams.name,
            declensionEntityType: {
                nom: 'курс',
                gen: 'курса',
                plu: 'курсов'
            },
            sort: {
                opener: 'Сортировать ',
                defaultOpenerText: 'по популярности',
                content: {
                    items: [{
                        'label': 'по популярности',
                        'value': 2
                    }, {
                        'label': 'по возрастанию цены',
                        'value': 0
                    }, {
                        'label': 'по убыванию цены',
                        'value': 1
                    }]
                }
            },
            entityList: {
                items: courses,
                itemType: 'smItemEntity',
                itemConfig: {
                    enableCover: true
                }
            }
        },
        filterPanel: searchView.filterPanel({
            filtersData: data.filtersData,
            enabledFilters: data.enabledFilters,
            searchParams: data.searchParams
        }),
        searchParams: data.searchParams
    };
};

/**
 * @param  {Object} params
 * @param {number=} opt_categoryId
 * @return {Object}
 */
searchView.initSearchParams = function(params, opt_categoryId) {
    let categoryId = opt_categoryId || params.categoryId || '';
    return {
        [filterName.AGE]: this.transformToArray(params.age),
        [filterName.TYPE]: this.transformToArray(params.type),
        [filterName.COST]: this.transformToArray(params.cost),
        [filterName.WEEK_DAYS]: this.transformToArray(params.weekdays),
        [filterName.TIME]: this.transformToArray(params.time),
        [filterName.REGULARITY]: this.transformToArray(params.regularity),
        [filterName.FORM_TRAINING]: this.transformToArray(params.formTraining),
        [filterName.DURATION]: this.transformToArray(params.duration),
        page: params.page || 0,
        sortType: params.sortType,
        name: params.name,
        metroId: params.metroId || null,
        areaId: params.areaId || null,
        districtId: params.districtId || null,
        categoryId: this.transformToArray(categoryId)
    };
};

/**
 * @param  {(number|string|undefined|Array)} value
 * @return {Array}
 */
searchView.transformToArray = function(value) {
    let result = [];
    if (value) {
        switch (typeof value) {
        case 'number':
            result = searchView.transformNumberToArray(value);
            break;
        case 'string':
            result = searchView.transformStringToArray(value);
            break;
        case 'object':
            result = searchView.transformObjectToArray(value);
            break;
        }
    }
    return result;
};

/**
 * Transform string to array
 * @param {string} value
 * @return {Array<string>}
 */
searchView.transformStringToArray = function(value) {
    let result;
    if (~value.indexOf(',')) {
        result = value.split(',');
    } else {
        result = [value];
    }
    return result;
};

/**
 * Transform number to array
 * @param {number} value
 * @return {Array<number>}
 */
searchView.transformNumberToArray = function(value) {
    return [value];
};

/**
 * Transform object to array
 * @param {Object|Array} value
 * @return {Array}
 */
searchView.transformObjectToArray = function(value) {
    let result = [];
    if (Array.isArray(value)) {
        result = value;
    }
    return result;
};

module.exports = searchView;
