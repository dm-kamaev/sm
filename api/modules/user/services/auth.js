const async = require('asyncawait/async');
const await = require('asyncawait/await');
const request = require('request');
const lodash = require('lodash');
const axios = require('axios');
const config = require('../../../../app/config').config;


/**
 * @constructor
 */
var AuthService = function() {
    /**
     * Service name
     * @type {string}
     */
    this.name = 'auth';
};

/**
 * Social type enum
 * @enum {string}
 */
AuthService.SocialType = {
    VK: 'vk',
    FB: 'fb'
};

/**
 * Social auth url (needed for getting social link)
 * @type {string}
 */
AuthService.SOCIAL_AUTH_URL = config.authApi + '/oauth/?type=';
/**
 * Getter for social link
 * @param  {string} socialType - ['vk', 'fb', 'gp']
 * @return {Promise} - promise, that returns link string
 */
AuthService.prototype.getSocialLink = function(socialType) {
    var url = AuthService.SOCIAL_AUTH_URL + socialType;

    return axios.get(url);
};

/**
 * Getter for all social links
 * @return {{
 *     vk: string,
 *     fb: string
 * }} - returns promise!
 */
AuthService.prototype.getSocialLinks = async(function() {
    var socialTypes = [
            AuthService.SocialType.VK,
            AuthService.SocialType.FB
        ],
        that = this,
        responses = await(socialTypes.map(type =>
                that.getSocialLink(type))),
        socialLinks = responses.map(response => response.headers.location);

    return {
        vk: socialLinks[0],
        fb: socialLinks[1]
    };
});

/**
 * @exports
 */
module.exports = new AuthService();

/**
 * @exports
 * @return {Function}
 */
exports.getConstructor = function() {
    return AuthService;
};
