'use strict';
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const SearchUpdater = require('./modules/searchUpdater/SearchUpdater');
var sequelize = require.main.require('./app/components/db');
    
var start = async(function(argstring) {
    var args = argstring.split(' ');
    var options = {};
    if (args.indexOf('silent') != -1)
        options.isQuiet = true;
    sequelize.options.logging = false;
    var searchUpdater = await(new SearchUpdater(options));
    searchUpdater.updateForAll();
});

commander
    .command('search [argstring]')
    .description('Update search table')
    .action((argstring) => start(argstring||''));

exports.Command;

