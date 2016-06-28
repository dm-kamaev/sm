const config = require('../../../../app/config').config;

const AUTH_URL = config.authApi + '/oauth/?type=';

var service = {
    name: 'auth'
};

/**
 * Getter for social link
 * @param  {string} socialType - ['vk', 'fb', 'gp']
 * @return {sttring}
 */
service.getSocialLink = function(socialType) {
    var url = AUTH_URL + socialType;

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
