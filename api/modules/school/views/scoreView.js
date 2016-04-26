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
 * Return score array depends of sort criterion:
 * result array contains score without
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
        sortCriterionIndex = opt_criterion ? opt_criterion : 0,
        scoreCriterion = scoreItems[sortCriterionIndex];

    return {
        currentCriterion: scoreCriterion,
        score: scoreItems.slice(sortCriterionIndex, sortCriterionIndex + 1)
    };
};


scoreView.

module.exports = scoreView;
