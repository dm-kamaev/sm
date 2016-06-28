'use strict';

var async = require('asyncawait/async');
var models = require('../../../../app/components/models').all;

var service = {
    name: 'activity'
};

/**
 * @param {number} schoolId
 * @return {Promise.array<object>}
 */
service.getActivities = async(function(schoolId) {
    return models.Activity.findAll({
        where: {
            schoolId: schoolId
        },
        attributes: [
            'profile',
            'type'
        ]
    });
});

module.exports = service;
