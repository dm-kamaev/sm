const commander = require('commander');

const ModelArchiver = require('./modules/modelArchiver/ModelArchiver');
const async = require('asyncawait/async');
const models = require.main.require('./app/components/models').all;
const path = require('path');
const readlineSync = require('readline-sync');
const colors = require('colors');
const fs = require('fs-extra');

var modules = {
    GEO: 'geo',
    SCHOOL: 'school',
    STUDY: 'study',
    UNIVER: 'univer',
    COMMENT: 'comment',
    USER: 'user'
};
/* List of models to update data */
var modelModules = {
    Comment: modules.COMMENT,
    CommentGroup: modules.COMMENT,
    Rating: modules.COMMENT,

    Address: modules.GEO,
    Area: modules.GEO,
    City: modules.GEO,
    Department: modules.GEO,
    Metro: modules.GEO,
    AddressMetro: modules.GEO,

    Activity: modules.SCHOOL,
    School: modules.SCHOOL,
    SchoolUrl: modules.SCHOOL,
    SchoolTypeFilter: modules.SCHOOL,

    CityResult: modules.STUDY,
    EgeResult: modules.STUDY,
    GiaResult: modules.STUDY,
    OlimpResult: modules.STUDY,
    Subject: modules.STUDY,

    University: modules.UNIVER,
    SchoolUniversity: modules.UNIVER,

    UserData: modules.USER
};

var start = async(function() {
    var options = {};
    var modelKeys = Object.keys(modelModules);
    var index = readlineSync.keyInSelect(modelKeys, 'Choose model to archive');
    var selectedModel = modelKeys[index];
    options.model = models[selectedModel];
    options.isCustomName = readlineSync.keyInYN(
        'Would you like to name archive as one of migrations?'
    );
    if (options.isCustomName) {
        options.name = chooseName(modelModules[selectedModel]);
    }
    options.isAllAttributes = readlineSync.keyInYN('Save all attributes?');
    if (!options.isAllAttributes) {
        options.attributes = chooseAttributes(options.model);
    }
    archiveModel(options);
});

/**
 * @param {string} module
 * @return {string}
 */
var chooseName = function(module) {
    var migrationPath = path.join(__dirname, '../api/modules',
       module, 'migrations'
    );
    var migrations = fs.readdirSync(migrationPath)
        /* Leave only .js files */
        .filter(filename => {
            var splitted = filename.split('.');
            if (splitted[splitted.length - 1] == 'js') {
                return true;
            }
        })
        .map(filename => filename.replace('.js', ''));

    var index = readlineSync.keyInSelect(migrations, 'Choose name for archive');
    return migrations[index] + '.tar.gz';
};


/**
 * @param {object} model
 * @return {array<string>}
 */
var chooseAttributes = function(model) {
    var variants = Object.keys(model.attributes);
    var variantsStr = variants.reduce(
        function(prev, current, index) {
            return prev + (index + ') ' + current + '\n');
        }, '');

    console.log('\n');
    console.log(colors.green('\tAttributes:\n'));
    console.log(variantsStr);

    try {
        var answer = readlineSync.question(
            'Choose attributes (format: 0,3,4)\n'
        );
        var answerNumbers = answer.split(',');
        return answerNumbers.map(number => {
            var attribute = variants[number];
            if (!attribute) {
                throw new Error();
            }
            return attribute;
        });
    } catch (e) {
        throw new Error('Unexpected answer!');
    }
};


/**
 * @param {object} options
 */
var archiveModel = async(function(options) {
    var fullPath = options.isLocal ? __dirname :
        path.join(
            __dirname, '../api/modules',
            modelModules[options.model.name], 'migrations'
        );
    var archiver = new ModelArchiver(
        options.model,
        fullPath,
        options.attributes,
        options.name);
    archiver.save();
});


commander
     .command('modelArchiver')
     .description('gets cords from yandex api')
     .action(() => start());
exports.Command;
