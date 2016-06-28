'use strict';

var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var CommentsParser = require('./modules/comments/CommentsParser');

var startScript = async(function(filePath, options) {
    var commentsParser = new CommentsParser(filePath, options);
    await(commentsParser.parse());
});

commander
    .command('comments <path>')
    .description('Adds comments from given *.csv.' +
        ' File name should contain _new/_old suffix depends on file structure')
    .option('-a, --archive', 'Adds comments in compressed JSON')
    .option('-f, --file_type <type>', 'Parses different file types (old/new)')
    .action((filePath, options) => {
        startScript(filePath, options);
    });

exports.Command;
