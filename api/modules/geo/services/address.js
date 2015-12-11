var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
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
 * Added new address row
 * @param {Object} school instznce
 * @param {Object} params
 */
exports.addAddress = async((school, params) => {
    params.coords = await(exports.getCoords(params.name));
    return await(models.Address.create(params).then(instance => {
                return school.addAddresses(instance);
            })).addresses;
});


exports.getAll = async(() => {
    return await(models.Address.findAll());
});


exports.getAllWithMetro = async(() => {
    return await(models.Address.findAll({
        include:[{
            model: models.Metro,
            //through: 'address_metro',
            as: 'metroStations'
            }]
    }));
});


exports.getAddress = async(params => {
    var includeParams = {
            departments: true
        };
    return await(models.Address.findOne({
        where: params,
        include: sequelizeInclude(includeParams)
    }));
});


/**
 * Get address coordinates
 * @param  {string} addressName
 */
exports.getCoords = async((addressName) => {
    var bdAddress = await(exports.getAddress({name: addressName}));
    var result;
    if (bdAddress) {
        result = bdAddress.coords;
    }
    else {
        result = await(services.yapi.getCoords('Москва, ' + addressName));
    }
    return result;
});


exports.getMetro = (address) => {
    return address.metroStations;
};

/**
 * Get address departments
 * @param  {Object} address instance
 */
exports.getDepartments = (address) => {
    return await(address.getDepartments());
};


exports.updateCoords = async((addresInst, coordsArr) => {
    for (var i=0; i< addresInst.length; i++){
        addresInst[i].update({coords:coordsArr[i]});
    }
});


exports.setMetro = async((address, metroArr) => {
    //console.log(address);
    metroArr.forEach(metro => {
        var ourMetro = await (models.Metro.findOne({
            where: {
                name: metro.name
            }
        }))
        if (ourMetro) {
            address.addMetroStation(newMetro);
        } else {
            try {
                var newMetro = await(models.Metro.create({
                    name: metro.name,
                    coords: metro.coords
                }));
                address.addMetroStation(newMetro);
            }
            catch (e){
                var ourMetro = await (models.Metro.findOne({
                    where: {
                        name: metro.name
                    }
                }))
                if (!ourMetro)
                    throw e;
                else
                    address.addMetroStation(ourMetro);
            }

            //console.log(newMetro);

        }
    })
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
