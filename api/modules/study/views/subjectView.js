const lodash = require('lodash');

/**
 * SubjectView
 * @constructor
 */
var SubjectView = function() {
};

/**
 * Sort list for gia
 * @type {string[]}
 */
SubjectView.GIA_SORT_LIST = [
    'математика',
    'русский язык',
    'обществознание',
    'английский',
    'информатика',
    'физика',
    'биология',
    'химия',
    'география',
    'литература',
    'история',
    'французский',
    'немецкий',
    'испанский'
];

/**
 * Sort list for ege
 * @type {string[]}
 */
SubjectView.EGE_SORT_LIST = [
    'математика',
    'русский язык',
    'обществознание',
    'физика',
    'история',
    'биология',
    'математика (базовая)',
    'химия',
    'английский',
    'информатика',
    'информатика и икт',
    'география',
    'литература',
    'французский',
    'немецкий',
    'испанский'
];

/**
 * Sorter
 * @param {Object} a
 * @param {Object} b
 * @param {string} type
 * @return {number}
 */
SubjectView.prototype.sorter = function(a, b, type) {
    var length = SubjectView[type + '_SORT_LIST'].length,
        varA = length,
        varB = length;

    for (var i = 0, item; i < length; i++) {
        item = SubjectView[type + '_SORT_LIST'][i];

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
 * Transform array of subjects to array of their id
 * @param {Array.<Object>} subjects
 * @return {Array.<number>}
 */
SubjectView.prototype.subjectIds = function(subjects) {
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
SubjectView.prototype.searchFilter =
    function(results, subjects, filterType) {
        var filter = results.map(result => {
            var subjectId = result.subjectId,
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

/**
 * Exports
 * @type {SubjectView}
 */
module.exports = new SubjectView();
