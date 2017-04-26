const lodash = require('lodash').lodash;

import {filterType} from '../constants/filterType';

import {Option, OptionModel, InputOption} from '../../common/types/filterPanel';

import {bFilter} from '../../../blocks/n-common/l-search/b-filter/params';
import {
    bFilterRange
} from '../../../blocks/n-common/l-search/b-filter/b-filter_range/params';
import {
    bFilterExtended
} from '../../../blocks/n-common/l-search/b-filter/b-filter_extended/params';
import {
    bFilterPanel
} from '../../../blocks/n-common/l-search/b-filter-panel/params';

type InitFiltersData = {
    enabledFilters: string[];
    filtersData: {[name: string]: Option[]};
    searchParams: {[name: string]: number[] | string[] | any};
    theme?: string;
    button?: {
        content: string;
        theme?: string;
        borderRoundSize?: string;
    };
    isMainPanel?: boolean;
    isDependentPanel?: boolean;
};

type InitFilterData = {
    filterName: string;
    dataValues: Option[];
    checkedValues: (number[] | string[] | number);
};

type OptionWithoutValue = {
    label: string;
    isChecked?: boolean;
};

type FilterParams = (
    bFilter.Params|
    bFilterRange.Params|
    bFilterExtended.Params|
    any
);

type Button = {
    content: string;
    theme: string;
    borderRoundSize: string;
};

type Config = {
    theme?: string;
    hasCheckedFilters?: boolean;
    isMainPanel?: boolean;
    isDependentPanel?: boolean;
};

abstract class FilterPanel {

    /**
     * Include filters what will show on page
     */
    protected filters: FilterParams[];


    /**
     * Includes filters and options count
     */
    protected filtersData: {[name: string]: (Option[]|number)};

    /**
     * Params for filter by days of week
     */
    protected filterWeekDays: bFilter.Params;

    protected optionsWeekDays: OptionWithoutValue[];

    protected theme: string;

    protected button: Button;

    protected config: Config;

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
    protected get filterInitializers(): {[name: string]: Function} {
        return {};
    }

    /**
     * Return array of default filter names
     * Must be  overriden in heirs
     */
    protected get defaultFilters(): string[] {
        return [];
    }

    public render(data: InitFiltersData): bFilterPanel.Params {
        this.setData(data.filtersData);

        this.setButton(data.button);
        this.setConfig(data);

        this.initFilters(data);

        return this.getParams();
    }

    public setConfig(data: InitFiltersData) {
        this.config = {
            theme: data.theme,
            hasCheckedFilters: this.getHasCheckedFilters(this.filters),
            isMainPanel: data.isMainPanel,
            isDependentPanel: data.isDependentPanel
        };
    }


    public setButton(button) {
        this.button = button;
    }

    public getParams(): bFilterPanel.Params {
        return {
            data: {
                filters: this.filters,
                button: this.button
            },
            config: this.config
        };
    }

    protected setData(filtersData: {[name: string]: (Option[]|number)}) {
        this.filtersData = filtersData;
    }

    protected initFilters(data: InitFiltersData) {
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

    protected setFilterWeekDays(checkedValues?: (number|string)[]) {
        const params: bFilter.Params = this.filterWeekDays;

        params.data.options = this.createOptionsValuesInOrder(
            this.optionsWeekDays
        );

        this.setFilterAlignedHorizontal(params, checkedValues);

        return this;
    }


    protected setFilterModal(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        const params = filterParams;
        params.config.type = filterType.EXTENDED;

        this.setFilter(params, checkedValues);

        return this;
    }


    protected setFilterAlignedHorizontal(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        const params = filterParams;

        params.config.align = 'horizontal';
        params.config.optionsToShow = (
            params.config.optionsToShow || params.data.options.length
        );

        this.setFilter(params, checkedValues);

        return this;
    }


    protected setFilterInput(
            filterParams: FilterParams,
            checkedValues?: (number|string|Object)[]
    ) {
        const params = filterParams;
        params.config.type = filterType.INPUT;

        this.setFilter(params, checkedValues);

        return this;
    }


    /**
     * Set params for filter with options-radiobuttons
     */
    protected setFilterSwitch(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        const params = filterParams;
        params.config.type = filterType.SWITCH;

        this.setFilter(params, checkedValues);

        return this;
    }


    protected setFilterLabels(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        const params = filterParams;
        params.config.type = filterType.LABELS;

        this.setFilter(params, checkedValues);

        return this;
    }


    protected setFilterRange(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        const params = filterParams;
        params.config.type = filterType.RANGE;

        this.setFilter(params, checkedValues);

        return this;
    }


    /**
     * Adds new filter params in array of filters for filter panel
     */
    protected setFilter(
            filterParams: FilterParams,
            checkedValues?: (number|string|Object)[]
    ) {
        const params = this.updateFilterParams(filterParams, checkedValues);
        this.filters.push(params);

        return this;
    }


    protected initFilter(data: InitFilterData) {
        const name: string = data.filterName,
            dataValues: Option[] = data.dataValues,
            checkedValues: (number[] | string[] | number) = data.checkedValues,
            initFunction: Function = this.filterInitializers[name];

        if (initFunction) {
            if (dataValues) {
                initFunction(dataValues, checkedValues);
            } else {
                initFunction(checkedValues);
            }
        }
    }


    /**
     * Determines is expanded filter panel
     */
    protected getHasCheckedFilters(filters: FilterParams): boolean {
        return filters.some(filter => {
            return filter.data.options.some(option => option.isChecked);
        });
    }


    protected updateFilterParams(
            filterParams: FilterParams,
            checkedValues?: (number|string|Object)[]
    ): FilterParams {
        const params = filterParams;

        params.data.options = this.updateOptionsIsChecked(
            filterParams.data.options,
            checkedValues
        );

        params.config = this.updateFilterConfigIsShowed(
            filterParams,
            checkedValues
        );

        return params;
    }


    /**
     * Set filter config field isShowed true if is checked values
     */
    protected updateFilterConfigIsShowed(
            filterParams: FilterParams,
            checkedValues?: (number|string|Object)[]
    ): (bFilter.Params.Config|any) {

        const config = filterParams.config;

        config.isShowed = this.isShowedFilter(
            filterParams.data.options,
            checkedValues,
            filterParams.config.type
        );

        return config;
    }


    /**
     * Return true if any option is checked or input is filled
     */
    protected isShowedFilter(
            options: Option[],
            checkedValues?: (number|string|Object)[],
            type?: string
    ): boolean {

        const isInputFilter = type == filterType.INPUT;

        const optionsIsChecked = options.some(option => option.isChecked),
            isCheckedValues = !!(checkedValues && checkedValues.length),
            inputsIsFilled = isInputFilter && options.some(
                option => !!option.value
            );

        return optionsIsChecked || inputsIsFilled || isCheckedValues;
    }


    /**
     * Set options field isChecked true
     */
    protected updateOptionsIsChecked(
            options: Option[],
            checkedValues?: (number|string|Object)[]
    ): Option[] {
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
    protected createOptionsValuesInOrder(
            options: OptionWithoutValue[]
    ): Option[] {

        return lodash.map(options, (option, index) => {
            const result = option || {};
            result.value = index;
            return result;
        });
    }


    /**
     * Transform array of models to options of inputs
     */
    protected getInputOptions(models: OptionModel[]): InputOption[] {
        return models.map(this.getInputOption, this);
    }


    protected getInputOption(model: OptionModel): InputOption {
        return {
            name: model.id,
            label: this.getLabel(model),
            value: null
        };
    }


    /**
     * Transform array of models to options
     */
    protected getOptions(models: OptionModel[]): Option[] {
        return models.map(this.getOption, this);
    }


    /**
     * Create option from model
     */
    protected getOption(model: OptionModel): Option {
        return {
            value: model.id,
            label: this.getLabel(model)
        };
    }


    protected getLabel(model: OptionModel): string {
        return model.displayName || model.name;
    }
}

export {FilterPanel};
