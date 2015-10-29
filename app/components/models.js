var path = require('path'),
    fs = require('fs');
var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

//var school = require.main.require('./app/modules/school/models/school');

var models = {};


exports.all = models;


exports.initModels = function(dirPath) {
    var localModels = fs
        .readdirSync(dirPath)
        .filter(file => (file.indexOf('.') && file != 'index.js'))
        .map(file => require(path.join(dirPath, file)))
        .reduce(function(res, model) {
            res[model.name] = model;
            return res;
        }, {});

    Object.assign(models, localModels);

    return localModels;
};

var syncAll = async(() => {
    Object.keys(models).forEach( name => {
        var model = models[name];
        await (model.sync());
    })
});

exports.initAssociations = async(function() {
    Object.keys(models).forEach(function (name) {
        var model = models[name];
        if (model.associate) {
            console.log(colors.yellow('Associating model '+name))
            model.associate(models);
            console.log(colors.green('Model '+name+' associated'))
           // await (model.sync());
        }
    });
    await(syncAll());
});
