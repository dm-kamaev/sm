const config = require('../../../../app/config').config;

const AUTH_URL = config.authApi + '/oauth/?type=',
    REDIRECT_URI = config.redirectUri;

var service = {
    name: 'auth'
};

/**
 * Getter for social link
 * @param  {string} socialType - ['vk', 'fb', 'gp']
 * @return {sttring}
 */
service.getSocialLink = function(socialType) {
    var redirectUri = encodeURIComponent(REDIRECT_URI + '/' + socialType),
        url = AUTH_URL + socialType + '&redirectUri=' + redirectUri;

    return url;
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
