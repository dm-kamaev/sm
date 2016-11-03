'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    categoryModel = require('../../api/modules/course/models/courseCategory'),
    seoCourseListModel =
        require('../../api/modules/course/models/seoCourseList');

const seoData = require('../../assets/categorySeoData.json');

module.exports = async(function() {
    for (let categoryName in seoData) {
        let category = await(categoryModel.findOne({
                where: {
                    name: categoryName
                }
            })),
            data = seoData[categoryName];
        data.categoryId = category.id;

        await(seoCourseListModel.create(data));
    }
});

if (!module.parent) {
    module.exports();
}
