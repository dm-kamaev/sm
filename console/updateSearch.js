'use strict';
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const SearchUpdater = require('./modules/searchUpdater/SearchUpdater');
var sequelize = require.main.require('./app/components/db');
var modules = require('../api/modules'); // eslint-disable-line no-unused-vars
var services = require('../app/components/services').all;

var start = async(function(argstring) {
    // await(services.course.create({
    //     name: 'Onlane',
    //     description: 'adkaksdoaksdpoakwpdokpqawokdqpowkd qpokwd pqokwdpqokwd',
    //     brandName: 'Coursera',
    //     options: [{
    //         costPerHour: 512,
    //         online: true,
    //         age: [13, 14, 15],
    //         maxGroupSize: 1,
    //         startDate: '2016-10-11',
    //         duration: 1.5,
    //         schedule: [{
    //             startTime: '16:30',
    //             endTime: '18:45',
    //             day: 1
    //         }, {
    //             startTime: '17:30',
    //             endTime: '19:45',
    //             day: 3
    //         }],
    //         departments: [{
    //             name: 'Арбат',
    //             description: 'Для учеников',
    //             address: 'переулок Сивцев Вражек, д. 23/14',
    //             phone: '7982313213'
    //         }, {
    //             name: 'Арбат',
    //             description: 'Для бездомных',
    //             address: 'Большая Декабрьская улица, 2'
    //         }]
    //     }, {
    //         costPerHour: 212,
    //         online: true,
    //         age: [5, 6, 7],
    //         maxGroupSize: 10,
    //         startDate: '2016-09-03',
    //         duration: 1,
    //         schedule: [{
    //             startTime: '14:00',
    //             endTime: '15:15',
    //             day: 5
    //         }, {
    //             startTime: '11:30',
    //             endTime: '13:00',
    //             day: 6
    //         }],
    //         departments: [{
    //             name: 'Арбат',
    //             description: 'Для учеников',
    //             address: 'переулок Сивцев Вражек, д. 23/14',
    //             phone: '7982313213'
    //         }, {
    //             name: 'Арбат',
    //             description: 'Для бездомных',
    //             address: 'Большая Декабрьская улица, 2'
    //         }, {
    //             name: 'Reorg: Fast&Clean',
    //             description: 'Для центральных',
    //             address: 'улица Климашкина, 12'
    //         }]
    //     }]
    // })); process.exit();
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
