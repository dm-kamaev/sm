'use strict';

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = '../app/config/base/config.json';
const config = require(path.join(__dirname, CONFIG_PATH));

module.exports = function(gulpHelper) {
    /**
     * add Timstamp to config
     */
    function addTimstampToConfig() {
        let configPath = path.join(__dirname, CONFIG_PATH);

        config.lastBuildTimestamp = new Date().getTime();

        let json = JSON.stringify(config, null, 4);
        fs.writeFileSync(configPath, json);
    }

    return function() {
        let promise = new Promise(function(resolve, reject) {
            try {
                addTimstampToConfig();
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        return promise;
    };
};
