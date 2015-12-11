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
var addAreaNamesToDB = async( (data) => {
    var areaNames = concatAreaColumns(data);

    areaNames = makeUniqueArray(areaNames);

    areaNames.forEach( async( (item)  => {
       (services.area.create({name: item}));
    }));
});

/**
 * Returns an array, which contains elements of all arrays
 * @param {Array} arr
 * @return {Array}
 */
var concatAreaColumns = (arr) => {
    var resultArray = [];
    arr.forEach( (item) => {
        resultArray.push(item.area);
    });
    return resultArray;
};

/**
 * Returns array of unique values
 * @param {Array} arr original array
 * @return {Array} unique array
 */
var makeUniqueArray = (arr) => {
    var unique = [],
        tmp = {};
    for (var i = 0, l = arr.length, item; i < l; i++) {
        item = arr[i];
        if (tmp.hasOwnProperty(item)) {
            continue;
        }
        unique.push(item);
        tmp[item] = 1;
    }
    return unique;
};

/**
 * creates an array of objects with addresses and areas
 * @param {Array} array
 * @return {Array<Object>}
 */
var rowToGeoData = (array) => {
    var tmpArray;

    tmpArray = array.map( (item) => {
        return {
            addresses: res.getArray(item, res.ColumnNames.ADDRESSES_INDEX),
            areas: res.getArray(item, res.ColumnNames.AREAS_INDEX)
        };
    });

    var output = [];
    tmpArray.forEach((item) => {
        item.addresses.forEach((address, index) => {
            output.push({
                adress: address,
                area: item.areas[index]
            });
        });
    });
    return output;
};


/**
 * associates address and area
 * @param {Array.<Object>} data
 */
var associateAreaAdress = (array) => {
    array.forEach((item) => {
        services.address.setArea(item);
    });
};

/**
 * main parse method for use from cli
 * @param {String} path
 */
var parse = async( (path) => {
    var data;

    data = res.getDataFromFile(path, true);
    data = rowToGeoData(data);

    await( addAreaNamesToDB(data) );
    associateAreaAdress(data);

});

/**
* main parse method for exports into parse.js
* @param {String} path
*/
exports.parse = async( (path) => {
    var data;

    data = res.getDataFromFile(path, true);
    data = rowToGeoData(data);

    await( addAreaNamesToDB(data) );
    associateAreaAdress(data);

});
/**
 * Settings for accessing this script using cli
 *
*/
commander
    .command('area <path>')
    .description('Parses an areas .xlsx file from a given path')
    .action(file => parse(file));

exports.Command;
