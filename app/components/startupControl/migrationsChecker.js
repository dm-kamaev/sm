'use strict';

const await = require('asyncawait/await');
const glob = require('glob');
const path = require('path');
const lodash = require('lodash');

const sequelize = require('../db');

/**
 * Class to check migrations actuality
 */
class MigrationsChecker {
    /**
     * Useless constructor
     * @constructor
     */
    constructor() {

    }

    /**
     * Checks actuality of project migrations
     */
    check() {
        var dbMigrations = this.dbMigrations_,
            fsMigrations = this.fsMigrations_;

        if (lodash.difference(fsMigrations, dbMigrations).length) {
            this.throwError_();
        }
    }

    /**
     * Applied to the database migration names
     * @return {Array<string>} - Migrations from database
     * @private
     */
    get dbMigrations_() {
        var records = [];

        try {
            records = await(
                sequelize.query('SELECT * FROM "SequelizeMeta"', {
                    type: sequelize.QueryTypes.SELECT
                })
            );
        }
        catch (exception) {

        }

        return records.map(item => item.name);
    }

    /**
     * Migration names from project files
     * @return {Array<string>} - Migrations from file system
     * @private
     */
    get fsMigrations_() {
        var paths = glob.sync('../../../api/**/migrations/*.js', {
            cwd: __dirname
        });

        return paths.map(file => path.basename(file));
    }

    /**
     * Throw error
     * @private
     */
    throwError_() {
        var message = '\n' +
            'Your db is not actual. Use "gulp migrate".\n' +
            'If after that your db is still not actual, ' +
            'then clear table "SequelizeMeta" and try ' +
            'run "gulp migrate" one more time.\n';

        var dbMigrations = this.dbMigrations_,
            fsMigrations = this.fsMigrations_,
            diff = lodash.difference(fsMigrations, dbMigrations);

        message += 'Migrations that are not found in the database: ' +
            diff.join(', ') + '.\n';

        throw message;
    }
}

module.exports = MigrationsChecker;
