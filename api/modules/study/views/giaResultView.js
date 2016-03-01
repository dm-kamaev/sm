const cityResultView = require.main.require(
    './api/modules/study/views/cityResultView.js'
);

const subjectView = require.main.require(
    './api/modules/study/views/subjectView.js'
);

/**
 * GiaResultView
 * @constructor
 */
var GiaResultView = function() {
};

/**
 * Transforms results
 * @param {Array<Object>} results
 * @param {Array<Object>} cityResults
 * @return {{years: U[], results: U[], range: number}}
 */
GiaResultView.prototype.transformResults = function(results, cityResults) {
    var res = {},
        keys,
        range = 0.5,
        averageResult,
        average,
        examRes,
        that = this;

    results.forEach(item => {
        /**TODO: add years*/
        item.year = item.year || '2015';

        res[item.year] = res[item.year] || {};
        examRes = Math.round(item.result * 10) / 10;
        averageResult =  cityResultView.getResult(
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
            })
        } else if (examRes > average - range) {
            res[item.year].middle = res[item.year].middle || [];
            res[item.year].middle.push({
                name: item.subject.displayName,
                value: examRes,
                averageValue: average,
                order: item.subject.name
            })
        } else {
            res[item.year].bottom = res[item.year].bottom || [];
            res[item.year].bottom.push({
                name: item.subject.displayName,
                value: examRes,
                averageValue: average,
                order: item.subject.name
            })
        }
    });

    keys = Object.keys(res);

    return {
        years: keys.map(key => {
            return {
                label: key,
                openerText: key
            }
        }),
        results: keys.map(key => {
            var item = res[key];
            return {
                top: item.top ?
                    item.top.sort((a, b) => subjectView.sorter(a.order, b.order, 'GIA')) : undefined,
                middle: item.middle ?
                    item.middle.sort((a, b) => subjectView.sorter(a.order, b.order, 'GIA')) : undefined,
                bottom: item.bottom ?
                    item.bottom.sort((a, b) => subjectView.sorter(a.order, b.order, 'GIA')) : undefined
            }
        }),
        range: range
    };
};

/**
 * Exports
 * @type {GiaResultView}
 */
module.exports = new GiaResultView();
