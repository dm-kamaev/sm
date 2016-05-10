'use strict';

var scoreView = {};

/**
 * View fo school landing
 * @param {Array.<number>} score
 * @return {Array.<{name: string, value: number}>|boolean}
 */
scoreView.school = function (score) {
    var sectionNames = [
        'Образование',
        'Преподаватели',
        'Атмосфера',
        'Инфраструктура'
    ],
    scoreSections = this.sections(sectionNames, score);

    return this.isNotEmpty(scoreSections) ? scoreSections : false;
};

/**
 * View for comments
 * @param {Array.<number>} score
 * @param {number} totalScore
 * @return {{
 *     data: {
 *         visibleMark: Object.<string, number|string>,
 *         hiddenMarks: Array.<Object.<string, number|string>>
 *     },
 *     config: {
 *         isActive: boolean
 *     }
 * }}
 */
scoreView.comment = function(score, totalScore) {
    var sectionNames = [
            'Оценка',
            'Образование',
            'Преподаватели',
            'Атмосфера',
            'Инфраструктура'
        ],
        sectionValues = [totalScore].concat(score),
        sections = this.sections(sectionNames, sectionValues);

    return this.minimized(sections);
};

/**
 * View for search results page
 * @param {Array.<number>} score
 * @param {number} totalScore
 * @param {number=} opt_sortCriterion
 * @return {{
 *     data: {
 *         visibleMark: Object.<string, number|string>,
 *         hiddenMarks: Array.<Object.<string, number|string>>
 *     },
 *     config: {
 *         isActive: boolean
 *     }
 * }}
 */
scoreView.results = function(score, totalScore, opt_sortCriterion) {
    var sortCriterion = opt_sortCriterion || 0,
        sectionNames = [
            'Средняя оценка',
            'Образование',
            'Преподаватели',
            'Атмосфера',
            'Инфраструктура'
        ],
        sectionValues = [totalScore].concat(score),
        sections = this.sections(sectionNames, sectionValues);
    return this.minimized(sections, sortCriterion);
};

/**
 * Transform array with score to array with names and values
 * @param {Array.<string>} sectionNames
 * @param {Array.<number>} sectionValues
 * @return {Array.<{
 *     name: string,
 *     value: number
 * }>}
 */
scoreView.sections = function(sectionNames, sectionValues) {
    return sectionNames.map((sectionName, index) => {
        return {
            name: sectionName,
            value: sectionValues[index] || 0
        }
    });
};

/**
 * Transform array with score to array with names and values for score,
 * which not empty
 * @param score
 * @return {Array.<{
 *     name: string,
 *     value: number
 * }>}
 */
scoreView.sectionsNotEmpty = function(score) {
    var scoreSections = this.sections(score);

    return scoreSections.filter(item => item.value);
};

/**
 * Return score object depends of visible mark
 * @param {Array.<{name: string, value: number}>} scoreSections
 * @param {number} opt_visibleMarkIndex - code of mark to make visible
 * 0 means total Score, 1 - 4 means corresponding mark in order
 * @return {{
 *     data: {
 *         visibleMark: Object.<string, number|string>,
 *         hiddenMarks: Array.<Object.<string, number|string>>
 *     },
 *     config: {
 *         isActive: boolean
 *     }
 * }}
 */
scoreView.minimized = function(scoreSections, opt_visibleMarkIndex) {
    var visibleMarkIndex = opt_visibleMarkIndex ? opt_visibleMarkIndex : 0;

    var visbleMark = scoreSections[visibleMarkIndex];
    var hiddenMarks = scoreSections.filter(item => {
        return item.name != visbleMark.name
    });

    return {
        data: {
            visibleMark: visbleMark,
            hiddenMarks: hiddenMarks
        },
        config: {
            isActive: !!scoreView.isNotEmpty(hiddenMarks, visbleMark)
        }
    };
};

/**
 * Check if all scores of item is 0,
 * and if provided check minimized criterion too
 * @param {Array.<{
 *     name: string,
 *     value: number
 * }>} score
 * @param {{
 *     name: string,
 *     value: number
 * }} opt_sortCriterion
 * @return {boolean}
 */
scoreView.isNotEmpty = function(score, opt_sortCriterion) {
    var sortCriterion = opt_sortCriterion || {};
    return sortCriterion.value || score.some(item => item.value);
};

module.exports = scoreView;
