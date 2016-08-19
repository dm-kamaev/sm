'use strict';

var SearchQuery = require('../../entity/lib/Search'),
    entityType = require('../../entity/enums/entityType');

class CourseSearchQuery extends SearchQuery {
    /**
     * @private
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
            .field('course_option.cost_per_hour', 'optionCost')
            .field('course_option.online', 'optionOnline')
            .field('address.id', 'addressId')
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
            .field('COUNT(course.id) OVER()', 'result_count');
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
     * @param {number} scoreSortType
     */
    setScoreTypeOrder_(scoreSortType) {
        this.baseQuery_
            .order('course.score[' + scoreSortType + '] DESC NULLS LAST', null);
        this.innerQuery_
            .order('course.score[' + scoreSortType + '] DESC NULLS LAST', null);
    }

    /**
     * @private
     */
    setQueriesOrder_() {
        this.setBaseOrder_();
        this.setInnerOrder_();
    }

    /**
     * @private
     */
    setBaseOrder_() {
        this.baseQuery_
            .order('course.total_score', false)
            .order('course.score DESC NULLS LAST', null)
            .order('course.id', true);
    }

    /**
     * @private
     */
    setInnerOrder_() {
        this.innerQuery_
            .order('course.total_score', false)
            .order('course.score DESC NULLS LAST', null)
            .order('course.id', true);
    }
}

module.exports = CourseSearchQuery;
