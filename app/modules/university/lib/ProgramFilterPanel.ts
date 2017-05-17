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
    subjectId: number,
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
                apiPopular: '/cities/program',
                modal: {
                    header: 'В каком городе вы хотите учиться?',
                    placeholder: 'Поиск по городам',
                    theme: 'neptune'
                },
                options: []
            },
            config: {
                isShowed: true,
                optionsToShow: 3,
                showMoreButtonText: 'другие города',
                optionsTheme: 'neptune',
                customIcon: {
                    check: 'checked-blue',
                    uncheck: 'unchecked-blue'
                }
            }
        };

        this.filterEgeSubjects_ = {
            data: {
                header: {
                    title: 'ЕГЭ по выбору'
                },
                description: 'Как минимум 3 предмета',
                name: filterName.EGE_SUBJECTS,
                options: []
            },
            config: {
                isShowed: true,
                optionsToShow: 3,
                showMoreButtonText: 'все предметы',
                optionsTheme: 'neptune',
                customIcon: {
                    check: 'checked-blue',
                    uncheck: 'unchecked-blue'
                }
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
                optionsToShow: 3,
                optionsTheme: 'neptune',
                customIcon: {
                    check: 'checked-blue',
                    uncheck: 'unchecked-blue'
                }
            }
        };

        this.filterEgeResults_ = {
            data: {
                header: {
                    title: 'Баллы ЕГЭ'
                },
                name: filterName.EGE_RESULTS,
                options: [],
                placeholder: {
                    text: 'Чтобы задать баллы, выберите как минимум 3 ' +
                        'предмета выше',
                    isHidden: false
                },
                minOptionsToShowPlaceholder: 2
            },
            config: {
                isShowed: true,
                inline: true,
                cannotBeHidden: true,
                optionsTheme: 'neptune'
            }
        };

        this.filterMaxPrice_ = {
            data: {
                name: filterName.MAX_PRICE,
                options: [{
                    name: filterName.MAX_PRICE,
                    label: 'Стоимость обучения  (руб. в год)',
                    step: 10000,
                    minValue: 20000,
                    maxValue: 520000,
                    defaultValue: 520000,
                    thumb: {
                        iconName: 'thumb-blue',
                        iconType: 'icon-svg'
                    }
                }]
            },
            config: {
                cannotBeHidden: true,
                optionsTheme: 'neptune'
            }
        };

        this.filterMajors_ = {
            data: {
                header: {
                    title: 'Специальности'
                },
                name: filterName.MAJORS,
                api: '/programmajor/search',
                apiPopular: '/programmajor/popular',
                modal: {
                    header: 'Какую специальность вы ищете?',
                    placeholder: 'Поиск по специальностям',
                    theme: 'neptune'
                },
                options: []
            },
            config: {
                isShowed: true,
                optionsToShow: 3,
                showMoreButtonText: 'выбрать специальность',
                optionsTheme: 'neptune',
                customIcon: {
                    check: 'checked-blue',
                    uncheck: 'unchecked-blue'
                }
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
                optionsToShow: 3,
                optionsTheme: 'neptune',
                customIcon: {
                    check: 'checked-blue',
                    uncheck: 'unchecked-blue'
                }
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

        const options = this.getInputOptions(optionModels);

        params.data.options = this.updateFilterEgeOptionsParams_(
            options,
            filledOptions
        );

        params.data.placeholder.isHidden =
            !this.getFilterEgePlaceholderVisibility_(
                params.data.options,
                params.data.minOptionsToShowPlaceholder
        );

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

    private updateFilterEgeOptionsParams_(
            options: InputOption[],
            filledOptions?: FilledInputOption[]
    ): InputOption[] {

        const filterOptions = this.updateInputsIsFilled_(
            options,
            filledOptions
        );

        return this.updateFilterEgeOptionsSettings_(filterOptions);
    }

    /**
     * Sets inputs type and maxLenght
     */
    private updateFilterEgeOptionsSettings_(
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
     * Returns number of visible options
     */
    private getFilterEgePlaceholderVisibility_(
            options: InputOption[],
            minOptionsToShowPlaceholder: number
    ): boolean {

        const numberVisibleOptions = this.getNumberVisibleOptions_(options);

        return numberVisibleOptions <= minOptionsToShowPlaceholder;
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
     * Returns number of visible options
     */
    private getNumberVisibleOptions_(
            options: InputOption[]
    ): number {

        const visibleOptions = options.filter(option => !option.isHidden);

        return visibleOptions.length;
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
                if (option.name == filledOption.subjectId) {
                    option.value = filledOption.value;
                }
            });
            return option;
        });
    }
}
export {ProgramFilterPanel};
