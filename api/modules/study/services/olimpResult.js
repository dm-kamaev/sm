var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;

const Sequelize= require('sequelize');

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


/**
 * Return all results of olympiads with unique subject id's
 * @return {Array<models.OlimpResult>}
 */
exports.getUniqueSubjects = async(function() {
    return await(models.OlimpResult.findAll(
        {
            attributes: [
                [Sequelize.literal('DISTINCT "subject_id"'), 'subjectId']
            ],
            order: [['subjectId', 'ASC']]
        }
    ));
});
