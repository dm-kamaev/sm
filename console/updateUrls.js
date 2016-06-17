'use strict';
const async = require('asyncawait/async');
const await = require('asyncawait/await');
var urlService = require('../api/modules/entity/services/urls');
var commander = require('commander');

var start = async(function() {
    await(urlService.updateAll());
});

commander
    .command('urls')
    .description('Update school urls')
    .action(() => start());

exports.Command;
