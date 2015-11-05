var commander = require('commander');
var https = require('https');
var fs = require('fs');
var colors = require('colors');

var async = require('asyncawait/async');
var await = require('asyncawait/await');

//var modules = require.main.require('./api/modules');
var addressServices =
    require.main.require('./api/modules/school/services').addressServices;


const PATH_TO_ERROR_FILE = 'metrolog.txt';
const REQUEST_RETRY_COUNT = 2; //Количество попыток обращения к яндекс api
const REVERSE_COORDS = true; //Менять ли местами координаты перед запросом

const DEBUG_RESTRICTION = 0; //ограничение по количеству обрабатываемых адресов, 0 для отсутсвия
const KM_RESTRIСTION = 3; //ограничение радиуса поиска в км, 0 для отсутствия
const CACHING_ENABLED = true; //Работает ли кэширование
const ADRESSES_IN_REQUEST = 30; //Количество адресов которые обрабатываются асинхронно


var writeError = async(string => {
    var str = '\n'+string;
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
    var test = await(addressServices.getTest());
    var addresses = await(addressServices.getAllWithMetro())
    console.log('\nPatience, my friend');
    //var amount = DEBUG_RESTRICTION ? DEBUG_RESTRICTION : addresses.length;
    var adrChunks = splitAddreses(addresses);
    adrChunks.forEach(chunk => {
        await(processChunk(chunk));
        console.log(colors.blue('----------------'));
    })
});

var splitAddreses = (addresses) => {
    var amount = DEBUG_RESTRICTION ? DEBUG_RESTRICTION : addresses.length;
    var chunks = [],
        round = 0;
    while (round * ADRESSES_IN_REQUEST < amount){
        var start = round * ADRESSES_IN_REQUEST,
            planned_end = (round + 1)  * ADRESSES_IN_REQUEST,
            end = planned_end < addresses.length ?
                planned_end :
                addresses.length ;
        chunks.push(addresses.slice(start,end));
        round++;
    }
    return chunks;
}
var processChunk = async(adrChunk => {
    await (adrChunk.forEach(address => {

        if (!(CACHING_ENABLED && isCached(address)))
            processAddress(address);
        else
            console.log('Metro stations for address '
                + colors.green(address.name) + ' adlready cached');
    }));
})

var isCached = (address) => {
    if (address.metroStations.length == 0)
        return false;
    return true;
};
var processAddress = async(address => {
    if (address.coords && address.coords.length == 2){
        var metroArr = await(getMetro(address));
        if (metroArr) {
            if (metroArr.length == 0)
                console.log('Found 0 stations for address '
                    + colors.yellow(address.name) + ' in range '
                    + colors.yellow(KM_RESTRIСTION+'KM'));
            else
                await (addressServices.setMetro(address, metroArr));
        }
    }
});

var getMetro = async((adr) => {
    var metro = [],
        tryNum = 0,
        pair = REVERSE_COORDS ? adr.coords.reverse() : adr.coords;
    do {
        var result = await(request(pair));
        if (result === 'not_found')
            writeError('cant find metro for coordinats: ' + pair +', address: ' +adr.name);
        else if (result === 'no_response')
            writeError('cant get any response for coordinats: ' + pair +
                ' on ' + (tryNum + 1) + ' try');
        else
            metro = result;
        tryNum++;
    } while (result === 'no_response' && tryNum<REQUEST_RETRY_COUNT)
    return metro;
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
        restrictionString += "&spn=" + restriction.longitude + ','
            + restriction.latitude;
    }
    var apiString = '/1.x/?geocode=' + pair.join(',') +
        '&kind=metro&format=json' + restrictionString;
    console.log('Sending request to '+apiString);
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
                        var metroObjects = [];
                        metroAnswersArray.forEach(answer => {
                            var metroObject = {
                                name: answer.GeoObject.name,
                                coords: answer.GeoObject.Point.pos.split(" ")
                            };
                            metroObjects.push(metroObject);
                        })
                        resolve(metroObjects);
                    }
                }
            });
            response.on('error', function (e) {
                console.log(e);
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
exports.Command;
