var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

var service = {
    name: 'courseSchedule'
};

/**
 * @param {number} courseOptionId
 * @param Array<{
 *     start_time: ?Date,
 *     day: ?number,
 *     duration: ?number
 * }> data
 * @return {Array<CourseSchedule>}
 */
service.bulkCreate = async(function(courseOptionId, data) {
    return await(models.CourseSchedule.bulkCreate(
        data.map(item => {
            item.courseOptionId = courseOptionId;
            return item;
        })
    ));
});

module.exports = service;
