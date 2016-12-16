'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    path = require('path'),
    fs = require('fs'),
    minimist = require('minimist');

const CourseParser = require('../modules/parse/CourseParser'),
    modules = // eslint-disable-line no-unused-vars
        require('../../api/modules');

const DEFAULT_PATH = path.resolve(__dirname, '../..', 'assets/coursesData');

/**
 * Via path param you can specify which folder should be parsed.
 * E.g. node loadCourses.js --path=../englishCourses
 */

/**
 * @param {string} folderPath
 */
module.exports = async(function(folderPath) {
    let coursesPath = folderPath || DEFAULT_PATH,
        brandFiles = fs.readdirSync(path.resolve(coursesPath));

    console.log(`Parsing files: ${brandFiles.join(', ')}`);

    let courseParser = new CourseParser();

    brandFiles.map(brandFile => {
        let filePath = path.resolve(coursesPath, brandFile);

        await(courseParser.parse(filePath));
    });
});

if (!module.parent) {
    let args = minimist(process.argv.slice(2));
    module.exports(args.path);
}
