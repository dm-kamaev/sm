var async = require('asyncawait/async'),
    await = require('asyncawait/await');

var models = require('../../../../app/components/models').all;

var service = {
    name: 'courseType'
};

/**
 * @param {string} name
 * @return {CourseType}
 */
service.create = async(function(name) {
    return await(models.CourseType.findOrCreate({
        where: {
            name: name
        }
    }))[0];
});

module.exports = service;
