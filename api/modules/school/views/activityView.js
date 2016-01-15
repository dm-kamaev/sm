var activityView = {};

/**
 * @param {object} activities
 * @return {array}
 */
activityView.list = function(activities) {
    var result = [];

    activities = activities.sort(function(a, b) {
        if (a.profile > b.profile) {
            return 1;
        }

        if (a.profile < b.profile) {
            return -1;
        }

        return 0;
    });

    var profile = '',
        index = -1;

    for (var i = 0, l = activities.length, activity; i < l; i++) {
        activity = activities[i];

        if (profile !== activity.profile) {
            profile = activity.profile;

            result.push({
                'name': profile,
                'items': []
            });
            index += 1;
        }

        if (result[index].items.indexOf(activity.type) === -1) {
            result[index].items.push(activity.type);
        }
    }

    return result;
};

module.exports = activityView;
