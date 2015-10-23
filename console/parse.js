var commander = require('commander');
var xlsx = require('node-xlsx');

var modules = require.main.require('./api/modules');

var NAME_INDEX = 6,
    DIRECTOR_INDEX = 13,
    PHONES_INDEX = 15,
    SITE_INDEX = 17,
    ADDRESSES_INDEX = 20;


var getArray = (row, index) => {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
};

var rowToSchool = row => {
    return {
        name: row[NAME_INDEX],
        director: row[DIRECTOR_INDEX],
        phones: getArray(row, PHONES_INDEX),
        site: row[SITE_INDEX],
        addresses: getArray(row, ADDRESSES_INDEX),
        coords: []
    };
};

var parse = path => {
    var parsed = xlsx.parse(path),
        data = parsed[0].data;

    modules.school.models.School.sync({force: true}).then(function () {
        data.map(rowToSchool)
            .forEach(item => modules.school.models.School.create(item));
    });
};


// Settings for accessing this script using cli
commander
    .command('parse <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));
