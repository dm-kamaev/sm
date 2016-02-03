var metroView = {};

/**
 * @param {array<object>} metros - metro instances
 * @return {array<object>}
 */
metroView.list = function(metros) {
    return metros
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
