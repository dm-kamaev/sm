var async = require('asyncawait/async');
var await = require('asyncawait/await');
var querystring = require('querystring');
var axios = require('axios');

const AUTH_URL = 'http://schools1.qa.lan:3001/oauth';

var service = {
    name: 'authorization'
};

/**
 * Create user data
 * @param {Object} data
 * @param {string} data.code
 * @param {string} data.type
 * @return {string}
 */
service.getUserUrl = async(function(data) {
    var data = querystring.stringify({
        code: data.code,
        type: data.type
    });

    var userUrlResponse = await(axios.post(
        AUTH_URL,
        data
    ));

    return userUrlResponse.data;
});

module.exports = service;
