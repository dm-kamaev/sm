const lodash = require('lodash');

var areaView = {};

/**
 * @param {array<object>} areas - area instances
 * @return {array<object>}
 */
areaView.list = function(areas) {
    var uniqAreas = lodash.uniqBy(areas, 'id');

    return uniqAreas
        .map(area => {
            return {
                id: area.id,
                name: area.name
            };
        });
};


module.exports = areaView;
