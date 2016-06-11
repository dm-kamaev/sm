var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sequelizeInclude = require('../../../components/sequelizeInclude');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
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
 * @param {number} school_id
 * @param {{
 *     name: string,
 *     coords?: array
 * }} data
 */
exports.addAddress = async(function(school_id, data) {
    var addressBD = await(services.address.getAddress({
        name: data.name
    }));
    var address;

    if (addressBD) {
        console.log('Address:'.yellow, data.name);
        console.log('is alredy binded to school '.yellow +
            'with id:'.yellow, addressBD.school_id);
        address = addressBD;
    } else {
        data.school_id = school_id;
        if (!data.coords) {
            data.coords = await(
                    services.yapi.getCoords('Москва, ' + data.name));
        }
        address = await(models.Address.create(data));
    }
    return address;
});


/**
 * Update address data
 * @param {number} address_id
 * @param {{
 *     name?: string,
 *     coords?: array,
 *     isSchool?: bool
 * }} data
 */
exports.update = async(function(address_id, data) {
    var address = await(services.address.getAddress({id: address_id}));
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
 * @param {number} address_id
 * @return {Object} instances of Address model
 */
exports.getById = async(function(address_id) {
    var includeParams = {
        departments: true
    };
    return await(models.Address.findOne({
        where: {id: address_id},
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
            as: 'metroStations'
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
 * @param {number} schoolId
 * @param {bool} isSchool
 * @param {bool} order - order by distance
 */
exports.getWithDepartmentsWithMetro = async(function(
    schoolId,
    isSchool,
    order
) {
    var params = {
        include: [{
            model: models.Department,
            as: 'departments'
        }, {
            model: models.AddressMetro,
            as: 'addressMetroes',
            include: [{
                model: models.Metro,
                as: 'metroStation'
            }]
        }],
        where: {
            schoolId: schoolId
        }
    };

    if (isSchool) {
        params.where.isSchool = isSchool;
    }

    if (order) {
        params.order = [[
            {
                model: models.AddressMetro,
                as: 'addressMetroes'
            },
            'distance',
            'ASC'
        ]];
    }

    return models.Address.findAll(params);
});
