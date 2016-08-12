'use strict';
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const SearchUpdater = require('./modules/searchUpdater/SearchUpdater');
var sequelize = require.main.require('./app/components/db');
var modules = require('../api/modules'); // eslint-disable-line no-unused-vars
var services = require('../app/components/services').all;

var start = async(function(argstring) {
    // await(services.courseDepartment.create({
    //     description: 'Здание на улице',
    //     address: 'ул. Пушкина, д. Колотушкина',
    //     area: 'Замоскворечье'
    // }));
    // await(services.course.create({
    //     name: 'ЕГЭ',
    //     description: 'Топ ЕГЭ',
    //     brandName: 'Maximum',
    //     options: [{
    //         costPerHour: 540,
    //         online: false,
    //         age: [14, 15],
    //         group: true,
    //         teacher: 'Матюкан В.А.',
    //         schedule: [{
    //             startTime: '14:00',
    //             day: 5,
    //             duration: 1.5
    //         }]
    //     }]
    // }));
    // process.exit();
    var args = argstring.split(' ');
    var options = {};
    if (args.indexOf('silent') != -1) {
        options.isQuiet = true;
    }
    sequelize.options.logging = false;
    var searchUpdater = await(new SearchUpdater(options));
    searchUpdater.updateForAll();
});

commander
    .command('search [argstring]')
    .description('Update search table')
    .action((argstring) => start(argstring || ''));

exports.Command;
