var async = require('asyncawait/async');
var await = require('asyncawait/await');
var MultiGeocoder = require('multi-geocoder');
var geocoder = new MultiGeocoder({coordorder: 'latlong', lang: 'ru-RU'});
var https = require('https');

exports.name = 'yapi';

exports.test = async(function(string) {
    var addresses = [];
    addresses.push(string);
    var res = await(geocoder.geocode(addresses));
    return JSON.stringify(res.result.features);
});

exports.request = async(string => {
    var apiString = encodeURI('/1.x/?geocode=' + string +
        '&format=json');
    console.log('Sending request to ' + apiString);
    var options = {
        host: 'geocode-maps.yandex.ru',
        path: apiString,
    };
    var getResults = new Promise(function(resolve, reject) {
        https.request(options).on('response', function(response) {
            response.setEncoding('utf8');
            var data = '';
            response.on('data', function(chunk) {
                data += chunk;
            });
            response.on('end', function() {
                var resp = JSON.parse(data).response || null;
                if (!resp) {
                    resolve('no_response');
                } else {
                    resolve(resp.GeoObjectCollection);
                }
            });
            response.on('error', function(e) {
                console.log(e);
            });
        }).end();
    });
    var results = await(getResults);
    return results;
});

/**
 * Get address coords
 * @param  {string} addressName
 * @return {number[]} array of adress coords
 */
exports.getCoords = async(function(addressName) {
    var geoData = await(exports.request(addressName));
    geoData.featureMember = geoData.featureMember.find(data => {
        if (/^москва/ig.test(data.GeoObject.description)) {
            return true;
        }
    });
    return geoData.featureMember.GeoObject.Point.pos.split(' ')
               .map(coord => Number(coord));
});
