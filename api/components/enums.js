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
    getProps: function() {
        var res = Object.assign({},this);
        for (var prop in this) {
            if (prop == 'prototype' || 
                typeof this[prop] == 'function' ||
                prop == 'enumName')
                delete res[prop];
        }
        return res;
    },
    toArray: function() {
        var res = [],
            props = this.getProps();
        for (var prop in props) {
            if (typeof props[prop] != 'function') {
                res.push(props[prop]);
            }
        }
        return res;
    },
    getPropByValue: function(value) {
        var res = null,
            props = this.getProps();
        for (var prop in props) {
            if (props[prop] == value) {
                return prop;
            }
        }
        return res;
    }
};
