const lodash = require('lodash');

/**
 * Olympiad results view
 * @constructor
 */
var OlimpResultView = function() {
};

/**
 * Results transformation
 * @param results
 * @return {{years: U[], results: U[]}}
 */
OlimpResultView.prototype.transformResults = function(results) {
    var res = {},
        keys,
        schoolClass,
        year,
        subject,
        that = this;

    results.forEach(item => {
        year = item.year;
        subject = item.subject.displayName;
        schoolClass = item.class;

        res[year] = res[year] || {};
        res[year][subject] = res[year][subject] || {};

        if (schoolClass > 8) {
            res[year][subject].bottom = res[year][subject].bottom || {};

            if (item.status == 'призер') {
                res[year][subject].bottom.awardees =
                    res[year][subject].bottom.awardees ?
                        res[year][subject].bottom.awardees + 1 : 1;
            } else if (item.status == 'победитель') {
                res[year][subject].bottom.winners =
                    res[year][subject].bottom.winners ?
                        res[year][subject].bottom.winners + 1 : 1;
            }
        } else if (schoolClass > 4) {
            res[year][subject].middle = res[year][subject].middle || {};

            if (item.status == 'призер') {
                res[year][subject].middle.awardees =
                    res[year][subject].middle.awardees ?
                        res[year][subject].middle.awardees + 1 : 1;
            } else if (item.status == 'победитель') {
                res[year][subject].middle.winners =
                    res[year][subject].middle.winners ?
                        res[year][subject].middle.winners + 1 : 1;
            }
        } else {
            res[year][subject].top = res[year][subject].top || {};

            if (item.status == 'призер') {
                res[year][subject].top.awardees =
                    res[year][subject].top.awardees ?
                        res[year][subject].top.awardees + 1 : 1;
            } else if (item.status == 'победитель') {
                res[year][subject].top.winners =
                    res[year][subject].top.winners ?
                        res[year][subject].top.winners + 1 : 1;
            }
        }
    });

    keys = Object.keys(res);

    return {
        years: keys.map(key => {
            return {
                label: key,
                text: key
            }
        }),
        results: keys.map(key => {
            var subjects = Object.keys(res[key]),
                item,
                top = [],
                middle = [],
                bottom = [];

            subjects.forEach(subject => {
                item = res[key][subject];

                if(item.top) {
                    top.push({
                        name: subject,
                        awardees: item.top.awardees,
                        winners: item.top.winners
                    });
                }

                if(item.middle) {
                    middle.push({
                        name: subject,
                        awardees: item.middle.awardees,
                        winners: item.middle.winners
                    });
                }

                if(item.bottom) {
                    bottom.push({
                        name: subject,
                        awardees: item.bottom ?
                            item.bottom.awardees : undefined,
                        winners: item.bottom ?
                            item.bottom.winners : undefined
                    });
                }
            });

            return {
                top: top.length > 0 ?
                    top.sort((a, b) => that.sorter_(a, b)) : undefined,
                middle: middle.length > 0 ?
                    middle.sort((a, b) => that.sorter_(a, b)) : undefined,
                bottom: bottom.length > 0 ?
                    bottom.sort((a, b) => that.sorter_(a, b)) : undefined
            }
        })
    };
};

/**
 * Sorter
 * @param {Object} a
 * @param {Object} b
 * @return {number}
 * @private
 */
OlimpResultView.prototype.sorter_ = function(a, b) {
    return (b.winners || 0) - (a.winners || 0) ||
        (b.awardees || 0) - (a.awardees || 0);
};

/**
 * Exports
 * @type {OlimpResultView}
 */
module.exports = new OlimpResultView();
