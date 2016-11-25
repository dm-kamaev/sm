'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    path = require('path'),
    fs = require('fs');

const pageModel = require('../../api/modules/entity/models/page'),
    courseModel = require('../../api/modules/course/models/course');

const IMAGES_FOLDER = path.resolve(
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

module.exports = async(function() {
    let courseAliases = await(getCourseAliases()),
        images = fs.readdirSync(IMAGES_FOLDER);

    await(images.map(image => {
        let imageName = getFileName(image),
            courseAlias = findCourseAlias(courseAliases, imageName);

        return updateCourse(courseAlias.entityId, image);
    }));
});

if (!module.parent) {
    module.exports();
}
