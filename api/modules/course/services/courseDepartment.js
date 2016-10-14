'use strict';

var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

var service = {
    name: 'courseDepartment'
};

/**
 * @param {number} brandId
 * @param {{
 *     name: ?string,
 *     description: ?string,
 *     phone: ?string,
 *     address: string
 * }} data
 * @return {CourseDepartment}
 */
service.findOrCreate = async(function(brandId, data) {
    var address = await(services.address.getAddress({
            name: data.address,
            entityType: null
        })),
        courseDepartment;

    if (address) {
        courseDepartment = await(this.getByAddressBrandId(
            address.id,
            brandId
        ));
    }
    if (!address && !courseDepartment) {
        courseDepartment = await(this.create(
            brandId, {
                name: data.name,
                description: data.description,
                phone: data.phone,
                address: data.address
            }
        ));
    }

    return courseDepartment;
});

/**
 * @param {number} brandId
 * @param {{
 *     description: ?string,
 *     phone: ?string,
 *     address: string,
 *     areaId: number,
 *     brandId: number
 * }} data
 * @return {CourseDepartment}
 */
service.create = async(function(brandId, data) {
    let address = await(services.address.addAddress(
        null,
        null, {
            name: data.address
        }
    ));

    return await(models.CourseDepartment.create({
        name: data.name,
        description: data.description,
        phone: data.phone,
        brandId: brandId,
        addressId: address.id
    }));
});

/**
 * @param {number} id
 * @return {CourseDepartment}
 */
service.getByAddressBrandId = async(function(addressId, brandId) {
    return await(models.CourseDepartment.findOne({
        where: {
            addressId: addressId,
            brandId: brandId
        },
        include: [{
            model: models.Address,
            as: 'address'
        }]
    }));
});

/**
 * @param  {number} brandId
 * @return {Array<CourseDepartment>}
 */
service.getByBrandId = async(function(brandId) {
    return await(models.CourseDepartment.findAll({
        attributes: ['id', 'name', 'phone', 'updated_at'],
        where: {
            brandId: brandId
        },
        include: [{
            attributes: ['name'],
            model: models.Address,
            as: 'address'
        }]
    }));
});

/**
 * @param  {number} id
 * @return {CourseDepartment}
 */
service.getById = async(function(id) {
    return await(models.CourseDepartment.findOne({
        attributes: ['id', 'name', 'phone', 'updated_at'],
        where: {
            id: id
        },
        include: [{
            attributes: ['name'],
            model: models.Address,
            as: 'address'
        }]
    }));
});

/**
 * @param  {number} id
 * @param  {Object} data
 * @return {Array<number>}
 */
service.update = async(function(id, data) {
    return await(models.CourseDepartment.update(data, {
        where: {
            id: id
        }
    }));
});

module.exports = service;
