var lodash = require('lodash');
var activityView = {};

/**
 * @param {object} activities
 * @return {object}
 */
activityView.list = function(activities) {
    activities = lodash.sortBy(activities, 'category');
    activities = lodash.groupBy(activities, 'category');

    var items = lodash.keys(activities)
        .map(key => {
            var spheres = activities[key].map(activity => activity.sphere),
                items = lodash.uniq(spheres);

            return activityView.listParams_(items, 'folded', key);
        });

    return activityView.listParams_(items, 'unfolded');
};

activityView.listParams_ = function(items, sphere, opt_name) {
    return {
        data: {
            name: opt_name || '',
            items: items
        },
        config: {
            type: sphere
        }
    };
};

module.exports = activityView;
