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
 *     name: ?string,
 *     description: ?string,
 *     phone: ?string,
 *     address: string
 * }} data
 * @return {CourseDepartment}
 */
service.findOrCreate = async(function(data) {
    var address = await(services.address.getAddress({
            name: data.address,
            entityType: entityType.COURSE_DEPARTMENT
        })),
        courseDepartment;

    if (address) {
        courseDepartment = await(this.getById(address.entityId));
    } else {
        courseDepartment = await(this.create({
            name: data.name,
            description: data.description,
            phone: data.phone,
            address: data.address
        }));
    }

    return courseDepartment;
});

/**
 * @param {{
 *     description: ?string,
 *     phone: ?string,
 *     address: string,
 *     areaId: number
 * }} data
 * @return {CourseDepartment}
 */
service.create = async(function(data) {
    var courseDepartment = await(models.CourseDepartment.create({
            name: data.name,
            description: data.description,
            phone: data.phone
        })),
        address = await(services.address.addAddress(
            courseDepartment.id,
            entityType.COURSE_DEPARTMENT, {
                name: data.address
            }
        ));
    courseDepartment.address = address;

    return courseDepartment;
});

/**
 * @param {number} id
 * @return {CourseDepartment}
 */
service.getById = async(function(id) {
    return await(models.CourseDepartment.find({
        where: {
            id: id
        },
        include: [{
            model: models.Address,
            as: 'address'
        }]
    }));
});

module.exports = service;
