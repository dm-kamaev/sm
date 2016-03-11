const lodash = require('lodash');

var metroView = {};

/**
 * @param {array<object>} metros - metro instances
 * @return {array<object>}
 */
metroView.list = function(metros) {
    var uniqMetros = lodash.uniq(metros, 'id')

    return uniqMetros
        .map(metro => {
            if(metro.name) {
                return {
                    id: metro.id,
                    name: metro.name.replace('метро ', '')
                };
            }
        });
};

module.exports = metroView;
