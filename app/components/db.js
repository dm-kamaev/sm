var Sequelize = require('sequelize');

var config = require('../config').config;
var dbConfig = require('../config').db;
var logger = require('./logger/logger').getLogger('sequelize');

var options = {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port
};

if (config.environment != 'production') {
    options.logging = logger.debug.bind(logger);
    options.benchmark = true;
}

module.exports = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    options
);
