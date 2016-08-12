var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

var service = {
    name: 'course'
};

/**
 * @param {{
 *     name: string,
 *     description: ?string,
 *     brandName: string,
 *     options: Array<{
 *         costPerHour: ?number,
 *         online: (boolean|null),
 *         age: ?number,
 *         group: ?boolean,
 *         teacher: ?string,
 *         schedule: Array<{
 *             startTime: ?string,
 *             day: ?number,
 *             duration: ?number
 *         }>,
 *         departments: Array<{
 *             description: ?string,
 *             address: string,
 *             area: string
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
            description: data.description
        }));
    course.options = data.options.map(option =>
        await(services.courseOption.create(course.id, option))
    );

    return course;
});

module.exports = service;
