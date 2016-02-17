const cityResultView = require.main.require(
    './api/modules/study/views/cityResultView.js'
);


var EgeResultView = function() {
};

EgeResultView.prototype.transformResults = function(results, cityResults) {
    var res = {},
        keys,
        range = 5,
        average,
        examRes;

    results.forEach(item => {
        res[item.year] = res[item.year] || {};
        examRes = item.result;
        average = cityResultView.getResult(
            cityResults,
            item.subjectId,
            'ege',
            item.year
        ) || 50;

        if (examRes > average + range) {
            res[item.year].top = res[item.year].top || [];
            res[item.year].top.push({
                name: item.subject.name,
                value: item.result,
                averageValue: average
            })
        } else if (examRes > average - range) {
            res[item.year].middle = res[item.year].middle || [];
            res[item.year].middle.push({
                name: item.subject.name,
                value: item.result,
                averageValue: average
            })
        } else {
            res[item.year].bottom = res[item.year].bottom || [];
            res[item.year].bottom.push({
                name: item.subject.name,
                value: item.result,
                averageValue: average
            })
        }
    });

    keys = Object.keys(res);

    return {
        years: keys.map(key => {
            return {
                label: key
            }
        }),
        results: keys.map(key => res[key]),
        range: range
    };
};

module.exports = new EgeResultView();
