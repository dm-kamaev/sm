'use strict';

const CourseSearchQuery = require('./CourseSearch');
const entityType = require('../../entity/enums/entityType');

class CourseSearchMapQuery extends CourseSearchQuery {


    /**
     * @protected
     * @override
     */
    setBaseQuery_() {
        this.baseQuery_
            .field('course.id')
            .field('course.name')
            .field('course.description')
            .field('course.brand_id', 'brandId')
            .field('course_brand.name', 'brand')
            .field('course.total_score', 'totalScore')
            .field('address.id', 'addressId')
            .field('address.name', 'addressName')
            .field('address.coords', 'addressCoords')
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
            );
    }
}

module.exports = CourseSearchMapQuery;
