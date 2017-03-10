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
    //         .replace(/SELECT/, '\nSELECT')
    //         .replace(/INSERT/, '\nINSERT')
    //         .replace(/UPDATE/, '\nUPDATE')
    //         .replace(/FROM/, '\nFROM')
    //         .replace(/LEFT OUTER JOIN/g, '\nLEFT OUTER JOIN')
    //         .replace(/WHERE/g, '\nWHERE')
    //     );
    // };
}


module.exports = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    options
);
