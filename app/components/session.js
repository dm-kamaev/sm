const Session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(Session.Store);
const uid = require('uid-safe').sync;
var express = require('express');
var RedisStore = require('connect-redis')(Session);

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
    store: new RedisStore({
      host: '127.0.0.1',
      port: 6379
    }),
    genid: function(req) {
        return req.body.sessionId || uid(24);
    }
});
