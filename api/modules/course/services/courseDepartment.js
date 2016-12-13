'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

let service = {
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
            entityId: null,
            entityType: null
        })),
        courseDepartment;

    if (address) {
        courseDepartment = await(this.getByAddressBrandId(
            address.id,
            brandId
        ));
    }

    if (!courseDepartment) {
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
    let address = await(services.address.addAddress(
            null,
            null, {
                name: data.address
            }
        )),
        departmentData = Object.assign({}, data);
    departmentData.addressId = address.id;

    return await(models.CourseDepartment.update(departmentData, {
        where: {
            id: id
        }
    }));
});

/**
 * @param {number} id
 */
service.delete = async(function(id) {
    let department = await(models.CourseDepartment.findOne({
        where: {
            id: id
        }
    }));
    await(department.destroy());
});


/**
 * is exist department for brand by address
 * @param  {number} brandId
 * @param  {string} addressName "улица Новый Арбат, 24"
 * @return {boolean}
 */
service.isExistDepartment = async(function(brandId, addressName) {
    let res = false;
    let address = await(models.Address.findOne({
        attributes: [ 'id' ],
        where: {
            name: addressName,
        },
        include: [{
            attributes: [ 'brandId', 'name' ],
            model: models.CourseDepartment,
            as: 'courseDepartments',
            where: {
                brandId
            }
        }]
    }));

    if (address && address.courseDepartments) { res = true; }

    return res;
});

module.exports = service;
