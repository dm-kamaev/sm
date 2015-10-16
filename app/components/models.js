var path = require('path'),
    fs = require("fs");

var models = {};


exports.all = models;

exports.initModels = function(dirPath) {
    var localModels = fs
        .readdirSync(dirPath)
        .filter(file => (file.indexOf(".") && file != "index.js"))
        .map(file => require(path.join(dirPath, file)))
        .reduce(function(res, model) {
            res[model.name] = model;
            return res;
        }, {});

    Object.assign(models, localModels);

    return localModels;
};
