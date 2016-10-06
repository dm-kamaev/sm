'use strict';

const squel = require('squel');

const SearchQuery = require('../../entity/lib/Search'),
    entityType = require('../../entity/enums/entityType'),
    searchType = require('../enums/searchType'),
    addressSearchType = require('../../geo/enums/addressSearchType');

const HIDE_INDEX = {
    COST: 4,
    TIME: 3,
    REGULARITY: 3
};

class CourseSearchQuery extends SearchQuery {
    /**
     * Constructor
     */
    constructor() {
        super();

        /**
         * @private
         * @type {Object}
         */
        this.courseSearchParams_ = squel.expr();

        /**
         * @private
         * @type {number}
         */
        this.courseDataCount_ = 0;

        /**
         * @private
         * @type {boolean}
         */
        this.isWhereString_ = false;
    }

    /**
     * @param {(number|undefined)} sortType
     * @return {Object}
     */
    setSortType(sortType) {
        this.setTypeOrder_(sortType);
        this.setQueriesOrder_();

        return this;
    }

    /**
     * @param {Array<number>} age
     * @return {Object}
     */
    setAge(age) {
        this.addCourseSearchData_(age, searchType.AGE);

        return this;
    }

    /**
     * @param {Array<number>} type
     * @return {Object}
     */
    setType(type) {
        this.addCourseSearchData_(type, searchType.TYPE);

        return this;
    }

    /**
     * @param {Array<number>} cost
     * @return {Object}
     */
    setCost(cost) {
        var hide = cost.find(value => value == HIDE_INDEX.COST);
        this.addCourseSearchData_(cost, searchType.COST_PER_HOUR, hide);

        return this;
    }

    /**
     * @param {Array<number>} weekdays
     * @return {Object}
     */
    setWeekdays(weekdays) {
        this.addCourseSearchData_(weekdays, searchType.WEEKDAYS);

        return this;
    }

    /**
     * @param {Array<number>} time
     * @return {Object}
     */
    setTime(time) {
        var hide = time.find(value => value == HIDE_INDEX.TIME);
        this.addCourseSearchData_(time, searchType.START_TIME, hide);

        return this;
    }

    /**
     * @param {Array<number>} regularity
     * @return {Object}
     */
    setRegularity(regularity) {
        var hide = regularity.find(value =>
            value == HIDE_INDEX.REGULARITY
        );
        this.addCourseSearchData_(
            regularity,
            searchType.LESSONS_PER_WEEK,
            hide
        );

        return this;
    }

    /**
     * @param {Array<number>} formTraining
     * @return {Object}
     */
    setFormTraining(formTraining) {
        this.addCourseSearchData_(formTraining, searchType.GROUP_SIZE);

        return this;
    }

    /**
     * @param {Array<number>} duration
     * @return {Object}
     */
    setDuration(duration) {
        this.addCourseSearchData_(duration, searchType.DURATION);

        return this;
    }

    /**
     * @param {(number|undefined)} areaId
     * @return {Object}
     */
    setArea(areaId) {
        if (areaId) {
            this.addAddressSearchData_(
                [areaId],
                addressSearchType.AREA,
                entityType.COURSE
            );
        }

        return this;
    }

    /**
     * @param {(number|undefined)} metroId
     * @return {Object}
     */
    setMetro(metroId) {
        if (metroId) {
            this.addAddressSearchData_(
                [metroId],
                addressSearchType.METRO,
                entityType.COURSE
            );
        }

        return this;
    }

    /**
     * @param {(number|undefined)} districtId
     * @return {Object}
     */
    setDistrict(districtId) {
        if (districtId) {
            this.addAddressSearchData_(
                [districtId],
                addressSearchType.DISTRICT,
                entityType.COURSE
            );
        }

        return this;
    }

    /**
     * @protected
     */
    setBaseQuery_() {
        this.baseQuery_
            .field('course.id')
            .field('course.name')
            .field('course.description')
            .field('course.brand_id', 'brandId')
            .field('course_brand.name', 'brand')
            .field('course.score')
            .field('course.score_count', 'scoreCount')
            .field('course.total_score', 'totalScore')
            .field('course_option.id', 'courseOptionId')
            .field('course_option.total_cost', 'optionCost')
            .field('course_option.online', 'optionOnline')
            .field('address.id', 'addressId')
            .field('address.name', 'addressName')
            .field('address.coords', 'addressCoords')
            .field('metro.id', 'metroId')
            .field('metro.name', 'metroName')
            .field('area.id', 'areaId')
            .field('area.name', 'areaName')
            .field('course.result_count', 'countResults')
            .left_join(
                'course_brand',
                null,
                'course.brand_id = course_brand.id'
            )
            .left_join(
                'course_option',
                null,
                'course.id = course_option.course_id'
            )
            .left_join(
                'course_option_course_department',
                null,
                'course_option.id = ' +
                    'course_option_course_department.course_option_id'
            )
            .left_join(
                'course_department',
                null,
                'course_option_course_department.course_department_id = ' +
                    'course_department.id'
            )
            .left_join(
                'address',
                null,
                'course_department.id = address.entity_id AND ' +
                    'address.entity_type = \'' +
                    entityType.COURSE_DEPARTMENT + '\''
            )
            .left_join(
                'address_metro',
                null,
                'address.id = address_metro.address_id'
            )
            .left_join(
                'metro',
                null,
                'address_metro.metro_id = metro.id'
            )
            .left_join(
                'area',
                null,
                'address.area_id = area.id'
            );
    }

    /**
     * @private
     */
    setInnerQuery_() {
        this.innerQuery_
            .from('course')
            .field('course.id')
            .field('course.name')
            .field('course.description')
            .field('course.score')
            .field('course.score_count')
            .field('course.total_score')
            .field('course.brand_id')
            .field('COUNT(course.id) OVER()', 'result_count')
            .group('course.id');

        if (!this.isWhereString_) {
            this.innerQuery_.left_join(
                'course_option',
                null,
                'course.id = course_option.course_id'
            );
        }
    }

    /**
     * @private
     * @return {string}
     */
    getAlias_() {
        return 'course';
    }

    /**
     * @private
     * @param {number} sortType
     */
    setTypeOrder_(sortType) {
        // this.baseQuery_
        //     .order('course.score[' + sortType + '] DESC NULLS LAST', null);
        // this.innerQuery_
        //     .order('course.score[' + sortType + '] DESC NULLS LAST', null);
        let order = sortType === '0' ? 'ASC' : 'DESC NULLS LAST';
        this.baseQuery_
            .order(`course_option.total_cost ${order}`, null);
        this.innerQuery_
            .order(`min(course_option.total_cost) ${order}`, null);
    }

    /**
     * @private
     */
    setQueriesOrder_() {
        this.setBaseOrder_();
        this.setInnerOrder_();
    }

    /**
     * @protected
     */
    setBaseOrder_() {
        this.baseQuery_
            // .order('course.total_score', false)
            // .order('course.score DESC NULLS LAST', null)
            .order('course.id', true)
            .order('address_metro.distance');
    }

    /**
     * @private
     */
    setInnerOrder_() {
        this.innerQuery_
            // .order('course.total_score', false)
            // .order('course.score DESC NULLS LAST', null)
            .order('course.id', true);
    }



    /**
     * @private
     * @param {string} searchString
     */
    setStringWhere_(searchString) {
        this.isWhereString_ = true;
        this.setNameWhere_(searchString);
        this.setNameJoinAndGroup_();
    }

    /**
     * @private
     * @param {string} name
     */
    setNameWhere_(name) {
        var searchString = '%' + name + '%';
        this.innerQuery_
            .where(
                squel.expr()
                    .or('course.name ILIKE ?', searchString)
                    .or('metro.name ILIKE ?', searchString)
                    .or('area.name ILIKE ?', searchString)
                    .or('district.name ILIKE ?', searchString)
                    .toString()
            );
    }

    /**
     * @private
     */
    setNameJoinAndGroup_() {
        this.innerQuery_
            .left_join(
                'course_option',
                null,
                'course.id = course_option.course_id'
            )
            .left_join(
                'course_option_course_department',
                null,
                'course_option.id = ' +
                    'course_option_course_department.course_option_id'
            )
            .left_join(
                'course_department',
                null,
                'course_option_course_department.course_department_id = ' +
                    'course_department.id'
            )
            .left_join(
                'address',
                null,
                'course_department.id = address.entity_id AND ' +
                    'address.entity_type = \'' +
                    entityType.COURSE_DEPARTMENT + '\''
            )
            .left_join(
                'address_metro',
                null,
                'address.id = address_metro.address_id'
            )
            .left_join(
                'metro',
                null,
                'address_metro.metro_id = metro.id'
            )
            .left_join(
                'area',
                null,
                'address.area_id = area.id'
            )
            .left_join(
                'district',
                null,
                'area.district_id = district.id'
            )
            .group('course.id');
    }

    /**
     * @private
     */
    updateInnerWhere_() {
        if (this.addressDataCount_) {
            this.innerQuery_
                .where(
                    'course.id IN (' + this.generateAddressDataQuery_() + ')'
                );
        }

        if (this.courseDataCount_) {
            this.innerQuery_
                .where(
                    'course.id IN (' + this.generateCourseDataQuery_() + ')'
                );
        }
    }

    /**
     * @private
     * @param {Array<number>} values
     * @param {string} type
     * @param {boolean=} opt_hide
     */
    addCourseSearchData_(values, type, opt_hide) {
        if (values && values.length) {
            var condition = squel.expr()
                .and(
                    'course_search_data.type = ?',
                    type
                );
            if (opt_hide) {
                condition.and('course_search_data.values IS NOT NULL');
            } else {
                condition.and(
                    'course_search_data.values && ' +
                    this.intArrayToSql_(values)
                );
            }
            this.courseSearchParams_.or(
                condition
            );

            this.courseDataCount_++;
        }
    }

    /**
     * @private
     * @return {Object}
     */
    generateCourseDataQuery_() {
        return squel.select()
            .from('course_search_data')
            .field('DISTINCT course_id')
            .where(
                this.courseSearchParams_.toString()
            )
            .group('course_id')
            .having(
                'COUNT(DISTINCT id) = ' + this.courseDataCount_
            )
            .toString();
    }
}

module.exports = CourseSearchQuery;
