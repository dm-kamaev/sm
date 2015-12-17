var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
exports.name = 'address';
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

exports.getTest = async(() => {
    return await(models.Address.findOne({
        include:[{
            all:true,
            nested: true
        }]
    }));
});

exports.updateCoords = async((addresInst, coordsArr) => {
    for (var i=0; i< addresInst.length; i++){
        addresInst[i].update({coords:coordsArr[i]});
    }
})

exports.getMetro = (address) => {
    return address.metroStations;
};

exports.getDepartment = (address) => {
    return address.departments;
};

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

exports.list = async (function(opt_params) {
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
