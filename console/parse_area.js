var async = require('asyncawait/async');
var await = require('asyncawait/await');
var commander = require('commander');
var xlsx = require('node-xlsx');
var colors = require('colors');

var services = require.main.require('./app/components/services').all;

/**
 * @enum
 * {Number}
 */
var ColumnNames = {
    AREAS_INDEX: 19,
    ADDRESSES_INDEX: 20
};

/**
 * main parse method for export into parse.js
 * @param {String} path
 */
exports.parseAreas = async((data) => {
    data = rowToGeoData(data);

    await(addAreaNamesToDB(data));
    associateAreaAddress(data);
});

/**
 * creates an array of objects with addresses and areas
 * @param {Array} array
 * @return {Array<Object>}
 */
var rowToGeoData = (array) => {
    var tmpArray;

    tmpArray = array.map( (item) => {
        return {
            addresses: getArray(item, ColumnNames.ADDRESSES_INDEX),
            areas: getArray(item, ColumnNames.AREAS_INDEX)
        };
    });

    var output = [];
    tmpArray.forEach((item) => {
        item.addresses.forEach((address, index) => {
            output.push({
                address: address,
                area: item.areas[index].replace(/район/ig, '').trim()
            });
        });
    });
    return output;
};

/**
 * associates address and area
 * @param {Array.<Object>} data
 */
var associateAreaAddress = async ( (data) => {
    data.forEach((item) => {
        services.address.setArea(item.area, item.address);
    });
});

/**
 * Parses an input array file and puts unique areas into db
 * @param {Array} data
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
 * returns array from table cell
 * @param {Number} row
 * @param {Number} index index of cell in row
 */
var getArray = (row, index) => {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
};
