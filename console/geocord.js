var MultiGeocoder = require('multi-geocoder');
var modules = require.main.require('./api/modules');
var commander = require('commander');
var geocoder = new MultiGeocoder({ coordorder: 'latlong', lang: 'ru-RU' });
var fs = require('fs');
var colors = require('colors');

var schoolServices =
    require.main.require('./api/modules/school/services').schoolServices;
var addressServices =
    require.main.require('./api/modules/school/services').addressServices;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

const PATH_TO_ERROR_FILE = 'geoerrors.txt';
const ADRESSES_IN_REQUEST = 30; //количетсов адресов в запросе

var start = async(() => {
    await(fs.writeFile(PATH_TO_ERROR_FILE ,'------------\n', function (err) {
        if (err)
            console.log(err);
    }));
    var addresses = await(addressServices.getAll());
    var notUpdated = [];
    addresses.forEach(adr => {
        if (!adr.coords || adr.coords.length != 2)
            notUpdated.push(adr);
    })
    console.log('\nFound addresses: '+colors.yellow(addresses.length));
    console.log('Not updated: '+colors.yellow(notUpdated.length));
    if (notUpdated.length != 0)
        startProcessing(notUpdated);
});

var startProcessing = (notUpdated) => {
    console.log('\nPatience, my friend');
    var splitedAddresses = splitAddresses(notUpdated);
    for (var i = 0; i < splitedAddresses.length; i++){
        processAddressChunk(splitedAddresses[i]);
    }
}

var splitAddresses = addresses => {
    var splittedArr = [],
        round = 0;
    while (round * ADRESSES_IN_REQUEST < addresses.length){
        var start = round * ADRESSES_IN_REQUEST,
            planned_end = (round + 1)  * ADRESSES_IN_REQUEST,
            end = planned_end < addresses.length ?
                planned_end :
                addresses.length ;
        splittedArr.push(addresses.slice(start,end));
        round++;
    }
    return splittedArr;
};

var processAddressChunk = async(addressesChunk => {
    var adressArr = addressesChunk.map(adr => {
        return adr.name;
    }),
        cordArr = []
    res = await(geocoder.geocode(adressArr));
    res.result.features.forEach(item => cordArr.push(item.geometry.coordinates));
    if (cordArr.length != adressArr.length) {
        console.log(('cordArr.length != adressArr.length. Starting deep search').yellow);
        processAddresPrecisely(addressesChunk);
    }
    else
        addressServices.updateCoords(addressesChunk, cordArr);
});

var processAddresPrecisely = async(addressesChunk => {
    var adressArr = addressesChunk.map(adr => {
            return adr.name;
        }),
        cordArr = [],
        errorOccured = false;
    for (var i = 0; i < adressArr.length; i++) {
        var geoadr = [].concat(adressArr[i]);
        res = await(geocoder.geocode(geoadr));
        if (res.result.features[0] &&
            res.result.features[0].geometry.coordinates.length === 2) {
            cordArr.push(res.result.features[0].geometry.coordinates);
        } else {
            errorOccured = true;
            console.log(('cant get coordinates for address '+ adressArr[i]).red);
            await(writeError(adressArr[i]))
        }
    }
    if (!errorOccured)
        addressServices.updateCoords(addressesChunk, cordArr);
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

commander
     .command('geocord')
     .description('gets cords from yandex api')
     .action(() => start());
exports.Command;
