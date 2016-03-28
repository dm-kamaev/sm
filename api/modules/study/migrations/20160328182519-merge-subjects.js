'use strict';

const squel = require('squel');
const await = require('asyncawait/await');
const async = require('asyncawait/async');
const sequelize = require.main.require('../../../app/components/db');


module.exports = {
    up: async(function() {
        /** computer science **/
        var computerScienceOld = getSubjectByName('информатика и икт'),
            computerScienceNew = getSubjectByName('информатика');

        updateResults('ege_result', {
            newId: computerScienceNew.id,
            oldId: computerScienceOld.id
        });
        deleteSubjects(computerScienceOld.id);

        /** math **/
        var mathOld = getSubjectByName('математика (профильная)'),
            mathNew = getSubjectByName('математика');
        updateResults('ege_result', {
            newId: mathNew.id,
            oldId: mathOld.id
        });
        deleteSubjects(mathOld.id);

        /** russian **/
        var russianOld = getSubjectByName('русский'),
            russianNew = getSubjectByName('русский язык');

        updateResults('gia_result', {
            newId: russianNew.id,
            oldId: russianOld.id
        });
        updateResults('olimp_result', {
            newId: russianNew.id,
            oldId: russianOld.id
        });
        deleteSubjects(russianOld.id);
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
    var updateSubjects = squel.update()
        .table(table)
        .set('subject_id', subjectIds.newId)
        .where('subject_id = ' + subjectIds.oldId)
        .toString();

    return await(sequelize.query(
        updateSubjects,
        {type: sequelize.QueryTypes.UPDATE}
    ));
};

/**
 * Delete unused subjects
 * @param {number} subjectId
 */
var deleteSubjects = function(subjectId) {
    var deleteSubjects = squel.delete()
        .from('subject')
        .where('id = ' + subjectId)
        .toString();

    return await(sequelize.query(
        deleteSubjects,
        {type: sequelize.QueryTypes.DELETE}
    ));
};

/**
 * Get id of subject with given name
 * @param {string} subjectName
 * @return {Object}
 */
var getSubjectByName = function(subjectName) {
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

    return subjects[0];
};