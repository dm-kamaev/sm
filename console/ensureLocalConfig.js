var fs = require('fs');
var path = require('path');
const CONFIG_PATH = '../environment/config';

var getSpecificConfig = function(fileName, folder) {
    var file = null;
    try {
        file = require(path.join(__dirname, CONFIG_PATH, folder, fileName));
    } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            console.log('[ERR]');
            console.log(e, fileName);
            console.log(e.stack);
            throw e;
        }
    } finally {
        return file;
    }
};

var createLocalConfig = function(configName, env) {
    var baseConfig = getSpecificConfig(configName, 'base') || {};
    var envConfig = getSpecificConfig(configName, env) || {};
    baseConfig = Object.assign(baseConfig, envConfig);
    var localConfig = getSpecificConfig(configName, 'local') || {};
    baseConfig = Object.assign(baseConfig, localConfig);
    var existingConfig = getSpecificConfig(configName, '');
    if (existingConfig) {
        console.warn('[WARN] Config exists: ' + configName + '. Rewriting');
    }
    var newName = path.basename(configName, path.extname(configName)) + '.json';
    fs.writeFileSync(
        path.join(__dirname, CONFIG_PATH, newName),
        JSON.stringify(baseConfig, null, 4)
    );
};

var getBaseConfigList = function() {
    return fs.readdirSync(path.join(__dirname, CONFIG_PATH, 'base'))
        .filter(filename => (
            path.extname(filename) === '.js' ||
            path.extname(filename) === '.json' )
        );
};

var run = function() {
    var env = process.argv.slice(2)[0] || 'dev';
    console.log('[DEBUG] ENV: ' + env);
    var configNames = getBaseConfigList();
    configNames.forEach(config => {
        createLocalConfig(config, env);
    });

};
run();
