'use strict';

const commander = require('commander');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

const CommentPublicationDateUpdater =
    require('./modules/comments/CommentPublicationDateUpdater');


var update = async(function(filePath, options) {
    var commentPublicationDateUpdater =
        new CommentPublicationDateUpdater();
    await(commentPublicationDateUpdater.updateDates(filePath, options));
});


commander
    .command('updateCommentsPublicationDates <path>')
    .description('Adds comments from given *.csv.' +
    ' File name should contain _new/_old suffix depends on file structure')
    .option('-a, --archive', 'Adds comments in compressed JSON')
    .option('-f, --file_type <type>', 'Parses different file types (old/new)')
    .action((filePath, options) => {
        update(filePath, options);
    });

exports.Command;
