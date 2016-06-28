'use strict';

const squel = require('squel');
const await = require('asyncawait/await');
const async = require('asyncawait/async');
const path = require('path');
const sequelize = require.main.require('../../../app/components/db');

const folder = path.join(__dirname, '../../api/modules/study/migrations');
const scores = require(
          path.join(folder, '20160531131100-update-ege.json')
      );

module.exports = {
    up: async(function() {
        var subjects = getSubjects(),
            subject;

        deleteOldExams();

        var previousEgeScores = scores['ege']['2014'];
        for (subject in previousEgeScores) {
            insertEgeResults(
                subjects[subject],
                previousEgeScores[subject],
                2014
            );
        }

        var lastEgeScores = scores['ege']['2015'];
        for (subject in lastEgeScores) {
            insertEgeResults(
                subjects[subject],
                lastEgeScores[subject],
                2015
            );
        }
    }),
    down: async(function() {
        return null;
    })
};

/**
 * @param {number} subjectId
 * @param {number} score
 * @param {number} year
 */
var insertEgeResults = function(subjectId, score, year) {
    var insertSubjects = squel.insert()
        .into('ege_result')
        .set('subject_id', subjectId)
        .set('school_id', 345)
        .set('year', year)
        .set('result', score)
        .toString();

    await(sequelize.query(
        insertSubjects,
        { type: sequelize.QueryTypes.INSERT }
    ));
};

/**
 * Delete the school's ege
 * @param {string} table
 */
var deleteOldExams = function() {
    var deleteSubjects = squel.delete()
        .from('ege_result')
        .where('school_id = ' + 345)
        .toString();

    await(sequelize.query(
        deleteSubjects,
        { type: sequelize.QueryTypes.DELETE }
    ));
};

/**
 * Get id of subject with given name
 * @return {Object}
 */
var getSubjects = function() {
    var getSubjects = squel.select()
        .from('subject')
        .field('id')
        .field('name')
        .toString();

    var subjects = await(sequelize.query(
        getSubjects,
        { type: sequelize.QueryTypes.SELECT }
    ));

    var result = {};

    subjects.forEach(subject => {
        result[subject.name] = subject.id;
    });

    return result;
};
