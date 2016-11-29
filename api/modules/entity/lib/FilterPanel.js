'use strict';

const lodash = require('lodash');

const filterType = require('../enums/filterViewType');

class FilterPanel {

    /**
     * Init params for filter panel
     */
    constructor() {
        /**
         * Params all filters
         * @type {Array<{
         *     data: Object,
         *     config: Object
         * }>}
         * @protected
         */
        this.filters = [];


        /**
         * Params for filter by days of week
         * @type {Object}
         * @protected
         */
        this.filterWeekDays = {};


        /**
         * Options params for filter week days
         * @type {Object}
         * @protected
         */
        this.optionsWeekDays = [{
            'label': 'Пн'
        }, {
            'label': 'Вт'
        }, {
            'label': 'Ср'
        }, {
            'label': 'Чт'
        }, {
            'label': 'Пт'
        }, {
            'label': 'Сб'
        }, {
            'label': 'Вс'
        }];
    }


    /**
     * Initialize filter panel with given data
     * @param {{
     *     enabledFilters: (Array<string>|undefined),
     *     filtersData: Array<Object>,
     *     searchParams: Object<string, Array<string, number>>
     * }} data
     * @public
     */
    init(data) {
        let enabledFilters = data.enabledFilters || this.defaultFilters;
        let filtersData = data.filtersData || {};
        let searchParams = data.searchParams || {};

        enabledFilters.forEach((filterName) => {
            let filterDataValues = filtersData[filterName];
            let checkedValues = searchParams[filterName];

            this.initFilter({
                filterName: filterName,
                dataValues: filterDataValues,
                checkedValues: checkedValues
            });
        });
    }


    /**
     * Get filter panel params
     * @return {{
     *     data: {
     *         filters: Array<{
     *             data: Object,
     *             config: Object
     *         }>
     *     },
     *     config: {
     *         hasCheckedFilters: boolean
     *     }
     * }}
     */
    getParams() {
        return {
            data: {
                filters: this.filters
            },
            config: {
                hasCheckedFilters: this.getHasCheckedFilters(this.filters)
            }
        };
    }


    /**
     * Set filter for days of week
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterWeekDays(opt_checkedValues) {
        var params = this.filterWeekDays;

        params.data.options = this.createOptionsValuesInOrder(
            this.optionsWeekDays
        );

        this.setFilterAlignedHorizontal(params, opt_checkedValues);

        return this;
    }


    /**
     * Set params for filter with modal
     * @param {{
     *     data: Object,
     *     config: Object
     * }} filterParams
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterModal(filterParams, opt_checkedValues) {
        var params = filterParams;

        params.config.type = 'extended';

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set params for filter aligned horizontally
     * @param {{
     *     data: Object,
     *     config: Object
     * }} filterParams
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterAlignedHorizontal(filterParams, opt_checkedValues) {
        var params = filterParams;

        params.config.align = 'horizontal';
        params.config.optionsToShow = (
            params.config.optionsToShow || params.data.options.length
        );

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set params for filter with options-inputs
     * @param {{
     *     data: Object,
     *     config: Object
     * }} filterParams
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterInput(filterParams, opt_checkedValues) {
        var params = filterParams;

        params.config.type = filterType.INPUT;

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set params for filter with options-radiobuttons
     * @param {{
     *     data: Object,
     *     config: Object
     * }} filterParams
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterSwitch(filterParams, opt_checkedValues) {
        var params = filterParams;

        params.config.type = filterType.SWITCH;

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set params for filter with options-labels
     * @param {{
     *     data: Object,
     *     config: Object
     * }} filterParams
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterLabels(filterParams, opt_checkedValues) {
        var params = filterParams;

        params.config.type = filterType.LABELS;

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Adds new filter params in array of filters for filter panel
     * @param {{
     *     data: {
     *         name: string,
     *         header: ?Object,
     *         options: Array<Object>
     *     },
     *     config: Object
     * }} filterParams
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilter(filterParams, opt_checkedValues) {
        var params = this.updateFilterParams(
            filterParams,
            opt_checkedValues
        );

        this.filters.push(params);

        return this;
    }


    /**
     * Must be  overriden in heirs
     * @return {Object<string, Function>}
     */
    get filterInitializers() {
        return {};
    }

    /**
     * Return array of default filter names
     * Must be  overriden in heirs
     * @return {Array<string>}
     */
    get defaultFilters() {
        return [];
    }


    /**
     * Determines is expanded filter panel
     * @param {Array<{
     *     data: Object,
     *     config: Object
     * }>} filters
     * @return {boolean}
     * @protected
     */
    getHasCheckedFilters(filters) {
        return filters.some(filter => {
            return filter.data.options.some(option => option.isChecked);
        });
    }


    /**
     * Update filter data and filter config
     * @param {{
     *     data: {
     *         name: string,
     *         header: ?Object,
     *         options: Array<Object>
     *     },
     *     config: Object
     * }} filterParams
     * @param {Array<string>=} opt_checkedValues
     * @return {Object}
     * @protected
     */
    updateFilterParams(filterParams, opt_checkedValues) {
        var params = filterParams;

        params.data.options = this.updateOptionsIsChecked(
            filterParams.data.options,
            opt_checkedValues
        );

        params.config = this.updateFilterConfigIsShowed(
            filterParams,
            opt_checkedValues
        );

        return params;
    }


    /**
     * Set filter config field isShowed true if is checked values
     * @param {{
     *     data: {
     *         name: string,
     *         header: ?Object,
     *         options: Array<Object>
     *     },
     *     config: Object
     * }} filterParams
     * @param {Array<(number|string)>|undefined} checkedValues
     * @return {Object}
     * @protected
     */
    updateFilterConfigIsShowed(filterParams, checkedValues) {
        var data = filterParams.data,
            config = filterParams.config;

        if (data.options.some(option => option.isChecked)) {
            config.isShowed = true;
        } else if (checkedValues && checkedValues.length) {
            config.isShowed = true;
        }

        return config;
    }


    /**
     * Set options field isChecked true
     * @param {Array<{
     *     label: string,
     *     value: (number|string)
     * }>} options
     * @param {Array<(number|string)>|undefined} checkedValues
     * @return {Array<{
     *    label: string,
     *    value: (number|string),
     *    isChecked: (boolean|undefined)
     * }>}
     * @protected
     */
    updateOptionsIsChecked(options, checkedValues) {
        var values = checkedValues || [];

        return options.map(option => {
            if (values.some(value => option.value == value)) {
                option.isChecked = true;
            }
            return option;
        });
    }


    /**
     * Set values for options in order
     * It uses lodash.map as it can iterate over Arrays which create from Array
     * constructor with defined length
     * @param {Array<{
     *     label: string,
     *     isChecked: (boolean|undefined)
     * }>} options
     * @return {Array<{
     *     label: string,
     *     value: number,
     *     isChecked: (boolean|undefined)
     * }>}
     * @protected
     */
    createOptionsValuesInOrder(options) {
        return lodash.map(options, (option, index) => {
            let result = option || {};
            result.value = index;
            return result;
        });
    }

    /**
     * Transform array of models to options
     * @param {Array<{
     *     id: number,
     *     name: string
     * }>} models
     * @return {Array<{
     *     value: number,
     *     label: string
     * }>}
     * @protected
     */
    getOptions(models) {
        return models.map(this.getOption, this);
    }

    /**
     * Create option from model
     * @param {Object} model
     * @return {{
     *     value: number,
     *     label: string
     * }}
     * @protected
     */
    getOption(model) {
        return {
            value: model.id,
            label: this.getLabel(model)
        };
    }

    /**
     * Get label for option from model instance
     * @param {Object} model
     * @return {string}
     * @protected
     */
    getLabel(model) {
        return model.name;
    }



    /**
     * Init filter
     * @param {{
     *     filterName: string,
     *     dataValues: Array<Object>,
     *     checkedValues: Array<(string|number)>
     * }} data
     * @protected
     */
    initFilter(data) {
        let name = data.filterName,
            dataValues = data.dataValues,
            checkedValues = data.checkedValues,
            initFunction = this.filterInitializers[name];

        if (initFunction) {
            if (dataValues) {
                initFunction(dataValues, checkedValues);
            } else {
                initFunction(checkedValues);
            }
        }
    }
}

module.exports = FilterPanel;
