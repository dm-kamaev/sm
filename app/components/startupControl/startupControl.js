'use strict';

const MigrationsChecker = require('./migrationsChecker');

/**
 * Class to check the working conditions necessary for the application
 */
class StartupControl {
    /**
     * Class constructor
     * @param {Object.<string, boolean>} [opt_options]
     * @param {boolean} [opt_options.checkMigrations=false] Check migrations actuality
     * @constructor
     */
    constructor(opt_options) {
        this.handlers_ = this.initHandlers_();
        this.checkList_ = this.initCheckList_(opt_options);
    }

    /**
     * Checks startup conditions
     * @return {Promise}
     */
    check() {
        return new Promise((resolve, reject) => {
            try {
                this.checkList_.forEach(currentCheck => {
                    currentCheck();
                });
                resolve();
            }
            catch (exception) {
                reject(exception);
            }
        });
    }

    /**
     * Dictionary of conditions handlers
     * @return {Object.<string, function>}
     * @private
     */
    initHandlers_() {
        return {
            'checkMigrations': this.checkMigrations_
        };
    }

    /**
     * Generate list of startup check-functions
     * @param {Object.<string, boolean>} [opt_options]
     * @param {boolean} [opt_options.checkMigrations=false] Check migrations actuality
     * @return {Array<function>} - Array of checks to execute
     * @private
     */
    initCheckList_(opt_options) {
        var options = opt_options || {};

        return Object.keys(options)
            .filter(key => options[key])
            .map(key => this.handlers_[key]);
    }

    /**
     * Checks actuality of project migrations
     * @private
     */
    checkMigrations_() {
        var migrationsChecker = new MigrationsChecker();
        migrationsChecker.check();
    }
}

module.exports = StartupControl;
