var MultiGeocoder = require('multi-geocoder');
var modules = require.main.require('./api/modules');
var commander = require('commander');
var geocoder = new MultiGeocoder({ coordorder: 'latlong', lang: 'ru-RU' });
var fs = require('fs');
var colors = require('colors');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

const PATH_TO_ERROR_FILE = 'geoerrors.txt';

var start = async(() => {
    var schoolPromises = [];
    await(fs.writeFile(PATH_TO_ERROR_FILE ,'------------\n', function (err) {
        if (err)
            console.log(err);
    }));
    var School = modules.school.models.School;
    var schools = await(School.findAll(
        { include: [{ model: modules.school.models.Address,
        as: 'addresses' }]}));
    console.log('\nPatience, my friend');
    schools.forEach( school => {
         processSchool(school);
    });
});

var writeError = async(string => {
    await (fs.appendFile(PATH_TO_ERROR_FILE ,string, function (err) {
        if (err)
            throw err;
        }));
    await (fs.appendFile(PATH_TO_ERROR_FILE ,'\n', function (err) {
        if (err)
            throw err;
        }));
});

var processSchoolPrecisely = async(school => {
    var adressArray = school.addresses || [],
        cordArr = [],
        errorOccured = false;
    for (var i = 0; i < adressArray.length; i++) {
        var geoadr = [].concat(adressArray[i]);
        res = await(geocoder.geocode(geoadr));
        if (res.result.features[0] &&
             res.result.features[0].geometry.coordinates.length === 2) {
            cordArr.push(res.result.features[0].geometry.coordinates);
        } else {
            errorOccured = true;
            await(writeError(adressArray[i]))
        }
    }
    if (!errorOccured)
        school.update({coords:cordArr});
});

var processSchool = async(school => {
    console.log(colors.green(JSON.stringify(school)));
    var cordArr = [],
        adressArr = school.addresses;
    res = await(geocoder.geocode(adressArr));
    res.result.features.forEach(item => cordArr.push(item.geometry.coordinates));
    if (cordArr.length != adressArr.length)
        processSchoolPrecisely(school);
    else
        school.update({coords:cordArr});
});

commander
     .command('geocord')
     .description('gets cords from yandex api')
     .action(() => start());
