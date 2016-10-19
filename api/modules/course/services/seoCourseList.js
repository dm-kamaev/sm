'use strict';

const async = require('asyncawait/async');

const models = require('../../../../app/components/models').all;

let service = {
    name: 'seoCourseList'
};

/**
 * Create seo school list
 * @param {Object} params
 * @return {Promise<models.SeoCourseList>}
 */
service.create = async(function(params) {
    return models.SeoCourseList.create(params);
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

module.exports = service;
