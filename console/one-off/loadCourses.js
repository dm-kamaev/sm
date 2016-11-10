'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    path = require('path'),
    fs = require('fs');

const CourseParser = require('../modules/parse/CourseParser'),
    modules = // eslint-disable-line no-unused-vars
        require('../../api/modules');

const COURSES_PATH = path.resolve(__dirname, '../..', 'assets/coursesData');

module.exports = async(function() {
    let brandFiles = fs.readdirSync(COURSES_PATH),
        courseParser = new CourseParser();

    brandFiles.map(brandFile => {
        let filePath = path.resolve(COURSES_PATH, brandFile);

        await(courseParser.parse(filePath));
    });
});

if (!module.parent) {
    module.exports();
}
