'use strict';

const squel = require('squel');
const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require.main.require('../../../app/components/db');
const SqlHelper = require('../../console/modules/sqlHelper/SqlHelper.js');

module.exports = {
    up: async(function() {
        SqlHelper.resetTable('search_data');

        /** computer science **/
        var computerScienceOldId = getSubjectIdByName('информатика и икт'),
            computerScienceNewId = getSubjectIdByName('информатика');

        updateResults('ege_result', {
            newId: computerScienceNewId,
            oldId: computerScienceOldId
        });
        deleteSubjects(computerScienceOldId);

        /** math **/
        var mathOldId = getSubjectIdByName('математика (профильная)'),
            mathNewId = getSubjectIdByName('математика');
        updateResults('ege_result', {
            newId: mathNewId,
            oldId: mathOldId
        });
        deleteSubjects(mathOldId);

        /** russian **/
        var russianOldId = getSubjectIdByName('русский'),
            russianNewId = getSubjectIdByName('русский язык');

        updateResults('gia_result', {
            newId: russianNewId,
            oldId: russianOldId
        });
        updateResults('olimp_result', {
            newId: russianNewId,
            oldId: russianOldId
        });
        deleteSubjects(russianOldId);
    }),
    down: async(function() {
        return null;
    })
};

/**
 * Change subject id references from given results page
 * @param {{
 *      oldId: number,
 *      newId: number
 * }} subjectIds
 * @param table
 * @return {Object}
 */
var updateResults = function(table, subjectIds) {
    if (subjectIds.oldId) {
        var updateSubjects = squel.update()
            .table(table)
            .set('subject_id', subjectIds.newId)
            .where('subject_id = ' + subjectIds.oldId)
            .toString();

        return await(sequelize.query(
            updateSubjects,
            {type: sequelize.QueryTypes.UPDATE}
        ));
    }
};

/**
 * Delete unused subjects
 * @param {number} subjectId
 */
var deleteSubjects = function(subjectId) {
    if (subjectId) {
        var deleteSubjects = squel.delete()
            .from('subject')
            .where('id = ' + subjectId)
            .toString();

        return await(sequelize.query(
            deleteSubjects,
            {type: sequelize.QueryTypes.DELETE}
        ));
    }
};

/**
 * Get id of subject with given name
 * @param {string} subjectName
 * @return {?number}
 */
var getSubjectIdByName = function(subjectName) {
    var getSubjects = squel.select()
        .from('subject')
        .field('id')
        .where('name = \'' + subjectName + '\'')
        .limit(1)
        .toString();

    var subjects = await(sequelize.query(
        getSubjects,
        {type: sequelize.QueryTypes.SELECT}
    ));

    var subject = subjects[0];
    return subject ? subject.id : null;
};
