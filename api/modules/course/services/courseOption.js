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
 *     costPerHour: ?number,
 *     online: (boolean|null),
 *     age: ?number,
 *     group: ?boolean,
 *     teacher: ?string,
 *     schedule: Array<{
 *         start_time: ?Date,
 *         day: ?number,
 *         duration: ?number
 *     }>
 * }} data
 * @return {CourseOption}
 */
service.create = async(function(courseId, data) {
    var courseOption = await(models.CourseOption.create({
        courseId: courseId,
        costPerHour: data.costPerHour,
        online: data.online,
        age: data.age,
        group: data.group,
        teacher: data.teacher
    }));
    courseOption.schedule = await(services.courseSchedule.bulkCreate(
        courseOption.id,
        data.schedule
    ));

    return courseOption;
});

module.exports = service;
