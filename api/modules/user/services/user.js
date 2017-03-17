'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    axios = require('axios');

const services = require('../../../../app/components/services').all;

const config = require('../../../../app/config').config;

const USER_API = config.userApi,
    GET_USER = '/user/',
    AUTH_API = config.authApi,
    POST_AUTH = '/oauth/',
    REDIRECT_URI = config.redirectUri;

let service = {
    name: 'user'
};

/**
 * @param  {Object} data
 * @param  {string} data.code
 * @param  {string} data.type
 * @param  {string} baseUrl
 * @return {string}
 */
service.getUserByCode = async(function(data, baseUrl) {
    let redirectUri = services.urls.addSubdomain(
            REDIRECT_URI + '/' + data.type,
            baseUrl
        ),
        userUrlResponse = await(axios.post(AUTH_API + POST_AUTH, {
            code: data.code,
            type: data.type,
            redirectUri: redirectUri
        })),
        userUrl = userUrlResponse.headers.location;

    let userDataResponse = await(axios.get(userUrl));

    return userDataResponse.data;
});


/**
 * @param  {string} id
 * @return {Object}
 *  {
 *      "id": 1,
 *      "facebookId": "177546869304808",
 *      "vkId": null,
 *      "okId": null,
 *      "googleId": null,
 *      "twitterId": null,
 *      "firstName": "Eero",
 *      "lastName": "Ettala",
 *      "gender": "m",
 *      "phone": "",
 *      "email": "easy2rider2@gmail.com",
 *      "password": null,
 *      "photoUrl": "http://image.mel.fm/i/L/LzA3Yylxmd/128.jpg",
 *      "status": "active",
 *      "birthDate": null,
 *      "created_at": "2016-08-12",
 *      "updated_at": "2016-11-03"
 *  }
 */
service.getUserById = async(function(id) {
    return await(axios.get(USER_API + GET_USER + id)).data;
});

module.exports = service;
