var async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    squel = require('squel');

var sequelize = require('../../../../app/components/db'),
    models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

var service = {
    name: 'course'
};

/**
 * @param {{
 *     name: string,
 *     description: ?string,
 *     fullDescription: ?string,
 *     about: ?string,
 *     entranceExam: ?string,
 *     learningOutcome: ?string,
 *     leadType: string,
 *     brandName: string,
 *     type: ?string,
 *     options: Array<{
 *         name: ?string,
 *         description: ?string,
 *         totalCost: ?number,
 *         costPerHour: ?number,
 *         online: ?boolean,
 *         age: ?number,
 *         maxGroupSize: ?integer,
 *         currentGroupSize: ?integer,
 *         nativeSpeaker: ?boolean,
 *         startDate: ?string,
 *         duration: ?string,
 *         schedule: Array<{
 *             startTime: ?string,
 *             endTime: ?string,
 *             day: ?number
 *         }>,
 *         departments: Array<{
 *             name: ?string,
 *             description: ?string,
 *             phone: ?string,
 *             address: string
 *         }
 *     }>
 * }} data
 * @return {Course}
 */
service.create = async(function(data) {
    var brand = await(services.courseBrand.create({
            name: data.brandName
        })),
        course = await(models.Course.create({
            name: data.name,
            brandId: brand.id,
            type: data.type,
            description: data.description,
            fullDescription: data.fullDescription,
            about: data.about,
            entranceExam: data.entranceExam,
            learningOutcome: data.learningOutcome,
            leadType: data.leadType
        }));
    course.options = data.options.map(option =>
        await(services.courseOption.create(course.id, option))
    );

    return course;
});

/**
 * @param {Object} searchParams
 * @param {number=} opt_limit
 * @return {Array<Object>}
 */
service.list = async(function(searchParams, opt_limit) {
    var searchString = services.courseSearch.getSearchSql(
        searchParams,
        opt_limit
    );

    var courses = await(sequelize.query(
        searchString, {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return courses;
});

/**
 * @param {number} departmentId
 * @return {Array<number>}
 */
service.findByDepartmentId = async(function(departmentId) {
    var query = squel.select()
        .from('course')
        .field('DISTINCT course.id')
        .left_join('course_option', null, 'course.id = course_option.course_id')
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
        .where('course_department_id = ' + departmentId)
        .toString();
    var result = await(sequelize.query(
        query, {
            type: sequelize.QueryTypes.SELECT
        }
    ));

    return result.map(item => item.id);
});

module.exports = service;
