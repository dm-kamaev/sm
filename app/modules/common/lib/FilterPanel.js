"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require('lodash').lodash;
const filterType_1 = require("../constants/filterType");
class FilterPanel {
    constructor() {
        this.filters = [];
        this.optionsWeekDays = [
            {
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
            }
        ];
    }
    /**
     * Must be overriden in heirs
     */
    get filterInitializers() {
        return {};
    }
    /**
     * Return array of default filter names
     * Must be  overriden in heirs
     */
    get defaultFilters() {
        return [];
    }
    render(data) {
        this.setData(data);
        this.initFilters(data);
        this.setButton(data.button);
        this.setConfig(data);
        return this.getParams();
    }
    setConfig(data) {
        this.config = {
            theme: data.theme,
            hasCheckedFilters: this.getHasCheckedFilters(this.filters),
            isMainPanel: data.isMainPanel,
            isDependentPanel: data.isDependentPanel
        };
    }
    setButton(button) {
        this.button = button;
    }
    getParams() {
        return {
            data: {
                filters: this.filters,
                button: this.button
            },
            config: this.config
        };
    }
    setData(data) {
        this.filtersData = data.filtersData;
        this.searchParams = data.searchParams;
    }
    initFilters(data) {
        const enabledFilters = data.enabledFilters || this.defaultFilters;
        const filtersData = data.filtersData || {};
        const searchParams = data.searchParams || {};
        enabledFilters.forEach((filterName) => {
            const filterDataValues = filtersData[filterName];
            const checkedValues = searchParams[filterName];
            this.initFilter({
                filterName: filterName,
                dataValues: filterDataValues,
                checkedValues: checkedValues
            });
        });
    }
    setFilterWeekDays(checkedValues) {
        const params = this.filterWeekDays;
        params.data.options = this.createOptionsValuesInOrder(this.optionsWeekDays);
        this.setFilterAlignedHorizontal(params, checkedValues);
        return this;
    }
    setFilterModal(filterParams, checkedValues) {
        let params = filterParams;
        params.config.type = filterType_1.filterType.EXTENDED;
        params = this.updateOptionsToShowFilterModal_(params, checkedValues);
        this.setFilter(params, checkedValues);
        return this;
    }
    setFilterAlignedHorizontal(filterParams, checkedValues) {
        const params = filterParams;
        params.config.align = 'horizontal';
        params.config.optionsToShow = (params.config.optionsToShow || params.data.options.length);
        this.setFilter(params, checkedValues);
        return this;
    }
    setFilterInput(filterParams, checkedValues) {
        const params = filterParams;
        params.config.type = filterType_1.filterType.INPUT;
        this.setFilter(params, checkedValues);
        return this;
    }
    /**
     * Set params for filter with options-radiobuttons
     */
    setFilterSwitch(filterParams, checkedValues) {
        const params = filterParams;
        params.config.type = filterType_1.filterType.SWITCH;
        this.setFilter(params, checkedValues);
        return this;
    }
    setFilterLabels(filterParams, checkedValues) {
        const params = filterParams;
        params.config.type = filterType_1.filterType.LABELS;
        this.setFilter(params, checkedValues);
        return this;
    }
    setFilterRange(filterParams, checkedValues) {
        const params = filterParams;
        params.config.type = filterType_1.filterType.RANGE;
        this.setFilter(params, checkedValues);
        return this;
    }
    /**
     * Adds new filter params in array of filters for filter panel
     */
    setFilter(filterParams, checkedValues) {
        const params = this.updateFilterParams(filterParams, checkedValues);
        this.filters.push(params);
        return this;
    }
    initFilter(data) {
        const name = data.filterName, dataValues = data.dataValues, checkedValues = data.checkedValues, initFunction = this.filterInitializers[name];
        if (initFunction) {
            if (dataValues) {
                initFunction(dataValues, checkedValues);
            }
            else {
                initFunction(checkedValues);
            }
        }
    }
    /**
     * Determines is expanded filter panel
     */
    getHasCheckedFilters(filters) {
        return filters.some(filter => {
            return filter.data.options.some(option => option.isChecked);
        });
    }
    updateFilterParams(filterParams, checkedValues) {
        const params = filterParams;
        params.data.options = this.updateOptionsIsChecked(filterParams.data.options, checkedValues);
        params.config = this.updateFilterConfigIsShowed(filterParams, checkedValues);
        return params;
    }
    /**
     * Set filter config field isShowed true if is checked values
     */
    updateFilterConfigIsShowed(filterParams, checkedValues) {
        const config = filterParams.config;
        config.isShowed = config.isShowed || this.isShowedFilter(filterParams.data.options, checkedValues, filterParams.config.type);
        return config;
    }
    /**
     * Return true if any option is checked or input is filled
     */
    isShowedFilter(options, checkedValues, type) {
        const isInputFilter = type == filterType_1.filterType.INPUT;
        const optionsIsChecked = options.some(option => option.isChecked), isCheckedValues = !!(checkedValues && checkedValues.length), inputsIsFilled = isInputFilter && options.some(option => !!option.value);
        return optionsIsChecked || inputsIsFilled || isCheckedValues;
    }
    /**
     * Set options field isChecked true
     */
    updateOptionsIsChecked(options, checkedValues) {
        const values = checkedValues || [];
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
     */
    createOptionsValuesInOrder(options) {
        return lodash.map(options, (option, index) => {
            const result = option || {};
            result.value = index;
            return result;
        });
    }
    /**
     * Transform array of models to options of inputs
     */
    getInputOptions(models) {
        return models.map(this.getInputOption, this);
    }
    getInputOption(model) {
        return {
            name: model.id,
            label: this.getLabel(model),
            value: null
        };
    }
    /**
     * Transform array of models to options
     */
    getOptions(models) {
        return models.map(this.getOption, this);
    }
    /**
     * Create option from model
     */
    getOption(model) {
        return {
            value: model.id,
            label: this.getLabel(model)
        };
    }
    getLabel(model) {
        return model.displayName || model.name;
    }
    getCheckedOptions(options, checkedValues) {
        return options.filter(option => checkedValues.some(checkedValue => option.value == checkedValue));
    }
    updateOptionsToShowFilterModal_(filterParams, checkedValues) {
        const params = filterParams;
        if (checkedValues.length) {
            params.data.options = this.getCheckedOptions(params.data.options, checkedValues);
            params.config.optionsToShow = params.data.options.length;
        }
        return params;
    }
}
exports.FilterPanel = FilterPanel;
