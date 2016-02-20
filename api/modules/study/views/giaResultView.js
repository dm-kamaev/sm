const cityResultView = require.main.require(
    './api/modules/study/views/cityResultView.js'
);

/**
 * GiaResultView
 * @constructor
 */
var GiaResultView = function() {
};

/**
 * Sort list
 * @type {string[]}
 */
GiaResultView.SORT_LIST = [
    'математика',
    'русский',
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
 * Transforms results
 * @param {Array<Object>} results
 * @param {Array<Object>} cityResults
 * @return {{years: U[], results: U[], range: number}}
 */
GiaResultView.prototype.transformResults = function(results, cityResults) {
    var res = {},
        keys,
        range = 0.5,
        average,
        examRes,
        that = this;

    results.forEach(item => {
        /**TODO: add years*/
        item.year = item.year || '2015';

        res[item.year] = res[item.year] || {};
        examRes = item.result.toFixed(1);
        average = cityResultView.getResult(
            cityResults,
            item.subjectId,
            'gia'
        ).toFixed(1) || 3.5;

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
GiaResultView.prototype.sorter_ = function(a, b) {
    var length = GiaResultView.SORT_LIST.length,
        orderA = length,
        orderB = length;

    for (var i = 0, item; i < length; i++) {
        item = GiaResultView.SORT_LIST[i];

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
 * @type {GiaResultView}
 */
module.exports = new GiaResultView();
