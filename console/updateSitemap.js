'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const commander = require('commander');
const SitemapUpdater = require('./modules/sitemap/SitemapUpdater');

var start = async(function() {
    var sitemapUpdater = await(new SitemapUpdater('schools'));
        sitemapUpdater.update();
});

commander
    .command('sitemap')
    .description('Update sitemap')
    .action(() => start());

exports.Command;
