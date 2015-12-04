var path = require('path'),
    fs = require('fs');

var enums = {};


exports.all = enums;

exports.initEnums = function(dirPath) {
    var localEnums = fs
        .readdirSync(dirPath)
        .filter(file => (file.indexOf('.') && file != 'index.js'))
        .map(file => require(path.join(dirPath, file)))
        .reduce(function(res, en) {
           res[en.enumName] = en;
            return res;
        }, {});

    Object.assign(enums, localEnums);
    return localEnums;
};

exports.enumPrototype = {
    toArray: function() {
        var res = [];
        for (var prop in this) {
            if (prop != 'prototype' && 
                typeof prop != 'function' &&
                prop != 'enumName')
                res.push(this[prop])
        }
        return res;
    }
};
