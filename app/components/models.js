'use strict';

var path = require('path'),
    fs = require('fs');
var async = require('asyncawait/async');

var models = {};

exports.all = models;

exports.initModels = function(dirPath) {
    var localModels = fs
        .readdirSync(dirPath)
        .filter(file => (~file.indexOf('.js') && file != 'index.js'))
        .map(file => require(path.join(dirPath, file)))
        .reduce(function(res, model) {
            let SequelizeModel = model.Model || model.default || model;
            res[SequelizeModel.name] = SequelizeModel;
            return res;
        }, {});

    Object.assign(models, localModels);

    return localModels;
};

exports.initAssociations = async(function() {
    Object.keys(models).forEach(function(name) {
        var model = models[name];
        if (model.associate) {
            model.associate(models);
        }
    });
});
