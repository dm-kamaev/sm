const commander = require('commander');

const ModelArchiver = require('./modules/modelArchiver/ModelArchiver');
const async = require('asyncawait/async');
const models = require.main.require('./app/components/models').all;
const path = require('path');
const readlineSync = require('readline-sync');

var modules = {
    GEO: 'geo',
    SCHOOL: 'school',
    STUDY: 'study',
    UNIVER: 'univer'
};
/*List of models to update data*/
var modelModules = {
    Address: modules.GEO,
    Area: modules.GEO,
    City: modules.GEO,
    Department: modules.GEO,
    Metro: modules.GEO,

    Activity: modules.SCHOOL,
    School: modules.SCHOOL,
    SchoolTypeFilter: modules.SCHOOL,

    CityResult: modules.STUDY,
    EgeResult:  modules.STUDY,
    GiaResult: modules.STUDY,
    OlimpResult: modules.STUDY,
    Subject: modules.STUDY,

    University: modules.UNIVER,
    SchoolUniversity: modules.UNIVER,
};

var start = async(function() {
    var modelKeys = Object.keys(modelModules);
    var index = readlineSync.keyInSelect(modelKeys, 'Choose model to archive');
    var selectedModel = modelKeys[index];
    archiveModel(selectedModel);
});

/**
 * @param {string} modelName
 */
var archiveModel = async(function(modelName) {
    var fullPath = path.join(
        __dirname, 
        '../api/modules', 
        modelModules[modelName], 
        'migrations');
    var archiver = new ModelArchiver(models[modelName], fullPath);
    archiver.save();
}); 




commander
     .command('modelArchiver')
     .description('gets cords from yandex api')
     .action(() => start());
exports.Command;
