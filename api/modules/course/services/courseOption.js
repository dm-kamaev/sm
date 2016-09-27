var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

var service = {
    name: 'courseOption'
};

/**
 * @param {number} courseId
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
 *     schedule: Array<{
 *         startTime: ?string,
 *         endTime: ?string,
 *         day: ?number
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
service.create = async(function(courseId, data) {
    var courseOption = await(models.CourseOption.create({
        courseId: courseId,
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
        duration: data.duration
    }));
    courseOption.schedule = await(services.courseSchedule.bulkCreate(
        courseOption.id,
        data.schedule
    ));
    await(courseOption.setDepartments(data.departments.map(department =>
        await(services.courseDepartment.findOrCreate(department))
    )));

    return courseOption;
});

module.exports = service;
