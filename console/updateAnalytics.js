'use strict';

const commander = require('commander');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const AnalyticsReportLoader =
    require('./modules/googleAnalytics/AnalyticsReportLoader');

const SILENT_ARG = 'silent';

/**
 * Update analytics data
 * @param {string} argstring
 */
let updateAnalyticsData = async(function(argstring) {
    let args = argstring.split(' ');
    let options = {};

    if (~args.indexOf(SILENT_ARG)) {
        options.isQuiet = true;
    }

    let analyticsReportLoader = new AnalyticsReportLoader();
    await(analyticsReportLoader.init(options));
    await(analyticsReportLoader.updateCourseAnalytics());
});

commander
    .command('analytics [argstring]')
    .description('Fill db with courses analytics data')
    .action((argstring) => updateAnalyticsData(argstring || ''));

exports.Command;
