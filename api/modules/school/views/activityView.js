var activityView = {};

/**
 * @param {object} activities
 * @return {array}
 */
activityView.list = function(activities) {
    var result = [];

    activities = activities.sort(function(a, b) {
        if (a.type > b.type) {
            return 1;
        }

        if (a.type < b.type) {
            return -1;
        }

        return 0;
    });

    var type = '',
        index = -1;

    for (var i = 0, l = activities.length, activity; i < l; i++) {
        activity = activities[i];

        if (type !== activity.type) {
            type = activity.type;

            result.push({
                'name': type,
                'items': []
            });
            index += 1;
        }

        result[index].items.push(activity.name);
    }

    return result;
};

module.exports = activityView;
