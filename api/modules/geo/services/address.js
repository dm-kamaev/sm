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
