'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const commander = require('commander');
const SitemapUpdater = require('./modules/sitemap/SitemapUpdater');

const entityType = require('../api/modules/entity/enums/entityType');
const entityRoutes =
    require('../api/modules/entity/enums/entityRoutes').routes;

let start = async(function() {
    const entitiesSitemapUpdaters = [
        new SitemapUpdater(entityType.SCHOOL, entityRoutes.SCHOOL),
        new SitemapUpdater(entityType.COURSE, entityRoutes.COURSE),
        new SitemapUpdater(entityType.PROGRAM, entityRoutes.UNIVERSITY)
    ];
    await(entitiesSitemapUpdaters.map(sitemapUpdater =>
        sitemapUpdater.update()
    ));
});

commander
    .command('sitemap')
    .description('Update sitemap')
    .action(() => start());

exports.Command;
