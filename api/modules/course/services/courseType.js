var async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    squel = require('squel');

var sequelize = require('../../../../app/components/db'),
    models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all;

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
