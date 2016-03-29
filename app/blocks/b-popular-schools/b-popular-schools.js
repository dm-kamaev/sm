goog.provide('sm.bPopularSchools.PopularSchools');

goog.require('cl.iControl.Control');

goog.require('goog.dom');
goog.require('sm.bPopularSchools.View');

/**
 * Popular School
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bPopularSchools.PopularSchools = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);
};
goog.inherits(sm.bPopularSchools.PopularSchools, cl.iControl.Control);

goog.scope(function() {
    var PopularSchools = sm.bPopularSchools.PopularSchools,
        View = sm.bPopularSchools.View,
        Analytics = sm.iAnalytics.Analytics.getInstance();

     /**
     * Event enum
     * @enum
     */
    PopularSchools.Event = {
        CLICK_SCHOOL: sm.bPopularSchools.View.Event.CLICK_SCHOOL
    };

    /**
     * @override
     */
    PopularSchools.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

    /**
     * @override
     */
    PopularSchools.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.autoDispatch(
            sm.bPopularSchools.View.Event.CLICK_SCHOOL,
            function(event) {
                event['type'] = PopularSchools.Event.CLICK_SCHOOL,
                event['schoolName'] = event.schoolName;
            }
        );
    };

    /**
     * send Analytics data school
     * @param {Object} event
     * @param {String} action
     */
    PopularSchools.prototype.sendAnalyticsDataSchool = function(event, action) {

        var dataAnalytics = {
            hitType: 'event',
            eventCategory: 'popular',
            eventAction: action,
            eventLabel: event.schoolName
        };

        Analytics.send(dataAnalytics);
    };
});
