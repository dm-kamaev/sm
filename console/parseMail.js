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
    constructor() {
        /**
         * Imap connector instance
         * @private
         */
        this.imapConnection_ = null;
    }

    /**
     * Main function
     */
    process() {

        var mailConfig = {
            imap: {
                user: config.deleteMailbox.email,
                password: config.deleteMailbox.password,
                host: config.deleteMailbox.host,
                port: config.deleteMailbox.port,
                tls: true,
                authTimeout: 3000
            }
        };

        try {
            this.imapConnection_ = await(imap.connect(mailConfig));
            var letters = await(this.getLetters_());
            var processedLettersIds = this.processLetters_(letters);
            this.deleteLetters_(processedLettersIds);
        } catch(e) {
            console.log(e);
        } finally {
            this.imapConnection_.end();
        }
    }

    /**
     * @return {array<object>}
     * @private
     */
    getLetters_() {
        await(this.imapConnection_.openBox('INBOX'));

        var fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false,
            struct: true
        };

        /** get all letters at inbox **/
        var letters = await(this.imapConnection_.search(['ALL'], fetchOptions));

        return letters.map(letter => {
            return {
                uid: letter.attributes.uid,
                from: letter.parts[1].body.from[0]
                    .match(/(?:<)(.+)(?:>)/)[1],
                body: this.getLetterBody_(letter)
            };
        });
    }

    /**
     * Get letter body
     * @private
     */
    getLetterBody_(letter) {
        /** Get letter parts from letter header **/
        var letterParts = imap.getParts(letter.attributes.struct);

        /** Get letter body part to parse **/
        var content = await(this.imapConnection_.getPartData(
            letter, letterParts[0]
        ));

        return await(content.toString('utf8'));
    }

    /**
     * @param {array<object>} letters
     * @private
     */
    processLetters_(letters) {
        var processedLetters = [];
        letters.forEach(letter => {
            if (letter.from === config.emailNotifier.email) {
                var text = letter.body;

                var commentId = text.match(/(?:id = )(\d+)/) &&
                        text.match(/(?:id = )(\d+)/)[1],
                    commentHost = text.match(/(?:http:\/\/)([\w.]+)/) &&
                        text.match(/(?:http:\/\/)([\w.]+)/)[1];

                if (commentHost === config.url.host) {
                    this.sendDeleteReq_(commentId);
                    processedLetters.push(letter.uid);
                }
            }
        });
        return processedLetters;
    }

    /**
     * @param {object} connection
     * @param {array<number>} letterIds - letter's ids
     * @private
     */
    deleteLetters_(letterIds) {
        letterIds.forEach(id => {
            this.imapConnection_.moveMessage(id, '[Gmail]/Trash');
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
                host: config.url.host,
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
