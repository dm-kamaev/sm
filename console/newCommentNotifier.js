'use strict';

var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var MailSender = require('../node_modules/nodules/mail').MailSender;
var Letter = require('../node_modules/nodules/mail').Letter;
var transporterGenerator =
    require('../node_modules/nodules/mail').TransporterGenerator;
var config = require('../app/config');
var emailConfig = config.emailNotifier;

var services = require('../app/components/services').all;


class newCommentNotifier {
    constructor() {}

    start() {
        var email = emailConfig.email,
            domain = emailConfig.domain,
            theme = 'Новый комментарий на Школах Мела';

        var transporter = transporterGenerator.createSMTPTransporter({
            debug: true,
            name: 'cochanges.com'
        });
        var mailSender = new MailSender(
            transporter, 'schools.mel.fm <sender@schools.mel.fm>'
        );

        var notSended = await(services.comment.getNotSended());
        notSended.forEach( (comment) => {
            var letterText = 'Для школы ';

            var school = await( services.school.getSchoolByGrouId(
                comment.groupId
            ) );

            var link = domain + 'school/' + school.url;

            letterText += link;
            letterText += ' был добавлен комментарий "';
            letterText += comment.text;
            letterText += '"';

            var letter = new Letter (theme, letterText, 'html');
            mailSender.sendMail(email, letter);

            await (services.comment.update(comment, {
                isNoticeSend: true
            }));
        });
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
    .description('Send a nitification about new comments')
    .action(() => start());

exports.Command;
