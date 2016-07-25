var lodash = require('lodash');

var searchType = require('../enums/searchType');

var activityView = {};

/**
 * @param {Array<models.AdditionalEducation>} activities
 * @return {object}
 */
activityView.list = function(activities) {
    activities = lodash.sortBy(activities, 'category');
    activities = lodash.groupBy(activities, 'category');

    var items = lodash.keys(activities)
        .map(key => {
            var spheres = activities[key].map(activity => activity.sphere.name),
                items = lodash.uniq(spheres);

            return activityView.listParams_(items, 'folded', key);
        });

    return activityView.listParams_(items, 'unfolded');
};


/**
 * @param {Array<Object>} items
 * @param {string} type
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
            id: sphere.id,
            label: sphere.name,
            value: sphere.id
        };
    });
};


/**
 * Creates filters with name and values from given additional education spheres
 * @param {Array<models.AdditionalEducationView>} spheres
 * @return {{
 *     filterType: string,
 *     values: Array<{
 *         label: string,
 *         value: number
 *     }>
 * }}
 */
activityView.typeSearchFilter = function(spheres) {
    var sphereFilter = activityView.sphereFilter(spheres);
    return {
        filterType: searchType.fields.ACTIVITY_SPHERE,
        values: sphereFilter
    };
};

module.exports = activityView;
