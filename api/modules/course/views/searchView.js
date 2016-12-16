'use strict';

const FilterPanel = require('../lib/CourseFilterPanel'),
    Header = require('../../entity/lib/Header'),
    FormatUtils = require('../../entity/lib/FormatUtils'),
    Subheader = require('../lib/CourseSubheader');

const courseView = require('./courseView'),
    userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView'),
    courseCategoryView = require('./courseCategoryView'),
    searchViewEntity = require('../../entity/views/searchView'),
    footerView = require('../../entity/views/footerView');

const filterName = require('../enums/filterName'),
    mapViewType = require('../../entity/enums/mapViewType'),
    entityType = require('../../entity/enums/entityType');

const COMMON_PAGE_ALIAS = 'search';

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
 * @param {{
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
 *     categoryAliases: Array<Object>,
 *     header: Object
 * }} data
 * @return {Object}
 */
searchView.render = function(data) {
    let user = userView.default(data.user),
        aliasedCourses = courseView.joinAliases(
            data.coursesList, data.aliases
        ),
        courses = courseView.list(aliasedCourses),
        seoParams = data.seoParams || {};

    return {
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
        header: data.header,
        subHeader: searchView.subheader({
            listLinks: courseCategoryView.listLinks(
                data.categories,
                data.categoryAliases
            ),
            favoriteEntities: favoriteView.list(data.favorites),
            user: user
        }),
        user: user,
        authSocialLinks: data.authSocialLinks,
        map: searchViewEntity.map(data.mapCourses, {
            entityType: entityType.COURSE,
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
                itemType: 'smItemEntity'
            }
        },
        filterPanel: searchView.filterPanel({
            filtersData: data.filtersData,
            enabledFilters: data.enabledFilters,
            searchParams: data.searchParams
        }),
        searchParams: data.searchParams,
        footer: footerView.render()
    };
};

/**
 * Normalize query params to search params
 * @param  {Object} params
 * @param {number=} opt_categoryId
 * @return {Object}
 */
searchView.initSearchParams = function(params, opt_categoryId) {
    let categoryId = opt_categoryId || params.categoryId || '';
    let formatUtils = new FormatUtils();

    return {
        [filterName.AGE]: formatUtils.transformToArray(params.age),
        [filterName.TYPE]: formatUtils.transformToArray(params.type),
        [filterName.COST]: formatUtils.transformToArray(params.cost),
        [filterName.WEEK_DAYS]: formatUtils.transformToArray(params.weekdays),
        [filterName.TIME]: formatUtils.transformToArray(params.time),
        [filterName.REGULARITY]:
            formatUtils.transformToArray(params.regularity),
        [filterName.FORM_TRAINING]:
            formatUtils.transformToArray(params.formTraining),
        [filterName.DURATION]: formatUtils.transformToArray(params.duration),
        page: params.page || 0,
        sortType: params.sortType,
        name: params.name,
        metroId: params.metroId || null,
        areaId: params.areaId || null,
        districtId: params.districtId || null,
        categoryId: formatUtils.transformToArray(categoryId)
    };
};

/**
 * @param {string} entityType
 * @param {Object<string, string>} links
 * @return {Object}
 */
searchView.header = function(entityType, links) {
    let header = new Header();

    header.init({
        entityType: entityType,
        entityLinks: links
    });

    return header.getParams();
};


/**
 * @param {Object<string, string>} data
 * @return {Object}
 */
searchView.subheader = function(data) {
    let subheader = new Subheader();

    subheader.init({
        isLogoRedirect: true,
        contacts: Header.CONTACTS,
        listLinks: data.listLinks,
        isSearchRedirect: data.pageAlias != COMMON_PAGE_ALIAS,
        user: data.user,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });
    return subheader.getParams();
};

module.exports = searchView;
