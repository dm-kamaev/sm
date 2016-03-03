'use strict'

var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var imap = require('imap-simple');
var http = require('http');
var querystring = require('querystring');
var mimelib = require("mimelib");

var services = require('../app/components/services').all;
var config = require('../app/config').config;

const TOKEN = 'a71b-2d1-123f';

class ParseMail {
    constructor() { }

    /**
     * Main function
     */
    process() {

        var mailConfig = {
            imap: {
                user: config.deleteMailbox.email,
                password: '123qweAdj209DJ><@23',
                host: config.deleteMailbox.host,
                port: config.deleteMailbox.port,
                tls: true,
                authTimeout: 3000
            }
        };

        try {
            var connection = await(imap.connect(mailConfig));
            var letters = this.getLetters_(connection, config);
            this.processLetters_(letters);
        } catch(e) {
            console.log(e);
        } finally {
            connection.end();
        }
    }

    /**
     * @param {object} connection
     * @param {object} config
     * @return {array<object>}
     * @private
     */
    getLetters_(connection, config) {
        await(connection.openBox('INBOX'));

        var fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false
        };

        var letters = await(connection.search(['ALL'], fetchOptions));

        return letters.map(letter => {
                await(connection.moveMessage(
                    letter.attributes.uid, '[Gmail]/Trash')
                );
                return {
                    uid: letter.attributes.uid,
                    from: letter.parts[1].body.from[0]
                        .match(/(?:<)(.+)(?:>)/)[1],
                    body: mimelib.decodeQuotedPrintable(letter.parts[0].body)
            };
        });
    }

    /**
     * @param {array<object>} letters
     * @private
     */
    processLetters_(letters) {
        letters.forEach(letter => {
            if (letter.from === letter.from) {//config.emailNotifier.email) {
                var text = letter.body;
                if (text && text.indexOf('id = ') > -1) {
                    var commentId = text.match(/(?:id = )(\d+)/)[1];
                    this.sendDeleteReq_(commentId);
                }
            }
        });
    }

    /**
     * Send delete request to api
     * @param {number} id - comment's id
     * @private
     */
    sendDeleteReq_(id) {
        var data = querystring.stringify({
                'token': TOKEN
            }),
            options = {
                host: 'www21.lan', //config.url.host, - real host
                port: 3000, // delete
                method: 'DELETE',
                path: '/api/comment/delete/' + id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length
                }
            };

        var req = http.request(options);
        req.write(data);
        req.end();
    }
}

var start = async(() => {
    var parseMail = new ParseMail();

    await(parseMail.process());
});

/**
 * Settings for accessing this script using cli
 */
commander
    .command('parseMail')
    .description('Parses e-mail box and deletes comments from messages')
    .action(() => start());

exports.Command;
