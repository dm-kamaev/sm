var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize = require('../../../../app/components/db');
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

    addressInstance.forEach( (item) => {
        item.setArea(areaInstance);
    } );
});

/**
 * Getter for school address for map
 * @param {Array.<Object>} addresses
 * @return {Object}
 */
exports.getAddress = function(addresses) {
    var getStages = function(departments) {
        var result = [];
        var unical = {};
        var deps = departments || [];

        for (var i = 0, n = deps.length, dep; i < n; i++) {
            dep = deps[i];
            if (dep != undefined && dep.stage && !unical[dep.stage]) {
                unical[dep.stage] = true;
                result.push(dep.stage);
            }
        }

        return result;
    };

    return addresses.map(adr => {
        return {
            lat: adr.coords[0],
            lng: adr.coords[1],
            name: adr.name,
            stages: getStages(adr.departments)
        }
    });
};

exports.listMapPoints = async (function() {
    // var searchConfig = {
    //     include: [{
    //         model: models.Address,
    //         as: 'addresses',
    //         attributes: [
    //             'name',
    //             'coords'
    //         ],
    //         include: [{
    //             model: models.Department,
    //             as: 'departments',
    //             attributes: [
    //                 'stage'
    //             ],
    //             where: {
    //                 $or: [
    //                     {stage: 'Основное и среднее'},
    //                     {stage: 'Начальное образование'}
    //                 ]
    //             }
    //         }],
    //         having: ['COUNT(?) > ?', '`departments`.`id`', 0]
    //     }],
    //     attributes: [
    //         'id',
    //         'name',
    //         'url'
    //     ]
    // };
    //
    // var schoolz = await(models.School.findAll(searchConfig));
    var sqlQuery = "SELECT school.id, school.name, school.url, " +
        "school.total_score AS \"totalScore\", address.name AS \"adrName\"," +
        "address.coords, department.stage FROM school " +
        "INNER JOIN address ON school.id = address.school_id " +
        "INNER JOIN department ON address.id = department.address_id " +
        "WHERE department.stage IN ('Основное и среднее', " +
        "'Начальное образование')",
        schools = sequelize.query(sqlQuery, { model: models.School });
        // .then(schools => {
        //     return schools;
        // });
        return schools;
    // return schools;
});
