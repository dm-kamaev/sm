var searchView = {};

/**
 * Data for filter panel
 * @param {Array<Object>} filtersData
 * @param {{
 *     age: Array<number>,
 *     course: Array<string>,
 *     cost: Array<string>,
 *     schedule: Array<string>,
 *     time: Array<string>,
 *     regularity: Array<string>,
 *     formTraining: Array<string>,
 *     duration: Array<string>
 * }} searchParams
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
searchView.filterPanel = function(filtersData, searchParams) {
    var filters = searchView.filters(filtersData, searchParams);

    return {
        data: {
            filters: filters
        },
        config: {
            hasCheckedFilters: ''
        }
    };
};


/**
 * Generate filters (filters and selected options filters) for course
 * @param {Array<Object>} filtersData
 * @param {{
 *     age: Array<number>,
 *     course: Array<string>,
 *     cost: Array<string>,
 *     schedule: Array<string>,
 *     time: Array<string>,
 *     regularity: Array<string>,
 *     formTraining: Array<string>,
 *     duration: Array<string>
 * }} searchParams
 * @return {
 *     Array<{
 *         data: {
 *             header: {
 *                 title: (string|undefined),
 *                 tooltip: (string|undefined)
 *             },
 *             name: string,
 *             options: Array<({
 *                 label: string,
 *                 value: string,
 *                 isChecked: boolean
 *               }|{
 *                 title: (string|undefined),
 *                 value: (number|undefined),
 *                 placeholder: (string|undefined),
 *                 maxLength: (number|undefined)
 *             })>
 *         },
 *         config: {
 *             type: (string|undefined),
 *             optionsToShow: (boolean|undefined),
 *             cannotBeHidden: (boolean|undefined),
 *             isShowed: (boolean|undefined),
 *             showMoreButtonText: (number|undefined),
 *             theme: (string|undefined),
 *             align: (string|undefined)
 *         }
 *     }>
 * }
 */
searchView.filters = function(filtersData, searchParams) {
    /** here makes order of filters in left menu **/
    var filters = [];

    filters.push(
        filterAge(),
        filterCourse(),
        filterCost(),
        filterSchedule(),
        filterTime(),
        filterRegularity(),
        filterFormTraining(),
        filterDuration()
    );

    return filters;
};


/**
 * Filter for selection courses by age
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             title: (string|undefined),
 *             value: (number|undefined),
 *             placeholder: (string|undefined),
 *             maxLength: (number|undefined)
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterAge = function() {
    return {
        data: {
            header: {
                title: 'Возраст'
            },
            name: 'age',
            options: [
                {
                    'title': 'лет',
                    'value': '',
                    'maxLength': 2
                }
            ]
        },
        config: {
            type: 'input'
        }
    };
};


/**
 * Filter to select courses
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterCourse = function() {
    var options = [
        {
            'label': 'Подготовка к ЕГЭ по русскому языку',
            'value': '',
            'isChecked': false
        },
        {
            'label': 'Подготовка к ЕГЭ по математике',
            'value': '',
            'isChecked': false
        },
        {
            'label': 'Подготовка к ОГЭ по русскому языку',
            'value': '',
            'isChecked': false
        },
        {
            'label': 'Подготовка к ОГЭ по математике',
            'value': '',
            'isChecked': false
        },
        {
            'label': 'Игра на фортепиано',
            'value': '',
            'isChecked': false
        },
        {
            'label': 'Русский язык',
            'value': '',
            'isChecked': false
        },
        {
            'label': 'Математика',
            'value': '',
            'isChecked': false
        }
    ];

    return {
        data: {
            header: {
                title: 'Направления занятий'
            },
            name: 'course',
            options: options
        },
        config: {
            type: 'extended',
            showMoreButtonText: 'Все направления'
        }
    };
};


/**
 * Filter to select courses cost
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterCost = function() {
    return {
        data: {
            header: {
                title: 'Стоимость'
            },
            name: 'cost',
            options: [
                {
                    'label': 'Бесплатно',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'До 1 000 руб',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'От 1 000 до 2 000 руб',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'От 2 000 руб',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Скрыть, если не указана цена',
                    'value': '',
                    'isChecked': false
                }
            ]
        },
        config: {
        }
    };
};


/**
 * Filter to select courses schedule
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterSchedule = function() {
    return {
        data: {
            header: {
                title: 'Расписание'
            },
            name: 'schedule',
            options: [
                {
                    'label': 'Пн',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Вт',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Ср',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Чт',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Пт',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Сб',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Вс',
                    'value': '',
                    'isChecked': false
                }
            ]
        },
        config: {
            align: 'horizontal',
            optionsToShow: 7
        }
    };
};


/**
 * Filter to select courses time
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterTime = function() {
    return {
        data: {
            header: {
                title: 'Время занятий'
            },
            name: 'time',
            options: [
                {
                    'label': 'Утром (до 14:00)',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Днём (14:00 - 18:00)',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Вечером (18:00 и позже)',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Скрыть, если не указано расписание',
                    'value': '',
                    'isChecked': false
                }
            ]
        },
        config: {
        }
    };
};


/**
 * Filter to select the regularity of training courses
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterRegularity = function() {
    return {
        data: {
            header: {
                title: 'Регулярность занятий'
            },
            name: 'regularity',
            options: [
                {
                    'label': 'Раз в неделю',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Два раза в неделю',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Чаще двух раз в неделю',
                    'value': '',
                    'isChecked': false
                },
                {
                    'label': 'Скрыть, если не указана регулярность',
                    'value': '',
                    'isChecked': false
                }
            ]
        },
        config: {
        }
    };
};


/**
 * Filter to select the form of training courses
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterFormTraining = function() {
    return {
        data: {
            header: {
                title: 'Форма занятий'
            },
            name: 'formTraining',
            options: [
                {
                    'label': 'Очная индивидуальная',
                    'value': 'individual',
                    'isChecked': false
                },
                {
                    'label': 'Очная групповая',
                    'value': 'group',
                    'isChecked': false
                },
                {
                    'label': 'Онлайн',
                    'value': 'online',
                    'isChecked': false
                }
            ]
        },
        config: {
        }
    };
};


/**
 * Filter to select the duration of lesson
 * @return {{
 *     data: {
 *         header: {
 *             title: (string|undefined),
 *             tooltip: (string|undefined)
 *         },
 *         name: string,
 *         options: Array<{
 *             label: string,
 *             value: string,
 *             isChecked: boolean
 *         }>
 *     },
 *     config: {
 *         type: (string|undefined),
 *         optionsToShow: (boolean|undefined),
 *         cannotBeHidden: (boolean|undefined),
 *         isShowed: (boolean|undefined),
 *         showMoreButtonText: (number|undefined),
 *         theme: (string|undefined),
 *         align: (string|undefined)
 *     }
 * }}
 */
var filterDuration = function() {
    return {
        data: {
            header: {
                title: 'Продолжительность занятий'
            },
            name: 'duration',
            options: [
                {
                    'label': 'До 1 часа',
                    'value': 0,
                    'isChecked': false
                },
                {
                    'label': '1-2 часа',
                    'value': 1,
                    'isChecked': false
                },
                {
                    'label': 'более двух часов',
                    'value': 2,
                    'isChecked': false
                }
            ]
        },
        config: {
        }
    };
};

module.exports = searchView;
