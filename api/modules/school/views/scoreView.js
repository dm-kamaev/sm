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
 * Return score object depends of sort criterion
 * @param {Array.<number>} score
 * @param {number} totalScore
 * @param {number} opt_criterion - criterion of sort
 * @return {{
 *     currentCriterion: Object.<string, number|string>,
 *     score: Array.<Object.<string, number|string>>
 * }}
 */
scoreView.sort = function(score, totalScore, opt_criterion) {
    var scoreItems = this.sections(score),
        sortCriterionIndex = opt_criterion ? opt_criterion : 0;

    scoreItems.unshift({
        name: 'Средняя оценка',
        value: totalScore
    });

    var scoreCriterion = scoreItems[sortCriterionIndex];
    return {
        currentCriterion: scoreCriterion,
        score: scoreItems.filter(item => {
            return item.name != scoreCriterion.name
        })
    };
};

/**
 * Check if all scores of item is 0, and if provided check sort criterion too
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
scoreView.notEmpty =function(score, opt_sortCriterion) {
    var sortCriterion = opt_sortCriterion || {};
    return sortCriterion.value || score.some(item => item.value);
};

module.exports = scoreView;
