'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const commander = require('commander');
const SitemapUpdater = require('./modules/sitemap/SitemapUpdater');

const entityType = require('../api/modules/entity/enums/entityType');

let start = async(function() {
    let schoolSitemapUpdater = await(new SitemapUpdater(entityType.SCHOOL));
        schoolSitemapUpdater.update();

    let courseSitemapUpdater = await(new SitemapUpdater(entityType.COURSE));
        courseSitemapUpdater.update();
});

commander
    .command('sitemap')
    .description('Update sitemap')
    .action(() => start());

exports.Command;
