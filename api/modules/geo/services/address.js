var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sequelizeInclude = require('../../../components/sequelizeInclude');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
var geoTools = require('../../../../console/modules/geoTools/geoTools');
var logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

exports.name = 'address';

exports.getTest = async(() => {
    return await(models.Address.findOne({
        include: [{
            all: true,
            nested: true
        }]
    }));
});


/**
 * Added new address
 * @param {number} entityId
 * @param {string} entityType
 * @param {{
 *     name: string,
 *     coords?: array
 * }} data
 * @return {Address}
 */
exports.addAddress = async(function(entityId, entityType, data) {
    var addressBD = await(services.address.getAddress({
        name: data.name,
        entityType: entityType
    }));
    var address;

    if (addressBD) {
        logger.info('Address:' + data.name);
        logger.info(
            'is already binded to ' + entityType +
            ' with id:' + addressBD.school_id
        );
        address = addressBD;
    } else {
        data.entityId = entityId;
        data.entityType = entityType;
        if (!data.coords) {
            data.coords = await(services.yapi.getCoords(
                'Москва, ' + data.name,
                true
            ));
        }
        data.areaId = data.areaId || await(services.area.create({
            name: await(geoTools.getArea(data.coords)) // area name from coords
        }))[0].id; // area id

        address = await(models.Address.create(data));

        var metros = await(geoTools.getMetros(data.coords, 3));
        await(this.setMetro(address, metros));

        await(this.setDistance(address));
    }
    return address;
});


/**
 * Update address data
 * @param {number} addressId
 * @param {{
 *     name?: string,
 *     coords?: array,
 *     isSchool?: bool
 * }} data
 */
exports.update = async(function(addressId, data) {
    var address = await(services.address.getAddress({id: addressId}));
    return await(address.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of Address model
 */
exports.getAll = async(function() {
    return await(models.Address.findAll());
});


/**
 * Get all data by data
 * @param {number} addressId
 * @return {Object} instances of Address model
 */
exports.getById = async(function(addressId) {
    var includeParams = {
        departments: true
    };
    return await(models.Address.findOne({
        where: {id: addressId},
        include: sequelizeInclude(includeParams)
    }));
});


exports.getAddress = async(function(params) {
    var includeParams = {
        departments: true
    };
    return await(models.Address.findOne({
        where: params,
        include: sequelizeInclude(includeParams)
    }));
});


exports.getAllWithMetro = async(function() {
    return await(models.Address.findAll({
        include: [{
            model: models.Metro,
            // through: 'address_metro',
            as: 'metro'
        }]
    }));
});


/**
 * Get address departments
 * @param  {Object} address instance
 * @return {Array} department instances array
 */
exports.getDepartments = function(address) {
    return await(address.getDepartments());
};

/**
 * Returns metro from array<address>/address
 * @param {array<object>|object} address
 * @return {array<string>}
 */
exports.getMetro = function(address) {
    if (Array.isArray(address)) {
        var metro = {};
        address.forEach(adr => {
            adr.metroStations.forEach(m => {
                metro[m.id] = m.name.replace('метро ', '');
            });
        });
        return Object.keys(metro)
            .map(id => {
                return metro[id];
            });
    } else {
        return address.metroStations.map(metro => {
            return metro.name.replace('метро ', '');
        });
    }
};

exports.setMetro = async(function(address, metroArr) {
    metroArr.forEach(metro => {
        var ourMetro = await(models.Metro.findOne({
            where: {
                name: metro.name
            }
        }));
        if (ourMetro) {
            await(address.addMetroStation(ourMetro));
        } else {
            await(address.createMetroStation({
                name: metro.name,
                coords: metro.coords
            }));
        }
    });
});


/**
 * Associates existing are and and address
 * @param {String} area
 * @param {String} address
 */
exports.setArea = async((area, address) => {
    var areaInstance = await(models.Area.findOne({
        where: {
            name: area
        }
    }));
    var addressInstance = await(models.Address.findAll({
        where: {
            name: address
        }
    }));

    addressInstance.forEach(item => {
        item.setArea(areaInstance);
    });
});

/**
 * @param {number} entityId
 * @param {string} entityType
 * @param {{
 *     isSchool: boolean,
 *     order: boolean - order by distance
 * }} params
 */
exports.getWithDepartmentsWithMetro = async(function(
    entityId,
    entityType,
    params
) {
    var addressParams = {
        include: [{
            model: models.Department,
            as: 'departments'
        }, {
            model: models.AddressMetro,
            as: 'addressMetroes',
            include: [{
                model: models.Metro,
                as: 'metro'
            }]
        }],
        where: {
            entityId: entityId,
            entityType: entityType
        }
    };

    if (params.isSchool) {
        addressParams.where.isSchool = params.isSchool;
    }

    if (params.order) {
        addressParams.order = [[
            {
                model: models.AddressMetro,
                as: 'addressMetroes'
            },
            'distance',
            'ASC'
        ]];
    }

    return models.Address.findAll(addressParams);
});

/**
 * @return {Array<Object>}
 */
exports.getAllWithSearchData = async(function() {
    return models.Address.findAll({
        attributes: ['id', 'entityId', 'entityType', 'areaId'],
        include: [{
            model: models.AddressSearchData,
            as: 'searchData',
            attributes: ['id', 'type', 'entityId']
        }, {
            model: models.Department,
            as: 'departments',
            attributes: ['educationalGrades']
        }, {
            model: models.AddressMetro,
            as: 'addressMetroes',
            attributes: ['distance', 'metroId']
        }, {
            model: models.Area,
            as: 'area',
            attributes: ['id'],
            include: [{
                model: models.District,
                as: 'district',
                attributes: ['id']
            }]
        }],
        order: [[
            {
                model: models.AddressMetro,
                as: 'addressMetroes'
            },
            'distance',
            'ASC'
        ]]
    });
});

/**
 * @param {Address} address
 * @return {Array<AddressMetro>}
 */
exports.setDistance = async(function(address) {
    var addressMetros = await(models.AddressMetro.findAll({
        where: {
            addressId: address.id,
        }
    }));

    return addressMetros.map(addressMetro => {
        var metroCoords = await(services.metro.getCoords(addressMetro.metroId))
            .reverse();
        return await(addressMetro.update({
            distance: (
                geoTools.distance(address.coords, metroCoords)
                    .toFixed(3) * 1000
            ).toFixed(0)
        }));
    });
});
