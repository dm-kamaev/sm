var areaView = {};

/**
 * @param {array<object>} areas - area instances
 * @return {array<object>}
 */
areaView.list = function(areas) {
    return areas
        .map(area => {
            return {
                id: area.id,
                name: area.name,
            };
        });
};

module.exports = areaView;
