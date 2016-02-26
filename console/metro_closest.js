'use strict';

var commander = require('commander');
var fs = require('fs');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var geoTools = require('./modules/geoTools/geoTools');
var services = require.main.require('./app/components/services').all;
var models = require.main.require('./app/components/models').all;

class ClosestMetro {
    constructor() {}

    start() {
        var res = await (services.address.getAllWithMetro()),
            coords;

        res.forEach(address => {
            address.metroStations.forEach(station => {
                coords = [
                    station.dataValues.coords[1],
                    station.dataValues.coords[0]
                ];

                await(models.AddressMetro.findOne({
                    where: {
                        metroId: station.dataValues.id,
                        addressId: address.dataValues.id
                    }
                })).update({
                    distance: (geoTools.distance(
                        address.dataValues.coords,
                        coords
                    ).toFixed(3) * 1000).toFixed(0)
                })
            });
        });
    }
}

var start = async(() => {
    var closestMetro = new ClosestMetro();

    await(closestMetro.start())
});

// Settings for accessing this script using cli
commander
    .command('closest-metro')
    .description('Adds distance to address_metro table')
    .action(()=> start());
exports.Command;