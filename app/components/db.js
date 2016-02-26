var Sequelize = require('sequelize');

var dbConfig = require('../config').db;

module.exports = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        port: dbConfig.port
    }
);
