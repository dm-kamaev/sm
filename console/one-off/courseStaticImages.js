'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    path = require('path'),
    fs = require('fs'),
    minimist = require('minimist');

const pageModel = require('../../api/modules/entity/models/page').Model,
    courseModel = require('../../api/modules/course/models/course');

const DEFAULT_IMAGES_FOLDER = path.resolve(
        __dirname,
        '../../',
        'app/blocks/n-course/cover-images'
    ),
    STATIC_LINK = '/static/images/n-course/cover-images',
    COURSE_TYPE = 'course',
    COURSE_ATTRIBUTES = ['entityId', 'alias'];

/**
 * @return {Promise<Array<Page>>}
 */
let getCourseAliases = async(function() {
    return pageModel.findAll({
        attributes: COURSE_ATTRIBUTES,
        where: {
            entityType: COURSE_TYPE
        },
        raw: true,
        logging: false
    });
});

/**
 * @param  {string} file
 * @return {string}
 */
let getFileName = function(file) {
    return path.parse(file).name;
};

/**
 * @param  {Array<Page>} courseAliases
 * @param  {string} imageName
 * @return {Page}
 */
let findCourseAlias = function(courseAliases, imageName) {
    return courseAliases.find(courseAlias =>
        decodeURI(courseAlias.alias).replace(/[^-\w]/g, '') === imageName
    );
};

/**
 * @param  {number} id
 * @param  {string} image
 * @return {Promise<Array<number, Page>>}
 */
let updateCourse = async(function(id, image) {
    return courseModel.update({
        imageUrl: path.join(STATIC_LINK, image)
    }, {
        where: {
            id: id
        }
    });
});

/**
 * @param {string} folderPath
 */
module.exports = async(function(folderPath) {
    let courseAliases = await(getCourseAliases()),
        imagesFolder = folderPath ?
            path.resolve(folderPath) :
            DEFAULT_IMAGES_FOLDER,
        images = fs.readdirSync(imagesFolder);

    await(images.map(image => {
        let imageName = getFileName(image),
            courseAlias = findCourseAlias(courseAliases, imageName);

        if (courseAlias) {
            return updateCourse(courseAlias.entityId, image);
        }
    }));
});

if (!module.parent) {
    let args = minimist(process.argv.slice(2));
    module.exports(args.path);
}
