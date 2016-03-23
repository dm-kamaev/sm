'use strict'

var fs = require('fs');
var dbConfig = require('./config.db.json');
var config  = require('./config.json');

var checkEnvironment = function () {
    if (fs.existsSync('./config.local.json')) {
        config = require('./config.local.json');
    }
    if (fs.existsSync('./config.local.db.json')) {
        dbConfig = require('./config.local.db.json');
    }

    return {
        db: dbConfig,
        config: config
    };
};

module.exports = checkEnvironment();
