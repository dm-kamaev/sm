'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const SitemapCreator = require('./modules/sitemap/SitemapCreator');

var start = async(function() {
    var sitemapCreator = await(new SitemapCreator());
        sitemapCreator.create();
});

commander
    .command('sitemap')
    .description('Create sitemap')
    .action(() => start());

exports.Command;