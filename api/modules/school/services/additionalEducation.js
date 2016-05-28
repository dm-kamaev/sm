'use strict'

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;

var service = {
    name: 'additionalEducation'
};

/**
 * @param {{
 *     schoolId: number,
 *     category: string,
 *     sphere: string,
 *     name: ?string,
 *     description: ?string,
 *     phone: ?string,
 *     contact: ?string,
 *     requirements: ?string,
 *     rawData: ?string
 * }} params
 * @return {Promise<Object>}
 */
service.create = async(function(params) {
    return models.AdditionalEducation.create(params);
});

/**
 * @param {number} schoolId
 * @return {Promise<Array<Oobject>>}
 */
service.findBySchoolId = async(function(schoolId) {
    return models.AdditionalEducation.findAll({
        where: {
            schoolId: schoolId
        },
        attributes: [
            'category',
            'sphere'
        ]
    });
});

/**
 * Delete all additional educations
 */
service.deleteAll = async(function() {
    models.AdditionalEducation.destroy({
        where: {}
    });
});

module.exports = service;
