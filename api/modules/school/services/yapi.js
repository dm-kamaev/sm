var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');  
var colors = require('colors');
var MultiGeocoder = require('multi-geocoder');
var geocoder = new MultiGeocoder({ coordorder: 'latlong', lang: 'ru-RU'});
var https = require('https');

exports.name = 'yapi';

exports.test = async(function(string){
    var addresses = [];
    addresses.push(string);
    res = await(geocoder.geocode(addresses));
    return JSON.stringify(res.result.features);
});

exports.request = async ((string) => {
    console.log(string);
    var apiString = encodeURI( '/1.x/?geocode=' + string +
        '&format=json');
    console.log('Sending request to '+apiString);
    var options = {
        host: 'geocode-maps.yandex.ru',
        path: apiString,
    };
    var getResults = new Promise( function(resolve, reject) {
        https.request(options).on('response', function (response) {
            response.setEncoding('utf8');
            var data = '';           
            response.on("data", function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                var resp = JSON.parse(data).response || null;
                if (!resp)
                    resolve('no_response');
                else
                    resolve(resp.GeoObjectCollection);
            });
            response.on('error', function (e) {
                console.log(e);
            });
          }).end();
    });
    var results = await (getResults);
    return results;
});
