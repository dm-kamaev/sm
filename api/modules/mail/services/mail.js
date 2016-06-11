'use strict';

var async = require('asyncawait/async');
var MailSender = require('../../../../node_modules/nodules/mail').MailSender;
var Letter = require('../../../../node_modules/nodules/mail').Letter;
var transporterGenerator =
    require('../../../../node_modules/nodules/mail').TransporterGenerator;

var service = {
    name: 'mail'
};

/**
 * Send message to email
 * @param {{
 *     theme: string,
 *     content: string
 * }} data
 * @param {{
 *     from: string,
 *     to: string,
 * }} params
 * @type {{name: string}}
 */
service.sendLetter = async(function(data, params) {
    var transporter = transporterGenerator.createSMTPTransporter({
        debug: true,
        name: 'cochanges.com'
    });

    var mailSender = new MailSender(
        transporter, params.from
    );

    var letter = new Letter(data.theme, data.content, 'html');
    mailSender.sendMail(params.to, letter);
});

module.exports = service;
