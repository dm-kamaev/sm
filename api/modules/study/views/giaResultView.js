'use strict';

const cityResultView = require('./cityResultView'),
    subjectView = require('./subjectView');

const giaSortOrder = require('../views/constants/giaSubjectsOrder.json');

/**
 * giaResultView
 * @constructor
 */
var giaResultView = {};

/**
 * Transforms results
 * @param {Array<Object>} results
 * @param {Array<Object>} cityResults
 * @return {{years: U[], results: U[], range: number}}
 */
giaResultView.transformResults = function(results, cityResults) {
    var res = {},
        keys,
        range = 0.5,
        averageResult,
        average,
        examRes;

    results.forEach(item => {
        /** TODO: add years*/
        item.year = item.year || '2015';

        res[item.year] = res[item.year] || {};
        examRes = Math.round(item.result * 10) / 10;
        averageResult = cityResultView.getResult(
            cityResults,
            item.subjectId,
            'gia'
        );
        average = averageResult ? Math.round(averageResult * 10) / 10 : 3.5;

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
                        'GIA'
                    )) : undefined,
                middle: item.middle ?
                    item.middle.sort((a, b) => subjectView.sorter(
                        a.order,
                        b.order,
                        'GIA'
                    )) : undefined,
                bottom: item.bottom ?
                    item.bottom.sort((a, b) => subjectView.sorter(
                        a.order,
                        b.order,
                        'GIA'
                    )) : undefined
            };
        }),
        range: range
    };
};

/**
 * Transform raw filterData to filterdata for filter panel
 * @param {{
 *     giaSubjects: Array<number>,
 *     subjects: Array<models.Subject>
 * }} filtersData
 * @return {Array<models.Subject>}
 */
giaResultView.getFilterData = function(filtersData) {
    let subjects = subjectView.getSubjects(
        filtersData.giaSubjects, filtersData.subjects
    );

    return subjectView.sortByOrder(subjects, giaSortOrder);
};

module.exports = giaResultView;
