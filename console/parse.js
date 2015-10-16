var xlsx = require('node-xlsx');

var obj = xlsx.parse(__dirname + '/open-data.xlsx'),
    data = obj[0].data;

var models = require.main.require('./app/modules/school/models'),
    School = models.School;

function getArray(row, index) {
    //return row[index].replace(/\r/g, '');
    return row[index].split(';').map(item => item.trim());
}

School.sync({force: true}).then(function () {
    for (var i = 1, row; row = data[i]; i++) {
        School.create({
            name: row[6],
            director: row[13],
            phones: getArray(row, 15),
            site: row[17],
            addresses: getArray(row, 20),
            coords: []
        });
    }
});
