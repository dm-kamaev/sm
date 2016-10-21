'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    MultiGeocoder = require('multi-geocoder'),
    https = require('https');

let geocoder = new MultiGeocoder({coordorder: 'latlong', lang: 'ru-RU'});

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
 * @param  {boolean=} opt_house Coords for a building/house
 * @return {number[]} array of adress coords
 */
exports.getCoords = async(function(addressName, opt_house) {
    let geoData = await(exports.request(addressName)),
        result = null;

    geoData.featureMember = geoData.featureMember.find(data =>
        this.isCoordsCorrect(data.GeoObject)
    );

    if (geoData.featureMember) {
        result = geoData.featureMember.GeoObject.Point.pos
            .split(' ')
            .map(coord => Number(coord));
    }

    if (!result) {
        throw new Error(`Coordinates for "${addressName}" not found`);
    }

    return result;
});

/**
 * @param  {Object}  geoObject
 * @param  {boolean=}  opt_house
 * @return {boolean}
 */
exports.isCoordsCorrect = function(geoObject, opt_house) {
    let isMoscow = /^москва/ig.test(geoObject.description),
        isHouse = opt_house ?
            this.isHouse(geoObject) :
            true;
    return isMoscow && isHouse;
};

/**
 * @param  {Object}  geoObject
 * @return {boolean}
 */
exports.isHouse = function(geoObject) {
    let housePrecisions = ['exact', 'number'];
    return Boolean(~housePrecisions.indexOf(
        geoObject.metaDataProperty.GeocoderMetaData.precision
    ));
};
