import {filterName} from '../constants/filterName';

import {FilterPanel} from '../../common/lib/FilterPanel';

import {Option, OptionModel, InputOption} from '../../common/types/filterPanel';

import {bFilter} from '../../../blocks/n-common/l-search/b-filter/params';
import {
    bFilterRange
} from '../../../blocks/n-common/l-search/b-filter/b-filter_range/params';
import {
    bFilterExtended
} from '../../../blocks/n-common/l-search/b-filter/b-filter_extended/params';
import {
    bFilterInput
} from '../../../blocks/n-common/l-search/b-filter/b-filter_input/params';

import {filterType} from '../../common/constants/filterType';

type FilterParams = (
    bFilter.Params|
    bFilterRange.Params|
    bFilterExtended.Params|
    any
);

type FilledInputOption = {
    id: number,
    value: number
};

type RangeOption = {
    name: string,
    label: string,
    value?: number,
    step?: number,
    minValue?: number,
    maxValue: number,
    defaultValue?: number,
    thumb?: {
        iconName: string,
        iconType?: string
    }
};


class ProgramFilterPanel extends FilterPanel {
    private filterCities_: bFilterExtended.Params;
    private filterEgeSubjects_: bFilter.Params;
    private filterPayType_: bFilter.Params;
    private filterEgeResults_: bFilterInput.Params;
    private filterMaxPrice_: bFilterRange.Params;
    private filterMajors_: bFilterExtended.Params;
    private filterFeatures_: bFilter.Params;

    constructor() {
        super();

        this.filterCities_ = {
            data: {
                header: {
                    title: 'Город'
                },
                name: filterName.CITIES,
                api: '/cities',
                modal: {
                    header: 'Какой город вы ищете?',
                    placeholder: 'Поиск по городам',
                    filterHeader: 'Популярные города'
                },
                options: []
            },
            config: {
                isShowed: true,
                optionsToShow: 3,
                showMoreButtonText: 'другие города'
            }
        };


        this.filterEgeSubjects_ = {
            data: {
                header: {
                    title: 'ЕГЭ по выбору'
                },
                name: filterName.EGE_SUBJECTS,
                options: []
            },
            config: {
                isShowed: true,
                optionsToShow: 3,
                showMoreButtonText: 'все предметы'
            }
        };


        this.filterPayType_ = {
            data: {
                header: {
                    title: 'Стоимость обучения'
                },
                name: filterName.PAY_TYPE,
                options: [
                    {
                        label: 'Бюджетные программы',
                        value: 0
                    }, {
                        label: 'Платные программы',
                        value: 1
                    }
                ]
            },
            config: {
                isShowed: true,
                optionsToShow: 3
            }
        };


        this.filterEgeResults_ = {
            data: {
                header: {
                    title: 'Баллы ЕГЭ'
                },
                name: filterName.EGE_RESULTS,
                options: []
            },
            config: {
                isShowed: true,
                inline: true
            }
        };


        this.filterMaxPrice_ = {
            data: {
                name: filterName.MAX_PRICE,
                options: [{
                    name: filterName.MAX_PRICE,
                    label: 'Стоимость обучения  (руб. в год)',
                    step: 50000,
                    minValue: 50000,
                    maxValue: 500000,
                    defaultValue: 500000,
                    thumb: {
                        iconName: 'thumb-blue',
                        iconType: 'icon-svg'
                    }
                }]
            },
            config: {
                cannotBeHidden: true
            }
        };


        this.filterMajors_ = {
            data: {
                header: {
                    title: 'Специальности'
                },
                name: filterName.MAJORS,
                api: '/programmajor/search',
                modal: {
                    header: 'Какую специальность вы ищете?',
                    placeholder: 'Поиск по специальностям',
                    filterHeader: 'Популярные специальности'
                },
                options: []
            },
            config: {
                isShowed: true,
                optionsToShow: 3,
                showMoreButtonText: 'выбрать специальность'
            }
        };


        this.filterFeatures_ = {
            data: {
                header: {
                    title: 'Особенности'
                },
                name: filterName.FEATURES,
                options: [
                    {
                        label: 'Программа обмена',
                        value: 0
                    }, {
                        label: 'Военная кафедра',
                        value: 1
                    }, {
                        label: 'Общежитие',
                        value: 2
                    }
                ]
            },
            config: {
                isShowed: true,
                optionsToShow: 3
            }
        };
    }


    protected get filterInitializers(): {[name: string]: Function} {
        return {
            [filterName.CITIES]: this.setFilterCities_.bind(
                this, this.filtersData.citiesCount
            ),
            [filterName.EGE_SUBJECTS]: this.setFilterEgeSubjects_.bind(this),
            [filterName.PAY_TYPE]: this.setFilterPayType_.bind(this),
            [filterName.EGE_RESULTS]: this.setFilterEgeResults_.bind(this),
            [filterName.MAX_PRICE]: this.setFilterMaxPrice_.bind(this),
            [filterName.MAJORS]: this.setFilterMajors_.bind(
                this, this.filtersData.majorsCount
            ),
            [filterName.FEATURES]: this.setFilterFeatures_.bind(this)
        };
    }

    /**
     * Return array of default filter names
     */
    get defaultFilters() {
        return [
            filterName.CITIES,
            filterName.EGE_SUBJECTS,
            filterName.PAY_TYPE
        ];
    }


    /**
     * Adds new filter params in array of filters for filter panel
     */
    protected setFilter(
            filterParams: FilterParams,
            checkedValues?: (number|string)[]
    ) {
        const params = filterParams;

        params.config.filterArrowIcon = {
            up: 'filter-arrow-up_black'
        };

        super.setFilter(params, checkedValues);

        return this;
    }


    private setFilterCities_(
            count: number,
            optionModels: Array<OptionModel>,
            checkedValues?: (number|string)[]
    ) {
        const params = this.filterCities_;
        params.data.options = this.getOptions(optionModels);

        if (count) {
            params.config.showMoreButtonText =
                `${params.config.showMoreButtonText} (${count})`;
        }

        this.setFilterModal(params, checkedValues);

        return this;
    }

    private setFilterEgeSubjects_(
            optionModels: Array<OptionModel>,
            checkedValues?: (number|string)[]
    ) {
        const params = this.filterEgeSubjects_;
        params.data.options = this.getOptions(optionModels);

        this.setFilter(params, checkedValues);

        return this;
    }

    private setFilterPayType_(checkedValues?: (number|string)[]) {
        const params = this.filterPayType_;
        this.setFilter(params, checkedValues);

        return this;
    }

    private setFilterEgeResults_(
            optionModels: Array<OptionModel>,
            filledOptions?: FilledInputOption[]
    ) {
        const params = this.filterEgeResults_;

        let options = this.getInputOptions(optionModels);

        options = this.updateInputsIsFilled_(options, filledOptions);
        params.data.options = this.updateFilterEgeOptionsParams_(options);

        this.setFilterInput(params, filledOptions);

        return this;
    }

    private setFilterMaxPrice_(checkedValues?: number[]) {
        const params = this.filterMaxPrice_;

        params.data.options = this.updateFilterMaxPrice(
            params.data.options,
            checkedValues
        );

        this.setFilterRange(params, checkedValues);

        return this;
    }

    private setFilterMajors_(
            count: number,
            optionModels: Array<OptionModel>,
            checkedValues?: (number|string)[]
    ) {
        const params = this.filterMajors_;
        params.data.options = this.getOptions(optionModels);

        if (count) {
            params.config.showMoreButtonText =
                `${params.config.showMoreButtonText} (${count})`;
        }

        this.setFilterModal(params, checkedValues);

        return this;
    }

    private setFilterFeatures_(
            optionModels: Array<OptionModel>,
            checkedValues?: (number|string)[]
    ) {
        const params = this.filterFeatures_;
        this.setFilter(params, checkedValues);

        return this;
    }


    /**
     * Sets getting values in options
     */
    private updateFilterMaxPrice(
            rangeOptions: RangeOption[],
            checkedValues?: number[]
    ): RangeOption[] {

        const options = rangeOptions;

        if (checkedValues && checkedValues.length) {
            options[0].value = checkedValues[0];
        }

        return options;
    }

    /**
     * Sets inputs type and maxLenght
     */
    private updateFilterEgeOptionsParams_(
            options: InputOption[]
    ): InputOption[] {

        return options.map(option => {
            option.type = 'number';
            option.maxLength = 3;
            option.isHidden = !this.isEgeResultOptionVisible_(option);

            return option;
        });
    }

    /**
     * Returns true if egeSubject is checked and egeSubject
     * corresponds to egeResult
     */
    private isEgeResultOptionVisible_(
            option: InputOption
    ): boolean {

        const egeSubjects = this.searchParams.egeSubjects;

        return egeSubjects.some(subjectId =>
            option.name == subjectId
        );
    }

    /**
     * Set options value if options are filled
     */
    private updateInputsIsFilled_(
            options: InputOption[],
            filledOptions?: FilledInputOption[]
    ): InputOption[] {

        const filledData = filledOptions || [];

        return options.map(option => {
            filledData.map(filledOption => {
                if (option.name == filledOption.id) {
                    option.value = filledOption.value;
                }
            });
            return option;
        });
    }
}

export {ProgramFilterPanel};
