/**
 * CityResultView
 * @constructor
 */
var CityResultView = function() {
};

/**
 * Getter for one result
 * @param {Array<Object>} result
 * @param {number} subjectId
 * @param {string} type
 * @param {(string|number)=} opt_year
 * @return {*}
 */
CityResultView.prototype.getResult =
    function(result, subjectId, type, opt_year) {
        if (result) {
            for (var i = 0, item, condition; i < result.length; i++) {
                item = result[i];
                condition = item.subjectId == subjectId &&
                item.type == type &&
                (!opt_year || item.year == opt_year);

                if (condition) {
                    return item.result;
                }
            }
        }
    };

/**
 * Exports
 * @type {CityResultView}
 */
module.exports = new CityResultView();
