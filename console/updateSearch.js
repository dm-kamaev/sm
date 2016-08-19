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
    //     name: 'Новый Хороший Егэ 2016-2017',
    //     description: 'Шестиуровневый курс, созданный специально для подростков 13-17 лет',
    //     fullInfo: `Международный языковой центр Language Link приглашает подростков 13-17 лет на занятия по многоуровневым программам общего английского языка. Занятия ведут профессиональные преподаватели английского языка по коммуникативной методике, на уроках используются современные английские учебники с аудиоприложениями. Программы общего английского языка предполагают одновременное развитие всех языковых навыков: устной речи, восприятия на слух, чтения и письма.
    //
    //         English in Mind - шестиуровневый курс, созданный специально для подростков. Интересные тексты, актуальные темы, современные видео и культурологические материалы - всё разработано с учётом возрастных особенностей обучающихся.
    //
    //         Курс не только активно развивает навыки говорения, но и делает акцент на грамматике и словарном запасе, что значительно облегчает подготовку к школьным и международным экзаменам. По мимо учебника и рабочей тетради, обучающиеся, для самостоятельного закрепления материала, могут пользоваться диском с дополнительными заданиями и ресурсами на сайте издательства.
    //
    //         Курс English in Mind состоит из 6 уровней.
    //
    //         Учебная программа подбирается по результатам бесплатного вступительного тестирования и собеседования с преподавателем. Для тех, кто хотел бы проверить свой уровень знаний прямо сейчас, разработано специальное <a href="#">online-тестирование</a>.`,
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
    //         online: false,
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
