const fs = require('fs');
const https = require('https');
const async = require('asyncawait/async');
const exec = require('child_process').exec;
const await = require('asyncawait/await');

var Common = function() {};

/**
 * @param {string} path
 * @return {string}
 */
Common.readText = function(path) {
    if (Common.fileExists(path)) {
        return fs.readFileSync(path).toString();
    } else {
        throw new Error('File ' + path + ' does not exists');
    }
};

/**
 * @param {string} filePath
 * @return {Boolean}
 */
Common.fileExists = function(filePath) {
    try {
        fs.statSync(filePath);
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * @param {object} instanse - Sequelise model instanse
 */
Common.checkFunctions = function(instanse) {
    for (var prop in instanse) {
        if (typeof instanse[prop] === 'function')
            console.log(prop);
    }
};

/**
 * Check if directory exiists. If not - create
 * @param {string} path
 */
Common.checkDir = function(path) {
    try {
        fs.statSync(path);
    } catch (e) { //TODO: only if ENOENT
        fs.mkdirSync(path);
    }
};

/**
 * @param {Object} json
 * @param {String} path
 */
Common.saveJson = (json, path) => {
    var js = JSON.stringify(json);
    fs.writeFileSync(path, js);
};

/**
 * @param {string} execString - command to run in terminal
 * @return {promise}
 */
Common.execAsync = async(function (execString) {
    var doExec = new Promise( function(resolve, reject) {
        exec(execString, {maxBuffer: 1024 * 500},
            function (error, stdout) {
                console.log(stdout);
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve({success:true});
                }
            });
    });
    return doExec;
});

/**
 * @param {string} path
 * @return {object}
 */
Common.loadJson = function (path) {
    if (!Common.fileExists(path)) {
        console.log('File ' + path + ' is not found and will be created now');
        fs.writeFileSync(path, '[]');
    }
    return require('../' + path);
};
module.exports = Common;
