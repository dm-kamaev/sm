'use strict';
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const schoolService = require('../api/modules/school/services/school');
var sequelize = require.main.require('./app/components/db');
    
var start = async(function(argstring) {
    var args = argstring.split(' ');
    sequelize.options.logging = false;
    await(schoolService.updateRanks());
});

commander
    .command('ranks [argstring]')
    .description('Update school ranks')
    .action((argstring) => start(argstring||''));

exports.Command;

