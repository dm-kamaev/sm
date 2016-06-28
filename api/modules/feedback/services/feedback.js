'use strict';

var async = require('asyncawait/async');

var services = require('../../../../app/components/services').all;

var config = require('../../../../app/config').config;

var service = {
    name: 'feedback'
};

/**
 * Send recieved feedback message to email
 * @param {{
 *     theme: string,
 *     content: string
 * }} letter
 * @type {{name: string}}
 */
service.sendFeedback = async(function(letter) {
    var params = {
        from: 'schools.mel.fm <sender@mel.fm>',
        to: config.emailNotifier.email
    };

    services.mail.sendLetter(letter, params);
});

module.exports = service;
