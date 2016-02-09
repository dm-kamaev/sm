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
        var dbMigrations = this.dbMigrations_.sort(),
            fsMigrations = this.fsMigrations_.sort();

        if (!lodash.isEqual(dbMigrations, fsMigrations)) {
            throw 'Your db is not actual. Use "gulp migrate". ' +
                'If after that your db is still not actual ' +
                'then clear table "SequelizeMeta" and try ' +
                'run "gulp migrate" one more time';
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
}

module.exports = MigrationsChecker;
