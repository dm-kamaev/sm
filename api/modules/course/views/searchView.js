var FilterPanel = require('../lib/CourseFilterPanel');
const courseView = require('./courseView');
const mapViewType = require('../../entity/enums/mapViewType');

var searchView = {};

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
    var searchParams = opt_searchParams || {};

    var options = [{
        'label': 'Подготовка к ЕГЭ по русскому языку',
        'value': '1'
    }, {
        'label': 'Подготовка к ЕГЭ по математике',
        'value': '2'
    }, {
        'label': 'Подготовка к ОГЭ по русскому языку',
        'value': '3'
    }, {
        'label': 'Подготовка к ОГЭ по математике',
        'value': '4'
    }, {
        'label': 'Игра на фортепиано',
        'value': '5'
    }, {
        'label': 'Русский язык',
        'value': '6'
    }, {
        'label': 'Математика',
        'value': '7'
    }];

    var filterPanel = new FilterPanel();

    filterPanel
        .setFilterAge(searchParams.age)
        .setFilterCourse(options, searchParams.course)
        .setFilterCost(searchParams.cost)
        .setFilterWeekDays(searchParams.schedule)
        .setFilterTime(searchParams.time)
        .setFilterRegularity(searchParams.regularity)
        .setFilterFormTraining(searchParams.formTraining)
        .setFilterDuration(searchParams.duration);

    return filterPanel.getParams();
};


/**
 * View for courses on map
 * @param  {Array<Object>} courses
 * @param  {string} viewType
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
searchView.map = function(courses, viewType) {
    return {
        itemGroups: [{
            viewType: viewType,
            items: courseView.listMap(courses, viewType)
        }],
        position: {}
    };
};

/**
 * @param {{
 *     user: Object,
 *     authSocialLinks: Object,
 *     countResults: number,
 *     coursesList: Array<Object>,
 *     mapData: Object<Object>,
 *     searchParams: Object
 * }} data
 * @return {Object}
 */
searchView.render = function(data) {
    return {
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
                url: '/'
            },
            search: {
                placeholder: 'Район, метро, название курса'
            },
            user: data.user,
            favorites: []
        },
        user: data.user,
        authSocialLinks: data.authSocialLinks,
        map: this.map(data.mapCourses, mapViewType.PIN),
        search: {
            countResults: data.countResults,
            searchText: '',
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
            items: courseView.list(data.coursesList),
            itemType: 'smItemEntity'
        },
        filterPanel: searchView.filterPanel(null, data.searchParams),
        searchParams: data.searchParams
    };
};

/**
 * @param  {Object} params
 * @return {Object}
 */
searchView.initSearchParams = function(params) {
    return {
        age: this.transformToArray(params.age),
        cost: this.transformToArray(params.cost),
        weekdays: this.transformToArray(params.weekdays),
        time: this.transformToArray(params.time),
        regularity: this.transformToArray(params.regularity),
        formTraining: this.transformToArray(params.formTraining),
        duration: this.transformToArray(params.duration)
    };
};

/**
 * @param  {(number|string|undefined|Array)} value
 * @return {Array}
 */
searchView.transformToArray = function(value) {
    var result;
    if (typeof value === 'number' || typeof value === 'string') {
        result = [value];
    } else if (Array.isArray(value)) {
        result = value;
    } else {
        result = [];
    }
    return result;
};

module.exports = searchView;
