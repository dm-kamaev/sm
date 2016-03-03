'use strict';

var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var MailSender = require('../../../node_modules/nodules/mail').MailSender;
var Letter = require('../../../node_modules/nodules/mail').Letter;
var transporterGenerator =
    require('../../../node_modules/nodules/mail').TransporterGenerator;
var config = require('../../../app/config').config;
var emailConfig = config.emailNotifier;

var services = require('../../../app/components/services').all;

var stoplist = require('./stop-list.json');


class newCommentNotifier {
    constructor() {}

    start() {
        var email = emailConfig.email,
            domain = emailConfig.domain;

        var transporter = transporterGenerator.createSMTPTransporter({
            debug: true,
            name: 'cochanges.com'
        });
        var mailSender = new MailSender(
            transporter, 'schools.mel.fm <sender@mel.fm>'
        );

        var notSended = await(services.comment.getNotSended());
        notSended.forEach( (comment) => {
            var letterText = 'Для школы ';

            var school = await( services.school.getSchoolByGrouId(
                comment.groupId
            ) );

            var theme = this.checkText(comment.text) ?
                'Важно: спорный комментарий' :
                'Новый комментарий на Школах Мела';

            var link = domain + 'school/' + school.url;

            letterText += link;
            letterText += ' был добавлен комментарий с id = ';
            letterText += comment.id + ' "';
            letterText += comment.text;
            letterText += '"';

            var letter = new Letter (theme, letterText, 'html');
            mailSender.sendMail(email, letter);

            await (services.comment.update(comment, {
                isNoticeSend: true
            }));
        });
    }

    /**
     * Checks comment's text on forbiden words
     * @param {string} text
     * @return {bool} - false - appropriate, true - inappropriate
     * @private
     */
    checkText(text) {
        text = text.toLowerCase();
        var i = stoplist.length,
            isExplicit = false;

        while (i-- && !isExplicit) {
            if (text.indexOf(stoplist[i]) > -1)
                isExplicit = true;
        }
        return isExplicit;
    }
}

var start = async(() => {
    var notifier = new newCommentNotifier();

    await(notifier.start());
});

/**
 * Settings for accessing this script using cli
 */
commander
    .command('notify')
    .description('Send a notification about new comments')
    .action(() => start());

exports.Command;
