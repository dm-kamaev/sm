'use strict';
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const services = require('../app/components/services').all;
var sequelize = require.main.require('./app/components/db');

var start = async(function(argstring) {
    sequelize.options.logging = false;
    await(services.school.updateRanks());
});

commander
    .command('ranks [argstring]')
    .description('Update school ranks')
    .action((argstring) => start(argstring || ''));

exports.Command;
