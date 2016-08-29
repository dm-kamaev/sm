var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

var service = {
    name: 'courseBrand'
};

/**
 * @param {{
 *     name: string
 * }} data
 * @return {CourseBrand}
 */
service.create = async(function(data) {
    return await(
        models.CourseBrand.findOrCreate({
            where: {
                name: data.name
            }
        })
    )[0]; // findOrCreate returns array where zero element is instance
});

module.exports = service;
