const fs = require('fs');
const https = require('https');
const colors = require('colors');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var Common = function() {};

Common.readText = function(path) {
    if (Common.fileExists(path)) { 
        return fs.readFileSync(path).toString();
    } else {
        console.log('File ' + colors.red(path) + 'does not exists');
    }
};


Common.fileExists = function(filePath)
{
    try {
        fs.statSync(filePath);
        return true;
    } catch (err) {
        return false;
    }
};

Common.checkFunctions = function(instanse) {
    for (var prop in instanse){
        if (typeof instanse[prop] === 'function')
            console.log(colors.magenta(prop));         
    }
}

Common.saveJson = (json, path) => {
    var js = JSON.stringify(json);
    fs.writeFileSync(path, js);
};

Common.loadJson = (path) => { 
    if (!Common.fileExists(path)) {
        console.log('File ' + colors.yellow(path) +
            ' is not found and will be created now');
        fs.writeFileSync(path, '[]');
    }
    return require('../' + path);
};
module.exports = Common;
