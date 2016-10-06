'use strict';

var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

var service = {
    name: 'courseBrand'
};

/**
 * @param {{
 *     name: string,
 *     description: ?string
 * }} data
 * @return {CourseBrand}
 */
service.create = async(function(data) {
    let courseBrand = await(
        models.CourseBrand.findOrCreate({
            where: {
                name: data.name
            }
        })
    )[0]; // findOrCreate returns array where zero element is instance
    return await(courseBrand.update({
        description: data.description
    }));
});

module.exports = service;
