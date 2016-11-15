'use strict';

const filterName = require('../enums/filterName');

const FilterPanel = require('../../entity/lib/FilterPanel');

class SchoolFilterPanel extends FilterPanel {

    /**
     * Init params for filter panel
     */
    constructor() {
        super();

        /**
         * Params for filter by classes
         * @type {Object}
         * @override
         * @protected
         */
        this.filterClasses_ = {
            data: {
                header: {
                    title: 'В какой класс Вы хотите отдать ребенка?'
                },
                name: filterName.CLASSES,
                options: [{
                    'label': 0
                }, {
                    'label': 1
                }, {
                    'label': 2
                }, {
                    'label': 3
                }, {
                    'label': 4
                }, {
                    'label': 5
                }, {
                    'label': 6
                }, {
                    'label': 7
                }, {
                    'label': 8
                }, {
                    'label': 9
                }, {
                    'label': 10
                }, {
                    'label': 11
                }]
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by school type
         * @type {Object}
         * @private
         */
        this.filterSchoolType_ = {
            data: {
                header: {
                    title: 'Тип школы'
                },
                name: filterName.SCHOOL_TYPE
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by ege
         * @type {Object}
         * @private
         */
        this.filterEge_ = {
            data: {
                header: {
                    title: 'Высокие результаты ЕГЭ'
                },
                name: filterName.EGE
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by gia
         * @type {Object}
         * @private
         */
        this.filterGia_ = {
            data: {
                header: {
                    title: 'Высокие результаты ГИА'
                },
                name: filterName.GIA
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by olympics
         * @type {Object}
         * @private
         */
        this.filterOlimp_ = {
            data: {
                header: {
                    title: 'Есть победы в олимпиадах'
                },
                name: filterName.OLIMP
            },
            config: {
                isShowed: true
            }
        };

        /**
         * Params for filter by specialized class type
         * @type {Object}
         * @private
         */
        this.filterSpecializedClassType_ = {
            data: {
                header: {
                    title: 'Профильные классы'
                },
                name: filterName.SPECIALIZED_CLASS_TYPE
            },
            config: {
                showMoreButtonText: 'Полный список',
                optionsToShow: 3,
                isShowed: true
            }
        };

        /**
         * Params for filter by form activity sphere
         * @type {Object}
         * @private
         */
        this.filterActivitySphere_ = {
            data: {
                header: {
                    title: 'Курсы, кружки и секции'
                },
                name: filterName.ACTIVITY_SPHERE
            },
            config: {
                showMoreButtonText: 'Полный список',
                optionsToShow: 3,
                isShowed: true
            }
        };

        /**
         * Params for filter by kindergarten
         * @type {Object}
         * @private
         */
        this.filterKindergarten_ = {
            data: {
                name: filterName.kindergarten,
                options: [{
                    'label': 'При школе есть детский сад'
                }]
            },
            config: {
                isShowed: true
            }
        };
    }


    /**
     * Must be overriden in heirs
     * @return {Object<string, Function>}
     * @override
     */
    get filterInitializers() {
        return {
            [filterName.CLASSES]: this.setFilterClasses.bind(this),
            [filterName.SCHOOL_TYPE]: this.setFilterSchoolType.bind(this),
            [filterName.EGE]: this.setFilterEge.bind(this),
            [filterName.GIA]: this.setFilterGia.bind(this),
            [filterName.OLIMP]: this.setFilterOlimp.bind(this),
            [filterName.SPECIALIZED_CLASS_TYPE]:
                this.setFilterSpecializedClassType.bind(this),
            [filterName.ACTIVITY_SPHERE]:
                this.setFilterActivitySphere.bind(this),
            //[filterName.KINDERGARTEN]: this.setFilterKindergarten_.bind(this)
        };
    }

    /**
     * Return array of default filter names
     * @return {Array<string>}
     * @override
     */
    get defaultFilters() {
        return [filterName.CLASSES, filterName.SCHOOL_TYPE, filterName.EGE,
            filterName.GIA, filterName.OLIMP, filterName.SPECIALIZED_CLASS_TYPE,
            filterName.ACTIVITY_SPHERE];
    }

    /**
     * Set filter for select the number of the class
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterClasses(opt_checkedValues) {
        var params = this.filterClasses_;

        params.data.options = this.createOptionsValuesInOrder(
            this.filterClasses_.data.options
        );

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for schools type
     * @param {Array<Object>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterSchoolType(options, opt_checkedValues) {
        var params = this.filterSchoolType_;
        params.data.options = this.formatType_(options);

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for ege
     * @param {Array<Object>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterEge(options, opt_checkedValues) {
        var params = this.filterEge_;
        params.data.options = this.formatType_(options);

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for gia
     * @param {Array<Object>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterGia(options, opt_checkedValues) {
        var params = this.filterGia_;
        params.data.options = this.formatType_(options);

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for olympics
     * @param {Array<Object>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterOlimp(options, opt_checkedValues) {
        var params = this.filterOlimp_;
        params.data.options = this.formatType_(options);

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for specialized classes
     * @param {Array<Object>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterSpecializedClassType(options, opt_checkedValues) {
        var params = this.filterSpecializedClassType_;
        params.data.options = this.formatType_(options);

        this.setFilterModal(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for activity sphere
     * @param {Array<Object>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterActivitySphere(options, opt_checkedValues) {
        var params = this.filterActivitySphere_;
        params.data.options = this.formatType_(options);

        this.setFilterModal(params, opt_checkedValues);

        return this;
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

module.exports = SchoolFilterPanel;
