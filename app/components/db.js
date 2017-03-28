const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('school-market-namespace');
// cls for autoset transactions
const Sequelize = require('sequelize');
Sequelize.cls = namespace;

var config = require('../config').config;
var dbConfig = require('../config').db;
var logger = require('./logger/logger').getLogger('sequelize');

var options = {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port
};

if (config.environment != 'production') {
    options.benchmark = true;
    options.logging = logger.debug.bind(logger);
    // options.logging = function(query) {
    //     logger.debug(query
    //        .replace(/(,)/g, '$1\n')
    //        .replace(/SELECT/, 'SELECT\n')
    //        .replace(/(INSERT)/, '$1\n')
    //        .replace(/(UPDATE)/, '$1\n')
    //        .replace(/(FROM)/, '\n$1')
    //        .replace(/(LEFT OUTER JOIN)/g, '\n$1')
    //        .replace(/(LEFT JOIN)/g, '\n$1')
    //        .replace(/(WHERE)/g, '\n$1')
    //        .replace(/(VALUES)/g, '\n$1\n')
    //        .replace(/(ARRAY)/g, '\n$1')
    //        .replace(/(GROUP BY)/g, '\n$1\n')
    //     );
    // };
}


module.exports = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    options
);
