var lodash = require('lodash');
var activityView = {};

/**
 * @param {object} activities
 * @return {object}
 */
activityView.list = function(activities) {
    activities = lodash.sortBy(activities, 'profile');
    activities = lodash.groupBy(activities, 'profile');

    var items = lodash.keys(activities)
        .map(key => {
            var types= activities[key].map(activity => activity.type),
                items = lodash.uniq(types);

            return activityView.listParams_(items, 'folded', key);
        });

    return activityView.listParams_(items, 'unfolded');
};

activityView.listParams_ = function(items, type, opt_name) {
    return {
        data: {
            name: opt_name || '',
            items: items
        },
        config: {
            type: type
        }
    };
}

module.exports = activityView;
