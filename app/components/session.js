const Session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(Session.Store);
const uid = require('uid-safe').sync;

var db = require('./db');

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
    store: new SequelizeStore({
        db: db
    }),
    genid: function(req) {
        return req.body.sessionId || uid(24);
    }
});
