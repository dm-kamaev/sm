'use strict';

const commander = require('commander');
const await = require('asyncawait/await');
const async = require('asyncawait/async');

const CommentPublicationDateManipulator =
    require('./modules/comments/CommentPublicationDateManipulator');


var parseFormCsv = async(function(filePath, options) {
    var commentPublicationDateManipulator =
        new CommentPublicationDateManipulator();
    await(commentPublicationDateManipulator.parseCommentsFromCsv(filePath, options));
});


commander
    .command('parseCommentsPublicationDates <path>')
    .description('Parse comments from given *.csv and archive it to file' +
    ' File name should contain _new/_old suffix depends on file structure')
    .option('-a, --archive', 'Adds comments in compressed JSON')
    .option('-f, --file_type <type>', 'Parses different file types (old/new)')
    .action((filePath, options) => {
        parseFormCsv(filePath, options);
    });

exports.Command;
