'use strict';

const lodash = require('lodash');

const searchType = require('../../../api/modules/course/enums/searchType.js'),
    services = require('../../../app/components/services').all;

const ALL_WEEKDAYS = [0, 1, 2, 3, 4, 5, 6],
    ALL_TIMES = [0, 1, 2, 3],
    ALL_REGULARITIES = [0, 1, 2];

class CourseActualizer {
    /**
     * @param {Object} course
     * @param {Array<Object>} courseSearchData
     */
    constructor(course, courseSearchData) {
        /**
         * @private
         * @type {Object}
         */
        this.course_ = course;

        /**
         * @private
         * @type {Array<Object>}
         */
        this.courseSearchData_ = courseSearchData;
    }

    /**
     * Main method
     */
    actualize() {
        this.actualizeAge_();
        this.actualizeType_();
        this.actualizeCategory_();
        this.actualizeCost_();
        this.actualizeWeekdays_();
        this.actualizeTime_();
        this.actualizeLessonsPerWeek_();
        this.actualizeGroupSize_();
        this.actualizeDuration_();
    }

    /**
     * @private
     */
    actualizeAge_() {
        var age = this.getAge_(this.course_.courseOptions);
        this.actualizeData_(age, searchType.AGE);
    }

    /**
     * @private
     */
    actualizeType_() {
        var type = this.getType_(this.course_);
        this.actualizeData_(type, searchType.TYPE);
    }

    /**
     * Update category data in search table
     * @private
     */
    actualizeCategory_() {
        let category = this.getCategory_(this.course_);
        this.actualizeData_(category, searchType.CATEGORY);
    }

    /**
     * @private
     */
    actualizeCost_() {
        var cost = this.getCost_(this.course_.courseOptions);
        this.actualizeData_(cost, searchType.COST_PER_HOUR);
    }

    /**
     * @private
     */
    actualizeWeekdays_() {
        var weekdays = this.getWeekdays_(this.course_.courseOptions);
        this.actualizeData_(weekdays, searchType.WEEKDAYS);
    }

    /**
     * @private
     */
    actualizeTime_() {
        var time = this.getTime_(this.course_.courseOptions);
        this.actualizeData_(time, searchType.START_TIME);
    }

    /**
     * @private
     */
    actualizeLessonsPerWeek_() {
        var lessonsPerWeek = this.getLessonsPerWeek_(
            this.course_.courseOptions
        );
        this.actualizeData_(lessonsPerWeek, searchType.LESSONS_PER_WEEK);
    }

    /**
     * @private
     */
    actualizeGroupSize_() {
        var groupSize = this.getGroupSize_(this.course_.courseOptions);
        this.actualizeData_(groupSize, searchType.GROUP_SIZE);
    }

    /**
     * @private
     */
    actualizeDuration_() {
        var duration = this.getDuration_(this.course_.courseOptions);
        this.actualizeData_(duration, searchType.DURATION);
    }

    /**
     * @param {Array<number>} values
     * @param {string} type
     */
    actualizeData_(values, type) {
        if (values && values.length) {
            let searchData = this.getSearchData_(type);
            if (!searchData) {
                services.courseSearchData.create({
                    courseId: this.course_.id,
                    values: values,
                    type: type
                });
            } else if (!lodash.isEqual(values, searchData.values)) {
                services.courseSearchData.update(
                    searchData.id, {
                        values: values
                    }
                );
            }
        }
    }

    /**
     * @private
     * @param {string} type
     * @return {Object}
     */
    getSearchData_(type) {
        return this.courseSearchData_.find(searchItem =>
            searchItem.type === type && searchItem.courseId === this.course_.id
        );
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {Array<number>}
     */
    getAge_(options) {
        return lodash
            .chain(this.course_.courseOptions.map(option => option.age))
            .flatten()
            .uniq()
            .value();
    }

    /**
     * Return course type
     * @private
     * @param {Object} course
     * @return {Array<number>}
     */
    getType_(course) {
        return course.type ?
            [course.type] :
            null;
    }

    /**
     * Return course category
     * @param {models.Course} course
     * @return {Array<number>}
     * @private
     */
    getCategory_(course) {
        return course.courseType.categoryId ?
            [course.courseType.categoryId] :
            null;
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {Array<number>}
     */
    getCost_(options) {
        return lodash.uniq(options.map(option =>
            this.transormCost_(option.costPerHour)
        ));
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {Array<number>}
     */
    getWeekdays_(options) {
        return this.isOpenSchedule(options) ?
            ALL_WEEKDAYS :
            lodash
                .chain(options.map(option =>
                    option.schedule.map(schedule => schedule.day)
                ))
                .flatten()
                .uniq()
                .value();
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {Array<number>}
     */
    getTime_(options) {
        return this.isOpenSchedule(options) ?
            ALL_TIMES :
            lodash
                .chain(options.map(option => option.schedule.map(schedule =>
                    this.transformTime_(schedule.startTime)
                )))
                .flatten()
                .uniq()
                .value();
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {Array<number>}
     */
    getLessonsPerWeek_(options) {
        return this.isOpenSchedule(options) ?
            ALL_REGULARITIES :
            lodash.uniq(options.map(option =>
                option.schedule.length
            ));
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {Array<number>}
     */
    getGroupSize_(options) {
        return lodash.uniq(options.map(option =>
            this.transfomGroupSize_(option.maxGroupSize, option.online)
        ));
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {Array<number>}
     */
    getDuration_(options) {
        return lodash.uniq(options.map(option =>
            this.transformDuration_(option.duration)
        ));
    }

    /**
     * @private
     * @param {Array<Object>} options
     * @return {boolean}
     */
    isOpenSchedule(options) {
        return options.some(option => option.openSchedule);
    }

    /**
     * @private
     * @param {number} cost
     * @return {number}
     */
    transormCost_(cost) {
        var result;
        if (cost === 0) {
            result = 0;
        } else if (cost < 1000) {
            result = 1;
        } else if (cost >= 1000 && cost < 2000) {
            result = 2;
        } else if (cost >= 2000) {
            result = 3;
        }
        return result;
    }

    /**
     * @private
     * @param {string} time
     * @return {number}
     */
    transformTime_(time) {
        var hour = time && ~~time.split(':')[0],
            result;

        if (hour < 14) {
            result = 0;
        } else if (hour >= 14 && hour < 18) {
            result = 1;
        } else if (hour >= 18) {
            result = 2;
        }

        return result;
    }

    /**
     * @private
     * @param {number} maxGroupSize
     * @param {boolean} online
     * @return {number}
     */
    transfomGroupSize_(maxGroupSize, online) {
        var result;
        if (online) {
            result = 2;
        } else if (maxGroupSize === 1) {
            result = 0;
        } else {
            result = 1;
        }
        return result;
    }

    /**
     * @private
     * @param {number} duration
     * @return {number}
     */
    transformDuration_(duration) {
        var result;
        if (duration < 1) {
            result = 0;
        } else if (duration >= 1 && duration <= 2) {
            result = 1;
        } else {
            result = 2;
        }
        return result;
    }
}

module.exports = CourseActualizer;
