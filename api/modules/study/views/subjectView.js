'use strict';

const lodash = require('lodash');

const EGE_SORT_LIST = require('./constants/egeSubjectsOrder.json'),
    GIA_SORT_LIST = require('./constants/giaSubjectsOrder.json');

let subjectView = {};

/**
 * Sorter
 * @param {Object} a
 * @param {Object} b
 * @param {string} type
 * @return {number}
 */
subjectView.sorter = function(a, b, type) {
    let sortList = subjectView.getSortList(type),
        length = sortList.length,
        varA = length,
        varB = length;

    for (let i = 0, item; i < length; i++) {
        item = sortList[i];

        if (a.toLowerCase() == item) {
            varA = i;
        }

        if (b.toLowerCase() == item) {
            varB = i;
        }

        if (varA < length && varB < length) {
            break;
        }
    }

    return varA - varB;
};

/**
 * Return subject order depends of given type
 * @param {('EGE'|'GIA')} type
 * @return {Array<string>}
 */
subjectView.getSortList = function(type) {
    let result;

    switch (type) {
    case 'EGE':
        result = EGE_SORT_LIST;
        break;
    case 'GIA':
        result = GIA_SORT_LIST;
        break;
    }

    return result;
};


/**
 * Sort given subjects by given order
 * @param {Array<models.Subject>} subjects
 * @param {Array<string>} order array of names of subjects
 * @return {Array<models.Subject>}
 */
subjectView.sortByOrder = function(subjects, order) {
    let remaininSubjects = subjects.slice();

    let result = order.map(subjectName => {
        let sanitizedSubjectName = subjectName.toLowerCase();
        let subjectIndex = remaininSubjects.findIndex(subject => {
            return subject.name.toLowerCase() == sanitizedSubjectName;
        });

        let subject = remaininSubjects[subjectIndex];
        remaininSubjects.slice(subjectIndex, 1);

        return subject;
    });

    if (remaininSubjects.length) {
        result.concat(result, remaininSubjects);
    }

    return result.filter(subject => subject);
};


/**
 * Transform array of subject id to array of subjects
 * @param {Array<{
 *     subjectId: number
 * }>} results
 * @param {Array<models.Subject>} subjects
 * @return {Array<models.Subject>}
 */
subjectView.getSubjects = function(results, subjects) {
    return subjects.filter(subject => {
        return results.find(result => subject.id == result.subjectId);
    });
};


/**
 * Transform array of subjects to array of their id
 * @param {Array.<Object>} subjects
 * @return {Array.<number>}
 */
subjectView.subjectIds = function(subjects) {
    return subjects.map(subject => {
        return subject.id;
    });
};


/**
 * Generate filter of given type from subjects and their id's
 * @param {Array<(
 *     models.egeResult|
 *     models.giaResult|
 *     models.olimpResult
 * )>} results
 * @param {Array<models.Subject>} subjects
 * @param {string} filterType
 * @return {{
 *    filterType: string,
 *    values: Array<{
 *       label: string,
 *       value: string,
 *       id: number
 *    }>
 * }}
 */
subjectView.searchFilter = function(results, subjects, filterType) {
    let filter = results.map(result => {
        let subjectId = result.subjectId,
            subject = lodash.find(subjects, 'id', subjectId);

        return {
            label: subject.displayName,
            value: subject.alias,
            id: subject.id
        };
    });
    return {
        filterType: filterType,
        values: filter
    };
};

module.exports = subjectView;
