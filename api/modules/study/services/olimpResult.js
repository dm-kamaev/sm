var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;

exports.name = 'olimpResult';

/**
 * Get one data from table by school id
 * @param {number} schoolId
 * @return {Object} instance of EgeResult model
 */
exports.getAllBySchoolId = async(function(schoolId) {
    return await(models.OlimpResult.findAll({
        where: {schoolId: schoolId},
        include: [
            {
                model: models.Subject,
                as: 'subject'
            }
        ],
        order: [['year', 'ASC']]
    }));
});
