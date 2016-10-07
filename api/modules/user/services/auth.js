'use strict';

const services = require('../../../../app/components/services').all;

const config = require('../../../../app/config').config;

const AUTH_URL = config.authApi + '/oauth/?type=',
    REDIRECT_URI = config.redirectUri;

let service = {
    name: 'auth'
};

/**
 * Getter for social link
 * @param  {string} socialType - ['vk', 'fb', 'gp']
 * @param  {string} baseUrl
 * @return {string}
 */
service.getSocialLink = function(socialType, baseUrl) {
    let redirectUri = services.urls.addSubdomain(
            REDIRECT_URI + '/' + socialType,
            baseUrl
        ),
        uri = AUTH_URL + socialType + '&redirectUri=' +
            encodeURIComponent(redirectUri);

    return uri;
};

/**
 * Getter for all social API url
 * @return {{
 *     vk: string,
 *     fb: string
 * }}
 */
service.getAuthSocialUrl = function() {
    return {
        vk: '/oauth/vk',
        fb: '/oauth/fb'
    };
};

/**
 * @exports
 */
module.exports = service;
