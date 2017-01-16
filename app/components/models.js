'use strict';

var path = require('path'),
    fs = require('fs');
var async = require('asyncawait/async');

var models = {};

exports.all = models;

exports.initAll = function(apiModulesPath) {
    var modules = fs.readdirSync(apiModulesPath)
        .filter(file => (file.indexOf('.') && file != 'index.js'));
    modules.forEach(module => {
        var modulePath = path.join(apiModulesPath, module);
        var moduleFolders = fs.readdirSync(modulePath)
            .filter(file => (file.indexOf('.') && file != 'index.js'));
        if (moduleFolders.indexOf('models') != -1) {
            this.initModels(path.join(modulePath, 'models'));
        }
    });
    return this.all;
};

exports.initModels = function(dirPath) {
    var localModels = fs
        .readdirSync(dirPath)
        .filter(file => (~file.indexOf('.js') && file != 'index.js'))
        .map(file => require(path.join(dirPath, file)))
        .reduce(function(res, model) {
            let SequelizeModel = model.default || model;
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
