'use strict';

const commander = require('commander'),
    async = require('asyncawait/async'),
    await = require('asyncawait/await');

const SeoPageOperator = require('./modules/seoPageTools/SeoPageOperator');


var archiveSeoPages = async(function() {
    var seoPageOperator = new SeoPageOperator();

    await(seoPageOperator.createSeoPagesArchive());
});


var archiveSeoSchoolLists = async(function() {
    var seoPageOperator = new SeoPageOperator();

    await(seoPageOperator.createSeoSchoolListsArchive());
});


commander
    .command('archive-seo-pages')
    .description('creates seo pages archive from json')
    .action(archiveSeoPages);


commander
    .command('archive-school-lists')
    .description('creates seo school lists archive with csv')
    .action(archiveSeoSchoolLists);

exports.Command;
