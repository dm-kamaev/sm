var async = require('asyncawait/async');
var await = require('asyncawait/await');
var querystring = require('querystring');
var axios = require('axios');

const url = require('../../../../app/config').config.url;

const URL = url.protocol + '://' + url.host + ':3001';
const AUTH_URL = URL + '/oauth';
const USER_URL = URL + '/user/';

var service = {
    name: 'user'
};

/**
 * @param {Object} data
 * @param {string} data.code
 * @param {string} data.type
 * @return {string}
 */
service.getUserByCode = async(function(data) {
    var data = querystring.stringify({
        code: data.code,
        type: data.type
    });

    var userUrlResponse = await(axios.post(
        AUTH_URL,
        data
    ));

    var userDataResponse = await(axios.get(URL + userUrlResponse.data));

    return userDataResponse.data;
});

/**
 * @param {string} id
 * @return {object}
 */
service.getUserById = async(function(id) {
    return await(axios.get(USER_URL + id)).data;
});

module.exports = service;
