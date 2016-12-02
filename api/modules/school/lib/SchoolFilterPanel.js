'use strict';

const filterName = require('../enums/filterName');

const FilterPanel = require('../../entity/lib/FilterPanel');

const filterType = require('../../entity/enums/filterViewType');

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
         * @private
         */
        this.filterClasses_ = {
            data: {
                header: {
                    title: 'Класс'
                },
                options: new Array(12),
                name: filterName.CLASSES,
            },
            config: {
                cannotBeHidden: true
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
            config: {}
        };

        /**
         * Params for filter by ege
         * @type {Object}
         * @private
         */
        this.filterEge_ = {
            data: {
                header: {
                    title: 'Высокие результаты ЕГЭ',
                    tooltip: 'Выше среднего значения по нашей базе. ' +
                        'Учитываются результаты московских школ ' +
                        'за последний год.'
                },
                name: filterName.EGE
            },
            config: {}
        };

        /**
         * Params for filter by gia
         * @type {Object}
         * @private
         */
        this.filterGia_ = {
            data: {
                header: {
                    title: 'Высокие результаты ГИА',
                    tooltip: 'Выше среднего значения по нашей базе. ' +
                        'Учитываются результаты московских школ ' +
                        'за последний год.'
                },
                name: filterName.GIA
            },
            config: {}
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
                name: filterName.OLYMPIAD
            },
            config: {}
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
                name: filterName.SPECIALIZED_CLASS_TYPE,
                api: '/api/school/specializedClassType',
                modal: {
                    header: 'Профильные классы',
                    placeholder: 'Какой профиль вы ищете?',
                    filterHeader: 'Популярные профильные классы'
                }
            },
            config: {
                showMoreButtonText: 'Полный список',
                optionsToShow: 3
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
                name: filterName.ACTIVITY_SPHERE,
                api: '/api/school/activitySphere',
                modal: {
                    header: 'Курсы, кружки и секции',
                    placeholder: 'Какие занятия вы ищете?',
                    filterHeader: 'Популярные'
                }
            },
            config: {
                showMoreButtonText: 'Полный список',
                optionsToShow: 3
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
            [filterName.OLYMPIAD]: this.setFilterOlimp.bind(this),
            [filterName.SPECIALIZED_CLASS_TYPE]:
                this.setFilterSpecializedClassType.bind(this),
            [filterName.ACTIVITY_SPHERE]:
                this.setFilterActivitySphere.bind(this)
        };
    }

    /**
     * Return array of default filter names
     * @return {Array<string>}
     * @override
     */
    get defaultFilters() {
        return [
            filterName.CLASSES,
            filterName.SCHOOL_TYPE,
            filterName.EGE,
            filterName.GIA,
            filterName.OLYMPIAD,
            filterName.SPECIALIZED_CLASS_TYPE,
            filterName.ACTIVITY_SPHERE
        ];
    }

    /**
     * Set filter for select the number of the class
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterClasses(opt_checkedValues) {
        var params = this.filterClasses_;

        params.config.type = filterType.CLASSES;
        params.data.options = this.createOptionsValuesInOrder(
            this.filterClasses_.data.options
        );

        this.setFilter(params, opt_checkedValues);

        return this;
    }


    /**
     * Set filter for schools type
     * @param {Array<models.SchoolTypeFilter>} options
     * @param {Array<(number|string)>=} opt_checkedValues
     * @return {Object}
     */
    setFilterSchoolType(options, opt_checkedValues) {
        var params = this.filterSchoolType_;
        params.data.options = this.getOptions(options);

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
        params.data.options = this.getOptions(options);

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
        params.data.options = this.getOptions(options);

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
        params.data.options = this.getOptions(options);

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
        params.data.options = this.getOptions(options);

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
        params.data.options = this.getOptions(options);

        this.setFilterModal(params, opt_checkedValues);

        return this;
    }

    /**
     * @param {Object} model
     * @return {string}
     * @protected
     * @override
     */
    getLabel(model) {
        return model.displayName || super.getLabel(model);
    }
}

module.exports = SchoolFilterPanel;
