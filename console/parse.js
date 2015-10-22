var xlsx = require('node-xlsx');

var obj = xlsx.parse(__dirname + '/open-data.xlsx'),
    data = obj[0].data;

var modules = require.main.require('./app/modules');
    //School = models.School.School;
console.log(models);


function getArray(row, index) {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
}
//console.log(data[1]);

modules.school.models.School.sync({force: true}).then(function () {
    for (var i = 1, row; row = data[i]; i++) {
        modules.school.models.School.create({
            name: row[6],
            director: row[13],
            phones: getArray(row, 15),
            site: row[17],
            addresses: getArray(row, 20),
            coords: []
        });
    }
});
