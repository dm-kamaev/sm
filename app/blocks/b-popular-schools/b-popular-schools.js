goog.provide('sm.bPopularSchools.PopularSchools');

goog.require('cl.iControl.Control');

goog.require('goog.dom');
goog.require('sm.bPopularSchools.View');

/**
 * Popular School
 * @param {Object=} opt_view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bPopularSchools.PopularSchools = function(opt_view, opt_params,
  opt_domHelper) {

    goog.base(this, opt_view, opt_params, opt_domHelper);

    /**
     * Data params "analytics action" ROOT class
     * @type {Element}
     * @private
     */
    this.analyticsAction_ = null;
};
goog.inherits(sm.bPopularSchools.PopularSchools, cl.iControl.Control);

goog.scope(function() {
    var PopularSchools = sm.bPopularSchools.PopularSchools,
        View = sm.bPopularSchools.View,
        Analytics = sm.iAnalytics.Analytics.getInstance();

    /**
     * @override
     */
    PopularSchools.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.setAnalyticsAction_();
    };

    /**
     * @override
     */
    PopularSchools.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        if (this.analyticsAction_) {
            this.viewListen(
                View.Event.SCHOOL_CLICK,
                this.onSchoolClick_
            );
        }

        this.setImpressions_(this.getView().getSchoolsParams());
    };

    /**
     * @private
     */
    PopularSchools.prototype.setAnalyticsAction_ = function() {
        this.analyticsAction_ = this.getView().getAnalyticsAction();
    };

    /**
     * send Analytics data school
     * @param {Object} event
     * @private
     */
    PopularSchools.prototype.onSchoolClick_ = function(event) {
        this.sendEcAnalytics_(event);
        this.sendAnalyticsSchoolData_(
            this.analyticsAction_,
            event['schoolName']
        );
    };

    /**
     * Set impressions for all popular schools
     * @param {Array<Object>} schoolParams
     * @private
     */
    PopularSchools.prototype.setImpressions_ = function(schoolParams) {
        for (var i = 0, schoolParam; schoolParam = schoolParams[i]; i++) {
            this.setImpression_(schoolParam, i + 1);
        }
        Analytics.setView();
    };

    /**
     * Set impressions for all popular schools
     * @param {Object} schoolParam
     * @param {number} position
     * @private
     */
    PopularSchools.prototype.setImpression_ = function(schoolParam, position) {
        Analytics.addImpression({
            'id': schoolParam['id'],
            'name': schoolParam['schoolName'],
            'position': position,
            'list': 'Popular Schools'
        });
    };

    /**
     * send Analytics data school
     * @param {String} action
     * @param {String} label
     * @private
     */
    PopularSchools.prototype.sendAnalyticsSchoolData_ = function(action,
        label) {

        var dataAnalytics = {
            'hitType': 'event',
            'eventCategory': 'popular',
            'eventAction': action,
            'eventLabel': label
        };

        Analytics.send(dataAnalytics);
    };

    /**
     * Send ECommerce Analytics data
     * @param {String} data
     * @private
     */
    PopularSchools.prototype.sendEcAnalytics_ = function(data) {
        var ecData = {
            'id': data['id'],
            'name': data['schoolName'],
            'position': data['position']
        };

        Analytics.clickProduct(ecData, 'Popular Schools');
    };
});
