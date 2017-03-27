/**
 * @fileOverview Frontick view for school search page layout
 */
'use strict';

const egeResultView = require('../../study/views/egeResultView'),
    giaResultView = require('../../study/views/giaResultView'),
    subjectView = require('../../study/views/subjectView'),
    userView = require('../../user/views/user').userView,
    schoolView = require('./schoolView');

const FilterPanel = require('../lib/SchoolFilterPanel'),
    Subheader = require('../lib/SchoolSubheader');

const searchViewEntity = require('../../entity/views/searchView'),
    favoriteView = require('../../favorite/views/favoriteView'),
    footerView = require('../../entity/views/footerView'),
    headerView = require('../../entity/views/headerView'),
    sideMenuView = require(
        '../../../../app/modules/common/views/sideMenuView'
    ).sideMenuView;

const filterName = require('../enums/filterName'),
    mapViewType = require('../../entity/enums/mapViewType'),
    entityType = require('../../entity/enums/entityType');

const FormatUtils = require('../../entity/lib/FormatUtils');

const DEFAULT_META_DESCRIPTION = 'Интерактивная карта Москвы с полной' +
    'информацией о всех образовательных учреждениях города Москвы. ' +
    'Список школ, лицеев и гимназий. Отзывы родителей и выпускников.';
const DEFAULT_TITLE = 'Школы Москвы на карте. ' +
    'Список школ Москвы с возможностью выбора по параметрам. ' +
    'Школы Мела.';

const PAGE_ALIAS = 'school';

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
    let user = userView.renderDefault(data.user),
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
        header: headerView.render(data.config, data.entityType, user),
        sideMenu: sideMenuView.render({
            config: data.config,
            user: user,
            entityType: data.entityType
        }),
        subHeader: searchView.subheader({
            favoriteEntities: favoriteView.list(data.favorites)
        }),
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
            pageAlias: PAGE_ALIAS
        },
        resultsList: {
            title: seoParams.title,
            description: seoParams.description,
            linksTitle: seoParams.linksTitle,
            links: seoParams.links,
            countResults: data.countResults,
            searchText: data.searchParams.name,
            declensionEntityType: {
                nom: 'школу',
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
        footer: footerView.render(data.seoLinks)
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
 * @param {Object<string, string>} data
 * @return {Object}
 */
searchView.subheader = function(data) {
    let subheader = new Subheader();

    return subheader.render({
        isLogoRedirect: true,
        isSearchRedirect: false,
        favoriteEntities: data.favoriteEntities,
        isBottomLine: true
    });
};

module.exports = searchView;
