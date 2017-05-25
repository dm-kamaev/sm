"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterName_1 = require("../constants/filterName");
const FilterPanel_1 = require("../../common/lib/FilterPanel");
class ProgramFilterPanel extends FilterPanel_1.FilterPanel {
    constructor() {
        super();
        this.filterCities_ = {
            data: {
                header: {
                    title: 'Город'
                },
                name: filterName_1.filterName.CITIES,
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
                name: filterName_1.filterName.EGE_SUBJECTS,
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
                name: filterName_1.filterName.PAY_TYPE,
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
                name: filterName_1.filterName.EGE_RESULTS,
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
                name: filterName_1.filterName.MAX_PRICE,
                options: [{
                        name: filterName_1.filterName.MAX_PRICE,
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
                name: filterName_1.filterName.MAJORS,
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
                name: filterName_1.filterName.FEATURES,
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
    get filterInitializers() {
        return {
            [filterName_1.filterName.CITIES]: this.setFilterCities_.bind(this, this.filtersData.citiesCount),
            [filterName_1.filterName.EGE_SUBJECTS]: this.setFilterEgeSubjects_.bind(this),
            [filterName_1.filterName.PAY_TYPE]: this.setFilterPayType_.bind(this),
            [filterName_1.filterName.EGE_RESULTS]: this.setFilterEgeResults_.bind(this),
            [filterName_1.filterName.MAX_PRICE]: this.setFilterMaxPrice_.bind(this),
            [filterName_1.filterName.MAJORS]: this.setFilterMajors_.bind(this, this.filtersData.majorsCount),
            [filterName_1.filterName.FEATURES]: this.setFilterFeatures_.bind(this)
        };
    }
    /**
     * Return array of default filter names
     */
    get defaultFilters() {
        return [
            filterName_1.filterName.CITIES,
            filterName_1.filterName.EGE_SUBJECTS,
            filterName_1.filterName.PAY_TYPE
        ];
    }
    /**
     * Adds new filter params in array of filters for filter panel
     */
    setFilter(filterParams, checkedValues) {
        const params = filterParams;
        params.config.filterArrowIcon = {
            up: 'filter-arrow-up_black'
        };
        super.setFilter(params, checkedValues);
        return this;
    }
    setFilterCities_(count, optionModels, checkedValues) {
        const params = this.filterCities_;
        params.data.options = this.getOptions(optionModels);
        if (count) {
            params.config.showMoreButtonText =
                `${params.config.showMoreButtonText} (${count})`;
        }
        this.setFilterModal(params, checkedValues);
        return this;
    }
    setFilterEgeSubjects_(optionModels, checkedValues) {
        const params = this.filterEgeSubjects_;
        params.data.options = this.getOptions(optionModels);
        this.setFilter(params, checkedValues);
        return this;
    }
    setFilterPayType_(checkedValues) {
        const params = this.filterPayType_;
        this.setFilter(params, checkedValues);
        return this;
    }
    setFilterEgeResults_(optionModels, filledOptions) {
        const params = this.filterEgeResults_;
        const options = this.getInputOptions(optionModels);
        params.data.options = this.updateFilterEgeOptionsParams_(options, filledOptions);
        params.data.placeholder.isHidden =
            !this.getFilterEgePlaceholderVisibility_(params.data.options, params.data.minOptionsToShowPlaceholder);
        this.setFilterInput(params, filledOptions);
        return this;
    }
    setFilterMaxPrice_(checkedValues) {
        const params = this.filterMaxPrice_;
        params.data.options = this.updateFilterMaxPrice(params.data.options, checkedValues);
        this.setFilterRange(params, checkedValues);
        return this;
    }
    setFilterMajors_(count, optionModels, checkedValues) {
        const params = this.filterMajors_;
        params.data.options = this.getOptions(optionModels);
        if (count) {
            params.config.showMoreButtonText =
                `${params.config.showMoreButtonText} (${count})`;
        }
        this.setFilterModal(params, checkedValues);
        return this;
    }
    setFilterFeatures_(checkedValues) {
        const params = this.filterFeatures_;
        this.setFilter(params, checkedValues);
        return this;
    }
    /**
     * Sets getting values in options
     */
    updateFilterMaxPrice(rangeOptions, checkedValues) {
        const options = rangeOptions;
        if (checkedValues && checkedValues.length) {
            options[0].value = checkedValues[0];
        }
        return options;
    }
    updateFilterEgeOptionsParams_(options, filledOptions) {
        const filterOptions = this.updateInputsIsFilled_(options, filledOptions);
        return this.updateFilterEgeOptionsSettings_(filterOptions);
    }
    /**
     * Sets inputs type and maxLenght
     */
    updateFilterEgeOptionsSettings_(options) {
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
    getFilterEgePlaceholderVisibility_(options, minOptionsToShowPlaceholder) {
        const numberVisibleOptions = this.getNumberVisibleOptions_(options);
        return numberVisibleOptions <= minOptionsToShowPlaceholder;
    }
    /**
     * Returns true if egeSubject is checked and egeSubject
     * corresponds to egeResult
     */
    isEgeResultOptionVisible_(option) {
        const egeSubjects = this.searchParams.egeSubjects;
        return egeSubjects.some(subjectId => option.name == subjectId);
    }
    /**
     * Returns number of visible options
     */
    getNumberVisibleOptions_(options) {
        const visibleOptions = options.filter(option => !option.isHidden);
        return visibleOptions.length;
    }
    /**
     * Set options value if options are filled
     */
    updateInputsIsFilled_(options, filledOptions) {
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
exports.ProgramFilterPanel = ProgramFilterPanel;
