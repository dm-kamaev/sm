'use strict';

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var MailSender = require('../../../../node_modules/nodules/mail').MailSender;
var Letter = require('../../../../node_modules/nodules/mail').Letter;
var transporterGenerator =
    require('../../../../node_modules/nodules/mail').TransporterGenerator;
var config = require('../../../../app/config').config;

var service = {
    name: 'feedback'
};

/**
 * Send recieved feedback message to email
 * @param {{
 *     header: string,
 *     name: string,
 *     email: string,
 *     theme: string,
 *     text: string,
 *     url: ?string
 * }} feedback feedback object
 * @type {{name: string}}
 */
service.sendFeedback = async(function(feedback) {
    var email = config.emailNotifier.email;

    var transporter = transporterGenerator.createSMTPTransporter({
        debug: true,
        name: 'cochanges.com'
    });
    var mailSender = new MailSender(
        transporter, 'schools.mel.fm <sender@mel.fm>'
    );

    /** Make Body of letter from input params **/
    var letterBody = '';

    letterBody += 'Имя отправителя: ' + feedback.name + '\n';
    letterBody += 'email отправителя: ' + feedback.email + '\n';
    letterBody += 'Тема: ' + feedback.theme + '\n';

    if (feedback.url) {
        letterBody += 'Url: ' + feedback.url + '\n';
    }

    letterBody += 'Сообщение: ' + feedback.text + '\n';
    /** End Body of letter **/

    var letter = new Letter(feedback.header, letterBody, 'html');
    mailSender.sendMail(email, letter);
});

module.exports = service;