var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    entityType = require('../../entity/enums/entityType');

var service = {
    name: 'courseDepartment'
};

/**
 * @param {{
 *     description: ?string,
 *     address: string,
 *     area: string
 * }} data
 * @return {CourseDepartment}
 */
service.create = async(function(data) {
    var area = await(services.area.create({name: data.area})),
        courseDepartment = await(models.CourseDepartment.findOrCreate({
            include: [{
                model: models.Address,
                as: 'address'
            }],
            where: {
                addressId:
            }
        }));
    console.log(area, courseDepartment); process.exit();
    var courseDepartment = await(models.CourseDepartment.create({
        description: data.description
    }));
    var addresses = data.addresses.map(address => {
        var area = services.area.create(area);
        return await(services.address.addAddress(
            courseDepartment.id,
            entityType.COURSE_DEPARTMENT, {
                name: address.name,
                areaId: area.id
            }
        ));
    });
    courseDepartment.addresses = addresses;

    return courseDepartment;
});

module.exports = service;
