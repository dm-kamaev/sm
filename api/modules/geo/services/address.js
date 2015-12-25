var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var common = require.main.require('./console/common');
exports.name = 'address';


exports.getTest = async(() => {
    return await(models.Address.findOne({
        include:[{
            all:true,
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
    var addressBD = await(services.address.getAddress({name: data.name}));
    var address;

    if (addressBD) {
        console.log('Address:'.yellow, data.name);
        console.log('is alredy binded to school '.yellow +
            'with id:'.yellow, addressBD.school_id);
        address = addressBD;
    }
    else {
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
 *     coords?: array
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
        include:[{
            model: models.Metro,
            //through: 'address_metro',
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


exports.getMetro = function(address) {
    if (Array.isArray(address)) {
        var metro = {};
        address.forEach(adr => {
            adr.metroStations.forEach(m => {
                metro[m.id] = m.name;
            });
        });
        return Object.keys(metro)
            .map(id => {
                return metro[id];
            });
    } else {
        return address.metroStations.map(metro => {
            return metro.name;
        });
    }
};

exports.setMetro = async(function(address, metroArr) {
    //console.log(address);
    metroArr.forEach(metro => {
        var ourMetro = await (models.Metro.findOne({
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
exports.setArea = async ((area, address) => {
    var area = await(models.Area.findOne({
        where: {
            name: area
        }
    }));
    var address = await(models.Address.findAll({
        where: {
            name: address
        }
    }));

    address.forEach( (item) => {
        item.setArea(area);
    } );
});

exports.getCoords = function(addresses) {
    return addresses.map(adr => {
        return {
            lat: adr.coords[0],
            lng: adr.coords[1]
        };
    });
};

exports.list = async ( function(opt_params) {
    var params = opt_params || {};

    var searchConfig = {
        include: [
            {
                model: models.Address,
                as: 'addresses'
            },
            {
                model: models.Rating,
                as: 'ratings'
            }
        ]
    };

    var schools = await(models.School.findAll(searchConfig));

    return schools.map(school => {
        var sumScore = school.ratings
            .map(rating => rating.score)
            .reduce((context, coords) => {
                coords.forEach((value, index) => {
                    if (value) {
                        context.count[index]++;
                        context.sum[index] += value;
                        context.res[index] = context.sum[index] / context.count[index];
                    }
                });

                return context;
            }, {
                sum: [0, 0, 0, 0],
                count: [0, 0, 0, 0],
                res: [0, 0, 0, 0]
            }).res;

        return {
            id: school.id,
            coords: school.addresses.map(adr => {
                return {
                    lat: adr.coords[0],
                    lng: adr.coords[1]
                };
            }),
            type: '',
            name: school.name,
            totalScore: sumScore.reduce((context, value) => {
                if (value) {
                    context.sum += value;
                    context.count++;
                    context.res = context.sum / context.count;
                }
                return context;
            }, {
                sum: 0,
                count: 0,
                res: 0
            }).res
        }
    });
});
