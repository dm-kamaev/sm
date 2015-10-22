var xlsx = require('node-xlsx');
var commander = require('commander');
// var obj = xlsx.parse(__dirname + '/open-data.xlsx'),
    // data = obj[0].data;

var models = require.main.require('./app/modules/school/models'),
    School = models.School;


function getArray(row, index) {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
}

var sync = data => {
    School.sync({force: true}).then(function () {
        data.forEach(row => School.create({
            name: row[6],
            director: row[13],
            phones: getArray(row, 15),
            site: row[17],
            addresses: getArray(row, 20),
            coords: []
        }));
    });
};

var parse = function(path) {
    var parsed = xlsx.parse(path),
        data = parsed[0].data;
    sync(data);
};

// Settings for accessing this script using cli
commander
    .command('parse <path>')
    // .option('-t, --test', 'test')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));

// Require this in commander.js
exports.Command;
