var FilterPanel = require('../lib/CourseFilterPanel');

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
        map: data.mapData,
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
            items: data.coursesList,
            itemType: 'smItemEntity'
        },
        filterPanel: searchView.filterPanel(null, data.searchParams),
        searchParams: data.searchParams
    };
};

module.exports = searchView;
