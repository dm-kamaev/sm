'use strict';

const commander = require('commander');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const DistrictCreator = require('./modules/geo/DistrictCreator');

var createDistricts = async(function() {
    var districtCreator = new DistrictCreator();

    await(districtCreator.createDistricts());
});

commander
    .command('districts')
    .description('creates districts in db')
    .action(createDistricts);

exports.Command;
