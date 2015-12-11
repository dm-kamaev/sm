var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var colors = require('colors');

var res = require('./resources/res');

var modules = require.main.require('./api/modules');
var services = require.main.require('./app/components/services').all;

var parse = require('./parse.js');

/**
 * Parses an xlsx file and puts unique areas into db
 * @param {String} path path to xlsx file
 */
exports.parse = async( (path) => {
    var parsed = xlsx.parse(path),
        data = parsed[0].data;

    data.forEach((row) => {
        var areas = res.getArray(row, res.ColumnNames.AREAS_INDEX);

        areas.forEach((area) => {
            await(services.area.create({
                name: area
            }));
        });
    });
});

/**
 * associates school addresses and areas
 * @param
 */
exports.associateAreas =  (addresses, areas) => {

    addresses.forEach( async ((adress, index) => {

        await( services.address.setArea({
            address: adress,
            area: areas[index]
        }));

    }));
};