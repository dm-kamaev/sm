'use strict';

const commander = require('commander'),
    async = require('asyncawait/async'),
    await = require('asyncawait/await');

const SpecializedClassesOperator =
    require('./modules/SpecializedClasses/SpecializedClassesOperator');

var archiveDbTypes = async(function() {
    var specializedClassesOperator = new SpecializedClassesOperator();

    specializedClassesOperator.process();
});

commander
    .command('create-and-archive-specialized-classes-types')
    .description('Create and archive table with specialized classes types')
    .action(archiveDbTypes);

exports.Command;
