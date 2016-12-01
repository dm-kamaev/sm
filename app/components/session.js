const Session = require('express-session');
const uid = require('uid-safe').sync;
var RedisStore = require('connect-redis')(Session);

const SECRET = 'schoolsnotfm';

module.exports = Session({
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    name: 'connect.sid',
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
