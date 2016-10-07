'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

let service = {
    name: 'courseApplication'
};

/**
 * @param  {{
 *     username: string,
 *     phone: ?string,
 *     comment: string,
 *     alias: string,
 *     option: string
 * }} data
 * @return {CourseEnrollment}
 */
service.create = async(function(data) {
    return await(models.CourseApplication.create(data));
});

module.exports = service;
