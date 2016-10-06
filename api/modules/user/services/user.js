var async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    axios = require('axios');

const config = require('../../../../app/config').config;

const USER_API = config.userApi,
    GET_USER = '/user/',
    AUTH_API = config.authApi,
    POST_AUTH = '/oauth/',
    REDIRECT_URI = config.redirectUri;

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
    var redirectUri = REDIRECT_URI + '/' + data.type,
        userUrlResponse = await(axios.post(AUTH_API + POST_AUTH, {
            code: data.code,
            type: data.type,
            redirectUri: redirectUri
        })),
        userUrl = userUrlResponse.headers.location;

    var userDataResponse = await(axios.get(userUrl));

    return userDataResponse.data;
});

/**
 * @param {string} id
 * @return {object}
 */
service.getUserById = async(function(id) {
    return await(axios.get(USER_API + GET_USER + id)).data;
});

module.exports = service;