'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

let service = {
    name: 'seoCourseList'
};

/**
 * Create seo school list
 * @param {number} categoryId
 * @param {{
 *     tabTitle: string,
 *     metaDescription: string,
 *     openGraphTitle: string,
 *     openGraphDescription: string,
 *     listTitle: string,
 *     searchDescription: string,
 *     seoText1: string,
 *     seoText2: string
 * }} data
 * @return {Promise<models.SeoCourseList>}
 */
service.create = async(function(categoryId, data) {
    let seoText = service.pickSeoText(data);

    return models.SeoCourseList.create({
        categoryId: categoryId,
        tabTitle: data.tabTitle,
        metaDescription: data.metaDescription,
        opengraphTitle: data.opengraphTitle,
        opengraphDescription: data.opengraphDescription,
        listTitle: data.listTitle,
        text: seoText
    });
});

/**
 * @param {number} categoryId
 * @param {{
 *     tabTitle: string,
 *     metaDescription: string,
 *     openGraphTitle: string,
 *     openGraphDescription: string,
 *     listTitle: string,
 *     searchDescription: string,
 *     seoText1: string,
 *     seoText2: string
 * }} data
 * @return {Promise<models.SeoCourseList>}
 */
service.update = async(function(categoryId, data) {
    let seoText = service.pickSeoText(data);

    return models.SeoCourseList.update({
        categoryId: categoryId,
        tabTitle: data.tabTitle,
        metaDescription: data.metaDescription,
        opengraphTitle: data.opengraphTitle,
        opengraphDescription: data.opengraphDescription,
        listTitle: data.listTitle,
        text: seoText
    }, {
        where: {
            categoryId: categoryId
        }
    });
});

/**
 * @param {number} categoryId
 * @param {{
 *     tabTitle: string,
 *     metaDescription: string,
 *     openGraphTitle: string,
 *     openGraphDescription: string,
 *     listTitle: string,
 *     searchDescription: string,
 *     seoText1: string,
 *     seoText2: string
 * }} params
 * @return {Promise<models.SeoCourseList>}
 */
service.createUpdate = async(function(categoryId, data) {
    let instance = await(service.getByCategoryId(categoryId)),
        result;

    if (instance) {
        result = service.update(categoryId, data);
    } else {
        result = service.create(categoryId, data);
    }

    return result;
});


/**
 * Get page params by category id
 * @param {number} categoryId
 * @return {Promise<models.SeoCourseList>}
 */
service.getByCategoryId = async(function(categoryId) {
    return models.SeoCourseList.findOne({
        where: {
            categoryId: categoryId
        }
    });
});

/**
 * @param {{
 *     searchDescription: string,
 *     seoText1: string,
 *     seoText2: string
 * }} data
 * @return {Array<string>}
 */
service.pickSeoText = function(data) {
    return [
        data.searchDescription,
        data.seoText1,
        data.seoText2
    ];
};

module.exports = service;
