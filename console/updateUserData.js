'use strict';

const commander = require('commander');
const UserDataUpdater = require('./modules/userDataUpdater/userDataUpdater');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var parse = async(function(options) {
    var userDataUpdater = new UserDataUpdater();

    await (userDataUpdater.createCorrelatingCsv(options));
});

var update = async(function(path) {
    var userDataUpdater = new UserDataUpdater();

    await(userDataUpdater.updateFromCsv(path));
});

commander
    .command('parseUserData')
    .description('Create archive with original and updated names')
    .option(
        '-u, --updatedNames <path>', 'Path to updated file'
    )
    .option(
        '-o, --oldNames <path>', 'path to generic file'
    )
    .action((options) => parse(options));

commander
    .command('updateUserData <path>')
    .description('updates user data from given csv')
    .action((path) => update(path));

exports.Command;
