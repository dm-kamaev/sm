'use strict';

let scoreView = {};

/**
 * View for search results page
 * @param {Array.<number>} score
 * @param {number} totalScore
 * @param {number=} opt_sortCriterion
 * @return {{
 *     marks: {
 *         primary: Object.<string, number|string>,
 *         secondary: Array.<Object.<string, number|string>>
 *     },
 *     config: {
 *         isActive: boolean
 *     }
 * }}
 */
scoreView.results = function(score, totalScore, opt_sortCriterion) {
    let sortCriterion = opt_sortCriterion || 0,
        sectionNames = [
            'Средняя оценка',
            'Образование',
            'Преподаватели',
            'Атмосфера',
            'Инфраструктура'
        ],
        sectionValues = [totalScore].concat(score),
        sections = scoreView.sections(sectionNames, sectionValues);
    return scoreView.minimized(sections, sortCriterion);
};

/**
 * Transform array with score to array with names and values
 * @param {Array.<string>} sectionNames
 * @param {?Array.<number>} nullableSectionValues
 * @return {Array.<{
 *     name: string,
 *     value: number
 * }>}
 */
scoreView.sections = function(sectionNames, nullableSectionValues) {
    let sectionValues = nullableSectionValues || [];
    return sectionNames.map((sectionName, index) => {
        return {
            name: sectionName,
            value: sectionValues[index] || 0
        };
    });
};

/**
 * Return score object depends of visible mark
 * @param {Array.<{name: string, value: number}>} scoreSections
 * @param {number} opt_visibleMarkIndex - code of mark to make visible
 * 0 means total Score, 1 - 4 means corresponding mark in order
 * @return {{
 *     marks: {
 *         primary: Object.<string, number|string>,
 *         secondary: Array.<Object.<string, number|string>>
 *     },
 *     config: {
 *         isActive: boolean
 *     }
 * }}
 */
scoreView.minimized = function(scoreSections, opt_visibleMarkIndex) {
    let primaryMarkIndex = opt_visibleMarkIndex || 0;

    let primary = scoreSections[primaryMarkIndex];
    let secondary = scoreSections.filter(item => {
        return item.name != primary.name;
    });

    return {
        data: {
            marks: {
                primary: primary,
                secondary: secondary
            },
            secondaryMarkListHeader: 'Оценки, поставленные пользователями'
        },
        config: {
            isActive: !!scoreView.isNotEmpty(secondary, primary)
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
    let sortCriterion = opt_sortCriterion || {};
    return sortCriterion.value || score.some(item => item.value);
};

module.exports = scoreView;
