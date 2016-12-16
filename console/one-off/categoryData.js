'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    fs = require('fs'),
    path = require('path'),
    minimist = require('minimist');

const categoryModel = require('../../api/modules/course/models/courseCategory'),
    seoCourseListModel =
        require('../../api/modules/course/models/seoCourseList');

const DEFAULT_DATA_PATH = path.resolve('assets/categorySeoData.json');

/**
 * @param {string} filePath
 */
module.exports = async(function(filePath) {
    let dataPath = filePath ? path.resolve(filePath) : DEFAULT_DATA_PATH,
        seoData = JSON.parse(fs.readFileSync(dataPath));

    for (let categoryName in seoData) {
        let category = await(categoryModel.findOne({
                where: {
                    name: categoryName
                }
            })),
            data = seoData[categoryName];
        data.categoryId = category && category.id || null;

        await(seoCourseListModel.create(data));
    }
});

if (!module.parent) {
    let args = minimist(process.argv.slice(2));
    module.exports(args.path);
}
