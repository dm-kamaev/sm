'use strict';

const cityResultView = require('./cityResultView'),
    subjectView = require('./subjectView');

const egeSortOrder = require('../views/constants/egeSubjectsOrder.json');

/**
 * egeResultView
 * @constructor
 */
var egeResultView = {
};

/**
 * Results transformation
 * @param {Array<Object>} results
 * @param {Array<Object>} cityResults
 * @return {{years: U[], results: U[], range: number}}
 */
egeResultView.transformResults = function(results, cityResults) {
    var res = {},
        keys,
        range = 5,
        averageResult,
        average,
        examRes;

    results.forEach(item => {
        res[item.year] = res[item.year] || {};
        examRes = Math.round(item.result);
        averageResult = cityResultView.getResult(
            cityResults,
            item.subjectId,
            'ege',
            item.year
        );
        average = averageResult ? Math.round(averageResult) : 50;

        if (examRes > average + range) {
            res[item.year].top = res[item.year].top || [];
            res[item.year].top.push({
                name: item.subject.displayName,
                value: examRes,
                averageValue: average,
                order: item.subject.name
            });
        } else if (examRes > average - range) {
            res[item.year].middle = res[item.year].middle || [];
            res[item.year].middle.push({
                name: item.subject.displayName,
                value: examRes,
                averageValue: average,
                order: item.subject.name
            });
        } else {
            res[item.year].bottom = res[item.year].bottom || [];
            res[item.year].bottom.push({
                name: item.subject.displayName,
                value: examRes,
                averageValue: average,
                order: item.subject.name
            });
        }
    });

    keys = Object.keys(res);

    return {
        years: keys.map(key => {
            return {
                label: key,
                text: key
            };
        }),
        results: keys.map(key => {
            var item = res[key];
            return {
                top: item.top ?
                    item.top.sort((a, b) => subjectView.sorter(
                        a.order,
                        b.order,
                        'EGE'
                    )) : undefined,
                middle: item.middle ?
                    item.middle.sort((a, b) => subjectView.sorter(
                        a.order,
                        b.order,
                        'EGE'
                    )) : undefined,
                bottom: item.bottom ?
                    item.bottom.sort((a, b) => subjectView.sorter(
                        a.order,
                        b.order,
                        'EGE'
                    )) : undefined
            };
        }),
        range: range
    };
};

/**
 * Transform raw filterData to filterData for filter panel
 * @param {{
 *     egeSubjects: Array<number>,
 *     subjects: Array<models.Subject>
 * }} filtersData
 * @return {Array<models.Subject>}
 */
egeResultView.getFilterData = function(filtersData) {
    let subjects = subjectView.getSubjects(
        filtersData.egeSubjects, filtersData.subjects
    );

    return subjectView.sortByOrder(subjects, egeSortOrder);
};

module.exports = egeResultView;
