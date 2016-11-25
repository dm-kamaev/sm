'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

let service = {
    name: 'courseAnalytics'
};

/**
 * @param {{
 *     courseId: number,
 *     ctr: number,
 *     clicks: number,
 *     views: number
 * }} data
 * @return {models.CourseAnalytics}
 */
service.create = async(function(data) {
    return await(models.CourseAnalytics.create(data));
});

module.exports = service;
