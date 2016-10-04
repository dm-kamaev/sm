'use strict';

const FilterPanel = require('../lib/CourseFilterPanel'),
    courseView = require('./courseView'),
    mapViewType = require('../../entity/enums/mapViewType'),
    userView = require('../../user/views/user'),
    favoriteView = require('../../favorite/views/favoriteView');

let searchView = {};

/**
 * Data for filter panel
 * @param {Array<Object>} filtersData
 * @param {{
 *     age: Array<(string|number)>,
 *     course: Array<(string|number)>,
 *     cost: Array<(string|number)>,
 *     schedule: Array<(string|number)>,
 *     time: Array<(string|number)>,
 *     regularity: Array<(string|number)>,
 *     formTraining: Array<(string|number)>,
 *     duration: Array<(string|number)>
 * }} opt_searchParams
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
searchView.filterPanel = function(filtersData, opt_searchParams) {
    let searchParams = opt_searchParams || {};

    let filterPanel = new FilterPanel();

    filterPanel
        .setFilterAge(searchParams.age)
        .setFilterType(filtersData.type, searchParams.type)
        .setFilterCost(searchParams.cost)
        .setFilterWeekDays(searchParams.weekdays)
        .setFilterTime(searchParams.time)
        .setFilterRegularity(searchParams.regularity)
        .setFilterFormTraining(searchParams.formTraining)
        .setFilterDuration(searchParams.duration);

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
 *     user: Object,
 *     authSocialLinks: Object,
 *     countResults: number,
 *     coursesList: Array<Object>,
 *     mapData: Object<Object>,
 *     searchParams: Object,
 *     favorites: Object,
 *     filtersData: Array<Object>
 * }} data
 * @return {Object}
 */
searchView.render = function(data) {
    let user = userView.default(data.user),
        aliasedCourses = courseView.joinAliases(
            data.coursesList,
            data.aliases.course,
            data.aliases.brand
        ),
        courses = courseView.list(aliasedCourses);

    return {
        type: data.entityType,
        seo: {
            metaTitle: 'Кружки и секции'
        },
        subHeader: {
            logo: {
                imgUrl: '/images/n-common/b-sm-subheader/course-logo.svg'
            },
            links: {
                nameL: 'Все курсы, кружки и секции',
                nameM: 'Все курсы',
                url: '/proforientacija'
            },
            search: {
                placeholder: 'Район, метро, название курса'
            },
            user: user,
            favorites: {
                items: favoriteView.list(data.favorites)
            }
        },
        user: user,
        authSocialLinks: data.authSocialLinks,
        map: this.map(data.mapCourses, {
            viewType: mapViewType.PIN,
            position: data.mapPosition
        }),
        search: {
            countResults: data.countResults,
            searchText: data.searchParams.name,
            placeholder: 'Район, метро, название курса',
            declensionEntityType: {
                nom: 'курс',
                gen: 'курса',
                plu: 'курсов'
            }
        },
        sort: {
            listItems: [{
                'label': 'Средняя оценка',
                'text': 'средней оценке'
            }, {
                'label': 'Образование',
                'text': 'образованию'
            }, {
                'label': 'Преподаватели',
                'text': 'преподавателям'
            }, {
                'label': 'Атмосфера',
                'text': 'атмосфере'
            }, {
                'label': 'Инфраструктура',
                'text': 'инфраструктуре'
            }],
            staticText: 'Сортировать по ',
            defaultOpenerText: 'средней оценке'
        },
        entityList: {
            items: courses,
            itemType: 'smItemEntity'
        },
        filterPanel: searchView.filterPanel(
            data.filtersData,
            data.searchParams
        ),
        searchParams: data.searchParams
    };
};

/**
 * @param  {Object} params
 * @return {Object}
 */
searchView.initSearchParams = function(params) {
    return {
        page: params.page || 0,
        age: this.transformToArray(params.age),
        type: this.transformToArray(params.type),
        cost: this.transformToArray(params.cost),
        weekdays: this.transformToArray(params.weekdays),
        time: this.transformToArray(params.time),
        regularity: this.transformToArray(params.regularity),
        formTraining: this.transformToArray(params.formTraining),
        duration: this.transformToArray(params.duration),
        sortType: params.sortType,
        name: params.name,
        metroId: params.metroId || null,
        areaId: params.areaId || null,
        districtId: params.districtId || null
    };
};

/**
 * @param  {(number|string|undefined|Array)} value
 * @return {Array}
 */
searchView.transformToArray = function(value) {
    let result;
    if (value && ~value.indexOf(',')) {
        result = value.split(',');
    } else if (typeof value === 'number' || typeof value === 'string') {
        result = [value];
    } else if (Array.isArray(value)) {
        result = value;
    } else {
        result = [];
    }
    return result;
};

module.exports = searchView;
