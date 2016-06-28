'use strict';

const squel = require('squel');
const await = require('asyncawait/await');
const async = require('asyncawait/async');
const path = require('path');
const sequelize = require.main.require('../../../app/components/db');

const folder = path.join(__dirname, '../../api/modules/study/migrations');
const scores = require(
          path.join(folder, '20160418152600-update-ege-gia.json')
      );

module.exports = {
    up: async(function() {
        var subjects = getSubjects(),
            subject;

        deleteOldExams('ege_result');

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

        deleteOldExams('gia_result');

        var lastGiaScores = scores['gia'];
        for (subject in lastGiaScores) {
            insertGiaResults(
                subjects[subject],
                lastGiaScores[subject].score,
                lastGiaScores[subject].count
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
        .set('school_id', 396)
        .set('year', year)
        .set('result', score)
        .toString();

    await(sequelize.query(
        insertSubjects,
        { type: sequelize.QueryTypes.INSERT }
    ));
};

/**
 * @param {number} subjectId
 * @param {number} score
 * @param {number} count
 */
var insertGiaResults = function(subjectId, score, count) {
    var insertSubjects = squel.insert()
        .into('gia_result')
        .set('subject_id', subjectId)
        .set('school_id', 396)
        .set('result', score)
        .set('count', count)
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
var deleteOldExams = function(table) {
    var deleteSubjects = squel.delete()
        .from(table)
        .where('school_id = ' + 396)
        .toString();

    await(sequelize.query(
        deleteSubjects,
        { type: sequelize.QueryTypes.DELETE }
    ));
};

/**
 * Get id of subject with given name
 * @param {string} subjectName
 * @return {?number}
 */
var getSubjects = function(subjectName) {
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
