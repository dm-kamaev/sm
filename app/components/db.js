var Sequelize = require('sequelize');

var config = require.main.require('./app/config'),
    dbConfig = config.db;


module.exports = new Sequelize(
    dbConfig.name,
    dbConfig.user,
    dbConfig.password, {
        dialect: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port
    }
);
