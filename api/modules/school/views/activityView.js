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


/**
 *
 * @param {Array<Object>} items
 * @param {string} sphere
 * @param {string=} opt_name
 * @return {{
 *     data: {
 *         name: string,
 *         items: Array<Object>
 *     },
 *     config: {
 *         type: string
 *     }
 * }}
 * @private
 */
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


/**
 * Create filters from given additional education spheres
 * @param {Array<models.AdditionalEducationView>} spheres
 * @return {Array<{
 *     label: string,
 *     value: number
 * }>}
 */
activityView.sphereFilter = function(spheres) {
    return spheres.map(sphere => {
        return {
            label: sphere.name,
            value: sphere.id
        };
    });
};

module.exports = activityView;
