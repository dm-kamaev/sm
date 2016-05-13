'use strict';

const commander = require('commander');
const UserDataUpdater = require('./modules/userDataUpdater/userDataUpdater');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var start = async(function(path) {
    var userDataUpdater = new UserDataUpdater();

    await (userDataUpdater.updateFromCsv(path));
});

commander
    .command('updateUserData <path>')
    .description('updates user data from given csv')
    .action((path) => start(path));
exports.Command;
