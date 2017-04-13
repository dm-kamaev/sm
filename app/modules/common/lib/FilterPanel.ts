const lodash = require('lodash').lodash;

import {filterType} from '../constants/filterType';

import {bFilter} from '../../../blocks/n-common/l-search/b-filter/params';
import {
    bFilterRange
} from '../../../blocks/n-common/l-search/b-filter/b-filter_range/params';
import {
    bFilterPanel
} from '../../../blocks/n-common/l-search/b-filter-panel/params';

type InitFiltersData = {
    enabledFilters: string[];
    filtersData: {[name: string]: Option[]};
    searchParams: {[name: string]: (number|string)[]};
};

type InitFilterData = {
    filterName: string;
    dataValues: Option[];
    checkedValues: (string|number)[];
};

type Option = {
    label: string;
    value: (number|string);
    isChecked?: boolean;
};

type OptionWithoutValue = {
    label: string;
    isChecked?: boolean;
};

type OptionModel = {
    id: (number|string);
    name: string;
};

type FilterParams = (bFilter.Params|bFilterRange.Params|any);

abstract class FilterPanel {

    /**
     * Include filters what will show on page
     */
    protected filters: Array<FilterParams>;

    /**
     * Params for filter by days of week
     */
    protected filterWeekDays: bFilter.Params;

    protected optionsWeekDays: Array<OptionWithoutValue>;

    constructor() {
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
        this.initFilters(data);
        return this.getParams();
    }

    public getParams(): bFilterPanel.Params {
        return {
            data: {
                filters: this.filters
            },
            config: {
                hasCheckedFilters: this.getHasCheckedFilters(this.filters)
            }
        };
    }

    public initFilters(data: InitFiltersData) {
        let enabledFilters = data.enabledFilters || this.defaultFilters;
        let filtersData = data.filtersData || {};
        let searchParams = data.searchParams || {};

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
        let params: bFilter.Params = this.filterWeekDays;

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
        let params = filterParams;
        params.config.type = filterType.EXTENDED;

        this.setFilter(params, checkedValues);

        return this;
    }


    protected setFilterAlignedHorizontal(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        let params = filterParams;

        params.config.align = 'horizontal';
        params.config.optionsToShow = (
            params.config.optionsToShow || params.data.options.length
        );

        this.setFilter(params, checkedValues);

        return this;
    }


    protected setFilterInput(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        let params = filterParams;
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
        let params = filterParams;
        params.config.type = filterType.SWITCH;

        this.setFilter(params, checkedValues);

        return this;
    }


    protected setFilterLabels(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        let params = filterParams;
        params.config.type = filterType.LABELS;

        this.setFilter(params, checkedValues);

        return this;
    }


    /**
     * Adds new filter params in array of filters for filter panel
     */
    protected setFilter(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        const params = this.updateFilterParams(filterParams, checkedValues);
        this.filters.push(params);

        return this;
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
            checkedValues?: (number|string)[]
    ): FilterParams {
        let params = filterParams;

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
            checkedValues?: (number|string)[]
    ): (bFilter.Params.Config|any) {

        let data = filterParams.data,
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
     */
    protected updateOptionsIsChecked(
            options: Option[],
            checkedValues?: (number|string)[]
    ): Option[] {
        let values = checkedValues || [];

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
            let result = option || {};
            result.value = index;
            return result;
        });
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
        return model.name;
    }


    protected initFilter(data: InitFilterData) {
        const name: string = data.filterName,
            dataValues: Option[] = data.dataValues,
            checkedValues: (string|number)[] = data.checkedValues,
            initFunction: Function = this.filterInitializers[name];

        if (initFunction) {
            if (dataValues) {
                initFunction(dataValues, checkedValues);
            } else {
                initFunction(checkedValues);
            }
        }
    }
}

export {FilterPanel};
