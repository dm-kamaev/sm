var async = require('asyncawait/async');
var await = require('asyncawait/await');

var commander = require('commander');
var xlsx = require('node-xlsx');
var colors = require('colors');


var schoolServices =
    require.main.require('./api/modules/school/services').schoolServices;

var NAME_INDEX = 6,
    DIRECTOR_INDEX = 13,
    PHONES_INDEX = 15,
    SITE_INDEX = 17,
    ADDRESSES_INDEX = 20,
    GOVERMENT_KEY_INDEX = 2;


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
        goverment_key: row[GOVERMENT_KEY_INDEX],
        coords: []
    };
};

var parseSchool = async(schoolData => {
    //var School = modules.school.models.School;
    var params = {
        where: {
            goverment_key: schoolData.goverment_key
        }
    }
    var school = await(schoolServices.get(params, {count: 'one'}));
    if (school)
        schoolServices.update(school, schoolData);
    else
        schoolServices.create(schoolData);
});

var parse = async(path => {
   // await (mdl.initAssociations());


    var parsed = xlsx.parse(path),
        data = parsed[0].data;

    data.map(rowToSchool)
        .filter((item, index) => (index && index <= 3))
        .forEach(item => parseSchool(item));
});


// Settings for accessing this script using cli
commander
    .command('parse <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => parse(file));
