'use strict';
var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var sequelize = require('../app/components/db');

var AdditionalEducationParser =
    require('./modules/parse/pgu.mos.ru/AdditionalEducationParser');

var startScript = async(function(directory) {
    var parseActs = new AdditionalEducationParser(directory);
    await(parseActs.process());
});

commander
    .command('parsePguActs <path>')
    .description('Parse pgu.mos.ru activities from a given directory')
    .action(directory => startScript(directory));

exports.Command;
