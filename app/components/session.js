'use strict';

const Session = require('express-session');
const uid = require('uid-safe').sync;

const RedisStore = require('connect-redis')(Session);
const config = require('../config/config.json');

const SECRET = 'schoolsnotfm';

module.exports = Session({
    cookie: {
        domain: getDomain(),
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    name: 'connect.sid.v1',
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        host: '127.0.0.1',
        port: 6379
    }),
    genid: function(req) {
        return req.body.sessionId || uid(24);
    }
});


/**
 * getDomain second level for cross domain cookies
 * @return {string} '.www61.lan'
 */
function getDomain() {
    const host = config.schools.host;
    const match = host.match(/(\.\S+\.\S+)$/);
    return match[1];
}
