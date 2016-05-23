var fs = require('fs');
var path = require('path');

const CONFIG_PATH = '../app/config/config.json';

module.exports = function(gulpHelper) {

    function addTimstampToConfig() {
        var configPath = path.join(__dirname, CONFIG_PATH),
            config = require(configPath);

        config.lastBuildTimestamp = new Date().getTime();

        var json = JSON.stringify(config, null, 4);
        fs.writeFileSync(configPath, json);
    }

    return function() {
        var promise = new Promise(function(resolve, reject) {
            try {
                addTimstampToConfig();
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });

        return promise;
    };
};
