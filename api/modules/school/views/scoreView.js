'use strict';

var scoreView = {};

/**
 * Transform array with score to array with names and values
 * @param {Array.number} opt_score
 * @return {Array.<{
 *     name: string,
 *     value: number
 * }>}
 */
scoreView.sections = function(opt_score) {
    var score = opt_score || [0, 0, 0, 0],
        sections = [
            'Образование',
            'Преподаватели',
            'Атмосфера',
            'Инфраструктура'
        ];

    return score.map((scoreItem, index) => {
        return {
            name: sections[index],
            value: scoreItem
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
 * @param {Array.<number>} score
 * @param {number} totalScore
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
scoreView.minimized = function(score, totalScore, opt_visibleMarkIndex) {
    var scoreItems = this.sections(score),
        visibleMarkIndex = opt_visibleMarkIndex ? opt_visibleMarkIndex : 0;

    scoreItems.unshift({
        name: 'Средняя оценка',
        value: totalScore
    });

    var visbleMark = scoreItems[visibleMarkIndex];
    var hiddenMarks = scoreItems.filter(item => {
        return item.name != visbleMark.name
    });

    return {
        data: {
            visibleMark: visbleMark,
            hiddenMarks: hiddenMarks
        },
        config: {
            isActive: scoreView.notEmpty(hiddenMarks, visbleMark)
        }
    };
};

/**
 * Check if all scores of item is 0, and if provided check minimized criterion too
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
scoreView.notEmpty = function(score, opt_sortCriterion) {
    var sortCriterion = opt_sortCriterion || {};
    return sortCriterion.value || score.some(item => item.value);
};

module.exports = scoreView;
