'use strict';

const path = require('path'),
    exec = require('child_process').exec;

const DUMP_PATH = path.resolve(
    'api/modules/entity/migrations',
    '20141029181044-start.dump'
);

module.exports = {
    up: function(queryInterface, Sequelize) {
        const database = queryInterface.sequelize.config.database;

        return new Promise((resolve, reject) => exec(
            `pg_restore -d ${database} ${DUMP_PATH}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            }
        ));
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface
            .dropAllTables()
            .then(() => queryInterface
                .dropAllEnums()
                .catch((error) => {
                    throw error;
                })
            );
    }
};
