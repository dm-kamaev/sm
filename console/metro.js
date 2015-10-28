var commander = require('commander');
var https = require('https');
var fs = require('fs');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var modules = require.main.require('./api/modules');

const PATH_TO_ERROR_FILE = 'metrolog.txt';
const REQUEST_RETRY_COUNT = 2; //Rоличество попыток обращения к яндекс api
const REVERSE_COORDS = true; //Менять ли местами координаты перед запросом

const DEBUG_RESTRICTION = 3; //ограничение по количеству школ, 0 для отсутсвия
const KM_RESTRIСTION = 2; //ограничение радиуса поиска в км, 0 для отсутствия

var error_count = 0;

var writeError = async(string => {
    var str = '\n'+string;
    await (fs.appendFile(PATH_TO_ERROR_FILE ,str, function (err) {
        if (err)
            throw err;
    }));
    error_count++;
});

var start = async(() => {
    await(fs.writeFile(PATH_TO_ERROR_FILE ,'------METRO LOG------\n',
        function (err) {
            if (err)
                console.log(err);
    }));
    var School = modules.school.models.School;
    await (School.sync());
    var schools = await(School.findAll());
    console.log('\nPatience, my friend');
    var amount = DEBUG_RESTRICTION ? DEBUG_RESTRICTION : schools.length;
    for (var i = 0; i < amount; i++){
        var school = schools[i];
        processSchool(school);
    }
});



var getMetro = async((pair, adr) => {
    var metro = [],
        tryNum = 0;
    do {
        var result = await(request(pair));
        if (result === 'not_found')
            writeError('cant find metro for coordinats: ' + pair +', address: ' +adr);
        else if (result === 'no_response')
            writeError('cant get any response for coordinats: ' + pair +
                ' on ' + (tryNum + 1) + ' try');
        else
            metro = result;
        tryNum++;
    } while (result === 'no_response' && tryNum<REQUEST_RETRY_COUNT)
    return metro;
});

var getMetroArr = async((cordArr, adrArr) => {
    var metroArr = [];
    for (var i = 0; i<adrArr.length; i++){
        pair = cordArr[i];
        truepair = REVERSE_COORDS ? pair.reverse() : pair;
        metroArr.push(
            await (getMetro(truepair,adrArr[i]))
        );
    }

    //adrArr.forEach(pair =>{
    //    truepair = REVERSE_COORDS ? pair.reverse() : pair;
    //    metroArr.push(
    //        await (getMetro(truepair)));
    //});
    return metroArr;
});

var processSchool = async(school => {
    var cordArr = school.coords;
    if (cordArr && cordArr.length != 0){
        var metroArr = await(getMetroArr(cordArr,school.addresses));
        if (cordArr.length == metroArr.length)
            school.update({metro:metroArr})
        else
            writeError('Number of addreses and returned coords for ' +
                'whatewer reason not even for school '+school.name);
    }
});

var countRestriction = (lenKM, coords) => {
    const lt = 110.574;
    const lo = 111.320;
    var Latitude = coords[0], // северная широта
        Longitude = coords[1]; //западная долгота
    var resLatitude = 1 / lt * lenKM;
    var resLongitude = 1 / (lo * Math.cos(Latitude)) * lenKM;
    return {
        latitude: resLatitude,
        longitude: resLongitude
    }
}

var request = async ((pair) => {
    var restrictionString = '';
    if (KM_RESTRIСTION) {
        var restriction = countRestriction(KM_RESTRIСTION, pair);
        restrictionString += "&" + restriction.longitude + ','
            + restriction.latitude;
    }
    var apiString = '/1.x/?geocode=' + pair.join(',') +
        '&kind=metro&format=json' + restriction;
    var options = {
        host: 'geocode-maps.yandex.ru',
        path: apiString
    };
    var getMetro = new Promise( function(resolve, reject) {
        https.request(options).on('response', function (response) {
            var data = '';
            response.on("data", function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                var resp = JSON.parse(data).response || null;
                if (!resp)
                    resolve('no_response');
                else{
                    var metroAnswersArray = resp.GeoObjectCollection
                            .featureMember || [];
                    if (metroAnswersArray.length == 0)
                        resolve('not_found');
                    else{
                        var metroNames = [];
                        metroAnswersArray.forEach(answer => {
                            metroNames.push(answer.GeoObject.name);
                        })
                        resolve(metroNames);
                    }
                    //var firstResult = resp.GeoObjectCollection.featureMember[0];
                    //if (firstResult)
                    //    resolve(firstResult.GeoObject.name);
                    //else
                    //    resolve('not_found');
                }
            });
          }).end()
    });
    var metro = await (getMetro);
    return metro;
});


// Settings for accessing this script using cli
commander
    .command('metro')
    .description('Retrives metro stations by coords in datebase')
    .action(()=> start());
