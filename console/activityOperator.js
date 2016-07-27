'use strict';

const commander = require('commander'),
    async = require('asyncawait/async'),
    await = require('asyncawait/await');

const ActivitySphereOperator =
    require('./modules/activities/ActivitySphereOperator');

var processDbSpheres = async(function() {
    var activitySphereOperator = new ActivitySphereOperator();

    activitySphereOperator.process();
});

commander
    .command('create-and-archive-activity-spheres')
    .description('Create and archive table with activity spheres')
    .action(processDbSpheres);

exports.Command;
