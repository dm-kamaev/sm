var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

var service = {
    name: 'courseOption'
};

/**
 * @param {Course} course
 * @param {{
 *     name: ?string,
 *     description: ?string,
 *     totalCost: ?number,
 *     costPerHour: ?number,
 *     online: ?boolean,
 *     age: ?number,
 *     maxGroupSize: ?integer,
 *     currentGroupSize: ?integer,
 *     nativeSpeaker: ?boolean,
 *     startDate: ?string
 *     duration: ?string,
 *     openSchedule: ?boolean,
 *     schedule: ?Array<{
 *         startTime: ?string,
 *         endTime: ?string,
 *         day: number
 *     }>,
 *     departments: Array<{
 *         name: ?string,
 *         description: ?string,
 *         phone: ?string,
 *         address: string,
 *         area: string
 *     }
 * }} data
 * @return {CourseOption}
 */
service.create = async(function(course, data) {
    var courseOption = await(models.CourseOption.create({
        courseId: course.id,
        name: data.name,
        description: data.description,
        totalCost: data.totalCost,
        costPerHour: data.costPerHour,
        online: data.online,
        age: data.age,
        maxGroupSize: data.maxGroupSize,
        currentGroupSize: data.currentGroupSize,
        nativeSpeaker: data.nativeSpeaker,
        startDate: data.startDate,
        duration: data.duration,
        openSchedule: data.openSchedule
    }));
    if (data.schedule) {
        courseOption.schedule = await(services.courseSchedule.bulkCreate(
            courseOption.id,
            data.schedule
        ));
    }
    await(courseOption.setDepartments(data.departments.map(department =>
        await(services.courseDepartment.findOrCreate(
            course.brandId,
            department
        ))
    )));

    return courseOption;
});

/**
 * @param  {number} courseId
 * @return {Array<CourseOption>}
 */
service.getByCourseId = async(function(courseId) {
    return await(models.CourseOption.findAll({
        where: {
            courseId: courseId
        },
        include: [{
            model: models.CourseSchedule,
            as: 'schedule'
        }, {
            model: models.CourseDepartment,
            as: 'departments',
            through: 'course_option_course_department'
        }]
    }));
});

/**
 * @param  {number} id
 * @return {CourseOption}
 */
service.getById = async(function(id) {
    return await(models.CourseOption.findAll({
        where: {
            id: id
        },
        include: [{
            model: models.CourseSchedule,
            as: 'schedule'
        }, {
            model: models.CourseDepartment,
            as: 'departments',
            through: 'course_option_course_department'
        }]
    }));
});

module.exports = service;
