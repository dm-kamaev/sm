'use strict';

const commander = require('commander');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const DistrictProcessor = require('./modules/geo/DistrictProcessor');

/**
 * Fill db with districts
 */
var createDbDistricts = async(function() {
    var districtProcessor = new DistrictProcessor();

    await(districtProcessor.fillDbDistricts());
});


/**
 * Create archive with relation between districts and areas
 */
var createDistrictsRelationReport = async(function() {
    var districtProcessor = new DistrictProcessor();

    await(districtProcessor.generateDistrictsRelationReport());
});


/**
 * Archive districts from db
 */
var archiveDistricts = async(function() {
    var districtProcessor = new DistrictProcessor();

    await(districtProcessor.archiveDbDistricts());
});

commander
    .command('create db districts')
    .description(
        'creates districts in db and associate it to areas via services'
    )
    .action(createDbDistricts);

commander
    .command('generate district associations')
    .description('create an archive with district id and containing area id')
    .action(createDistrictsRelationReport);

commander
    .command('archive districts')
    .description('create an archive with districts from db')
    .action(archiveDistricts);

exports.Command;
