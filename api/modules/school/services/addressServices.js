var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;

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
            var match = null;
            console.log(address.metroStations);
            if (address.metroStations && address.metroStations.length != 0){
                match = address.metroStantions.find((metroStation) => {
                    if (metroStation.name == metro.name){
                        return true;
                    }
                });
            }
            if (!match)
                address.addMetroStation(ourMetro);
        } else {
            //console.log('creating new metro');
            var newMetro = await (models.Metro.create({
                name: metro.name,
                coords: metro.coords
            }));
            //console.log(newMetro);
            address.addMetroStation(newMetro);
        }
    })
});