'use strict';

const CourseSearchQuery = require('./CourseSearch');

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
            .field('course_type.category_id', 'categoryId')
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
                'course_type',
                null,
                'course.type = course_type.id'
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
                'course_department.address_id = address.id'
            );
    }

    /**
     * @protected
     */
    setBaseOrder_() { }
}

module.exports = CourseSearchMapQuery;
