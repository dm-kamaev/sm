'use strict';

var path = require('path'),
    fs = require('fs');

var services = {};


exports.all = services;


exports.initServices = function(dirPath) {
    var localServices = fs
        .readdirSync(dirPath)
        .filter(file => (~file.indexOf('.js') && file != 'index.js'))
        .map(file => require(path.join(dirPath, file)))
        .reduce(function(res, service) {
            let serviceInstance = service.service || service;
            res[serviceInstance.name] = serviceInstance;
            return res;
        }, {});

    Object.assign(services, localServices);
    return localServices;
};
