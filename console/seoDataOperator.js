'use strict';

const commander = require('commander'),
    async = require('asyncawait/async'),
    await = require('asyncawait/await');

const SeoPageOperator = require('./modules/seo/SeoPageOperator'),
    SeoSchoolListOperator = require('./modules/seo/SeoSchoolListOperator');


var archiveSeoPages = async(function() {
    var seoPageOperator = new SeoPageOperator();

    await(seoPageOperator.createSeoPagesArchive());
});


var archiveSeoSchoolLists = async(function() {
    var seoSchoolListOperator = new SeoSchoolListOperator();

    await(seoSchoolListOperator.createArchive());
});


var actualizeSeoSchoolListSearchParams = async(function() {
    var seoSchoolListOperator = new SeoSchoolListOperator();

    await(seoSchoolListOperator.actualizeDbSearchParams());
});


commander
    .command('archive-seo-pages')
    .description('creates seo pages archive from json')
    .action(archiveSeoPages);


commander
    .command('archive-school-lists')
    .description('creates seo school lists archive with csv')
    .action(archiveSeoSchoolLists);

commander
    .command('actualize-seo-school-list-search-params')
    .description('actualizes search params for seo school lists')
    .action(actualizeSeoSchoolListSearchParams);

exports.Command;
