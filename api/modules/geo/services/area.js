var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
exports.name = 'area';

/**
 * Creates an Area instance and returns it
 * @param {String} name
 * @return {Area}
 */
exports.create = async(params => {
    return await(models.Area.findOrCreate({
        where: {
            name: params.name
        }
    }));
});
