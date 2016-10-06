'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    commander = require('commander');

const CourseParser = require('./modules/parse/CourseParser');

/**
 * @param {string} filePath
 */
let parseCourse = async(function(filePath) {
    let courseParser = new CourseParser();

    await(courseParser.parse(filePath));
});

commander
    .command('parseCourse')
    .description('Parse courses from xlsx')
    .action((filePath) => parseCourse(filePath));

exports.Command;
