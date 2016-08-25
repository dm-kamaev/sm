const lodash = require('lodash');

var metroView = {};

/**
 * @param {array<object>} metros - metro instances
 * @return {array<object>}
 */
metroView.list = function(metros) {
    var uniqMetros = lodash.uniq(metros, 'id');

    return uniqMetros
        .map(metro => {
            if (metro.name) {
                return {
                    id: metro.id,
                    name: this.formatName(metro.name),
                    coords: metro.coords
                };
            }
        });
};

/**
 * @param {string} name
 * @return {string}
 */
metroView.formatName = function(name) {
    return name.replace('метро', '').trim();
};

module.exports = metroView;
