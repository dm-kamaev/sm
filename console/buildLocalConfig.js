'use strict';

var fs = require('fs');
var path = require('path');

class BuildConfig {
    /**
     * @param {string} configPath
     */
    constructor(configPath) {
        this.configPath_ = configPath;
    }

    /**
     * @param {string} fileName
     * @param {string} folder
     * @return {Object}
     */
    getSpecificConfig(fileName, folder) {
        var file = null;
        try {
            file = require(
                path.join(__dirname, this.configPath_, folder, fileName)
            );
        } catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
                console.log('[ERR]');
                console.log(e, fileName);
                console.log(e.stack);
                throw e;
            }
        }
        return file;
    }

    /**
     * @param {string} configName
     * @param {string} env
     */
    createLocalConfig(configName, env) {
        var baseConfig = this.getSpecificConfig(configName, 'base') || {};
        var envConfig = this.getSpecificConfig(configName, env) || {};
        baseConfig = Object.assign(baseConfig, envConfig);
        var localConfig = this.getSpecificConfig(configName, 'local') || {};
        baseConfig = Object.assign(baseConfig, localConfig);
        var existingConfig = this.getSpecificConfig(configName, '');
        if (existingConfig) {
            console.warn('[WARN] Config exists: ' + configName + '. Rewriting');
        }
        var newName = path.basename(configName, path.extname(configName)) +
            '.json';
        fs.writeFileSync(
            path.join(__dirname, this.configPath_, newName),
            JSON.stringify(baseConfig, null, 4)
        );
    }

    /**
     * @return {Array<string>}
     */
    getBaseConfigList() {
        return fs.readdirSync(path.join(__dirname, this.configPath_, 'base'))
            .filter(filename => (
                path.extname(filename) === '.js' ||
                path.extname(filename) === '.json')
            );
    }

    /**
     * Run
     */
    run() {
        var env = process.argv.slice(2)[0] || 'dev';
        console.log('[DEBUG] ENV: ' + env);
        var configNames = this.getBaseConfigList();
        configNames.forEach(config => {
            this.createLocalConfig(config, env);
        });
    }
}

var ensureConfig = new BuildConfig(process.argv[3]);
ensureConfig.run();
