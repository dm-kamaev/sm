'use strict';

const filterName = require('../enums/filterName');

const FilterPanel = require('../../entity/lib/FilterPanel');

class CourseFilterPanel extends FilterPanel {

    /**
     * Init params for filter panel
     */
    constructor() {
        super();

        /**
         * Params for filter by days of week
         * @type {Object}
         * @override
         * @protected
         */
        this.filterWeekDays = {
            data: {
                header: {
                    title: 'Расписание'
                },
                name: 'weekdays'
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by age
         * @type {Object}
         * @private
         */
        this.filterAge_ = {
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
                isShowed: true
            }
        };

        /**
         * Params for filter by course
         * @type {Object}
         * @private
         */
        this.filterType_ = {
            data: {
                header: {
                    title: 'Направления занятий'
                },
                name: 'type',
                options: []
            },
            config: {
                showMoreButtonText: 'Все направления',
                optionsToShow: 9,
                isShowed: true
            }
        };

        /**
         * Params for filter by cost
         * @type {Object}
         * @private
         */
        this.filterCost_ = {
            data: {
                header: {
                    title: 'Стоимость'
                },
                name: 'cost',
                options: [{
                    'label': 'Бесплатно'
                }, {
                    'label': 'До 1 000 руб'
                }, {
                    'label': 'От 1 000 до 2 000 руб'
                }, {
                    'label': 'От 2 000 руб'
                }, {
                    'label': 'Скрыть, если не указана цена'
                }]
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by time
         * @type {Object}
         * @private
         */
        this.filterTime_ = {
            data: {
                header: {
                    title: 'Время занятий'
                },
                name: 'time',
                options: [{
                    'label': 'Утром (до 14:00)'
                }, {
                    'label': 'Днём (14:00 - 18:00)'
                }, {
                    'label': 'Вечером (18:00 и позже)'
                }, {
                    'label': 'Скрыть, если не указано расписание'
                }]
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by regularity
         * @type {Object}
         * @private
         */
        this.filterRegularity_ = {
            data: {
                header: {
                    title: 'Регулярность занятий'
                },
                name: 'regularity',
                options: [{
                    'label': 'Раз в неделю'
                }, {
                    'label': 'Два раза в неделю'
                }, {
                    'label': 'Чаще двух раз в неделю'
                }, {
                    'label': 'Скрыть, если не указана регулярность'
                }]
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by form training
         * @type {Object}
         * @private
         */
        this.filterFormTraining_ = {
            data: {
                header: {
                    title: 'Форма занятий'
                },
                name: 'formTraining',
                options: [{
                    'label': 'Очная индивидуальная'
                }, {
                    'label': 'Очная групповая'
                }, {
                    'label': 'Онлайн'
                }]
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by duration
         * @type {Object}
         * @private
         */
        this.filterDuration_ = {
            data: {
                header: {
                    title: 'Продолжительность занятий'
                },
                name: 'duration',
                options: [{
                    'label': 'До 1 часа'
                }, {
                    'label': '1-2 часа'
                }, {
                    'label': 'более двух часов'
                }]
            },
            config: {
                isShowed: true
            }
        };
    }


    /**
     * Must be  overriden in heirs
     * @return {Object<string, Function>}
     * @override
     */
    get filterInitializers() {
        return {
            [filterName.AGE]: this.setFilterAge.bind(this),
            [filterName.COST]: this.setFilterCost.bind(this),
            [filterName.TYPE]: this.setFilterType.bind(this),
            [filterName.WEEK_DAYS]: this.setFilterWeekDays.bind(this),
            [filterName.TIME]: this.setFilterTime.bind(this),
            [filterName.REGULARITY]: this.setFilterRegularity.bind(this),
            [filterName.FORM_TRAINING]: this.setFilterFormTraining.bind(this),
            [filterName.DURATION]: this.setFilterDuration.bind(this)
        };
    }

    /**
     * Return array of default filter names
     * @return {Array<string>}
     * @override
     */
    get defaultFilters() {
        return [filterName.FORM_TRAINING, filterName.TYPE, filterName.AGE];
    }

    /**
     * Set filter for days of age
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterAge(opt_checkedValues) {
        var params = this.filterAge_;

        params.data.options = this.updateFilterAgeValue(
            this.filterAge_.data.options,
            opt_checkedValues
        );

        this.setFilterInput(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for days of course
     * @param {Array<Object>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterType(options, opt_checkedValues) {
        var params = this.filterType_;
        params.data.options = this.formatType_(options);

        this.setFilterModal(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for days of Cost
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterCost(opt_checkedValues) {
        var params = this.filterCost_;

        params.data.options = this.createOptionsValuesInOrder(
            this.filterCost_.data.options
        );

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for days of Time
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterTime(opt_checkedValues) {
        var params = this.filterTime_;

        params.data.options = this.createOptionsValuesInOrder(
            this.filterTime_.data.options
        );

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for days of Regularity
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterRegularity(opt_checkedValues) {
        var params = this.filterRegularity_;

        params.data.options = this.createOptionsValuesInOrder(
            this.filterRegularity_.data.options
        );

        this.setFilter(params, opt_checkedValues);

        return this;
    }

    /**
     * Set filter for days of Form Training
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterFormTraining(opt_checkedValues) {
        var params = this.filterFormTraining_;

        params.data.options = this.createOptionsValuesInOrder(
            this.filterFormTraining_.data.options
        );

        this.setFilter(params, opt_checkedValues);


        return this;
    }

    /**
     * Set filter for days of Duration
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterDuration(opt_checkedValues) {
        var params = this.filterDuration_;

        params.data.options = this.createOptionsValuesInOrder(
            this.filterDuration_.data.options
        );

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set value for filter age
     * @param {Array<{
     *     value: ?(number|string)
     * }>} filterOptions
     * @param {Array<(number|string)>} values
     * @return {Array<Object>}
     * @protected
     */
    updateFilterAgeValue(filterOptions, values) {
        var options = filterOptions;

        options[0].value = (values && values[0]) ? values[0] : '';

        return options;
    }

    /**
     * @private
     * @param {Array<Object>} types
     * @return {Array<Object>}
     */
    formatType_(types) {
        return types.map(type => ({
            value: type.id,
            label: type.name
        }));
    }
}

module.exports = CourseFilterPanel;
