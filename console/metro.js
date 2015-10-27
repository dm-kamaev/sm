var commander = require('commander');
var https = require('https');
var fs = require('fs');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var modules = require.main.require('./api/modules');

const PATH_TO_ERROR_FILE = 'metrolog.txt';
const REQUEST_RETRY_COUNT = 2; //Rоличество попыток обращения к яндекс api
const REVERSE_COORDS = true; //Менять ли местами координаты перед запросом

var writeError = async(string => {
    var str = string+'\n';
    await (fs.appendFile(PATH_TO_ERROR_FILE ,str, function (err) {
        if (err)
            throw err;
    }));
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
    schools.forEach( school => {
        processSchool(school);
    });
});

var getMetro = async(pair => {
    var metro = '',
        tryNum = 0;
    do {
        var result = await(request(pair));
        if (result == 'not_found')
            writeError('cant find metro for coordinats: ' + pair);
        else if (result == 'no_response')
            writeError('cant get any response for coordinats: ' + pair +
                ' on ' + (tryNum + 1) + ' try');
        else
            metro = result;
        tryNum++;
    } while (result == 'no_response' && tryNum<REQUEST_RETRY_COUNT)
    return metro;
});

var getMetroArr = async(adrArr => {
    var metroArr = [];
    adrArr.forEach(pair =>{
        truepair = REVERSE_COORDS ? pair.reverse() : pair;
        metroArr.push(
            await (getMetro(truepair)));
    });
    return metroArr;
});

var processSchool = async(school => {
    var cordArr = school.coords;
    if (cordArr && cordArr.length != 0){
        //cordArr.forEach(pair =>{
        //    var metro = await(request(pair.reverse()));
        //    metroArr.push(metro);
        //})
        var metroArr = await(getMetroArr(cordArr));
        if (cordArr.length == metroArr.length)
            school.update({metro:metroArr})
        else
            throw new Error('what');
    }
});


var request = async ((pair) => {
    var result;
    var options = {
        host: 'geocode-maps.yandex.ru',
        path: '/1.x/?geocode='+pair.join(',')+'&kind=metro&format=json'
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
                    var firstResult = resp.GeoObjectCollection.featureMember[0];
                    if (firstResult)
                        resolve(firstResult.GeoObject.name);
                    else
                        resolve('not_found');
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
