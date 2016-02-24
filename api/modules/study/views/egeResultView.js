const cityResultView = require.main.require(
    './api/modules/study/views/cityResultView.js'
);

/**
 * EgeResultView
 * @constructor
 */
var EgeResultView = function() {
};

/**
 * Sort list
 * @type {string[]}
 */
EgeResultView.SORT_LIST = [
    'математика (профильная)',
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
 * Results transformation
 * @param {Array<Object>} results
 * @param {Array<Object>} cityResults
 * @return {{years: U[], results: U[], range: number}}
 */
EgeResultView.prototype.transformResults = function(results, cityResults) {
    var res = {},
        keys,
        range = 5,
        averageResult,
        average,
        examRes,
        that = this;

    results.forEach(item => {
        res[item.year] = res[item.year] || {};
        examRes = item.result.toFixed(2);
        averageResult = cityResultView.getResult(
            cityResults,
            item.subjectId,
            'ege',
            item.year
        );
        average = averageResult ? averageResult.toFixed(2) : 50;

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
                    item.top.sort((a, b) => that.sorter_(a,b)) : undefined,
                middle: item.middle ?
                    item.middle.sort((a, b) => that.sorter_(a,b)) : undefined,
                bottom: item.bottom ?
                    item.bottom.sort((a, b) => that.sorter_(a,b)) : undefined
            }
        }),
        range: range
    };
};

/**
 * Sorter
 * @param {Object} a
 * @param {Object} b
 * @return {number}
 * @private
 */
EgeResultView.prototype.sorter_ = function(a, b) {
    var length = EgeResultView.SORT_LIST.length,
        orderA = length,
        orderB = length;

    for (var i = 0, item; i < length; i++) {
        item = EgeResultView.SORT_LIST[i];

        if (a.order == item) {
            orderA = i;
        }

        if (b.order == item) {
            orderB = i;
        }

        if (orderA < length && orderB < length) {
            break;
        }
    }

    return orderA - orderB;
};

/**
 * Exports
 * @type {EgeResultView}
 */
module.exports = new EgeResultView();
