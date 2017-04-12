/**
 * @fileoverview Class to send Analytics about the entity (product) and
 * actions with the entity (product)
 */
goog.provide('sm.lUniversity.iAnalyticsSender.AnalyticsSender');

goog.require('sm.iAnalytics.Analytics');


goog.scope(function() {



    /**
     * Analytics Sender
     * @param {string} list
     * @constructor
     */
    sm.lUniversity.iAnalyticsSender.AnalyticsSender = function(list) {

        /**
         * Product params
         * @type {sm.iAnalytics.Analytics.productFieldObjectParams}
         * @private
         */
        this.productParams_ = {};


        /**
         * Place where sending analytics
         * @type {string}
         * @private
         */
        this.list_ = list;
    };
    var AnalyticsSender = sm.lUniversity.iAnalyticsSender.AnalyticsSender,
        Analytics = sm.iAnalytics.Analytics;


    /**
     * Set product params
     * @param {sm.iAnalytics.Analytics.productFieldObjectParams} params
     */
    AnalyticsSender.prototype.setProductParams = function(params) {
        this.productParams_ = params || {};
    };


    /**
     * Get product params
     * @return {sm.iAnalytics.Analytics.productFieldObjectParams}
     */
    AnalyticsSender.prototype.getProductParams = function() {
        return this.productParams_;
    };


    /**
     * Send analytics about pageview
     */
    AnalyticsSender.prototype.sendPageview = function() {
        var params = this.getProductParams();

        var productParams =
            Analytics.getInstance().transformProductParams(params);

        params.list = this.list_;

        var impressionParams =
            Analytics.getInstance().transformImpressionParams(params);

        Analytics.getInstance().addImpression(impressionParams);
        Analytics.getInstance().viewProduct(productParams);
        Analytics.getInstance().setView();
        Analytics.getInstance().send('pageview');
    };


    /**
     * Send data
     * @param {{
     *     category: string,
     *     action: string,
     *     name: (string|undefined)
     * }} params
     */
    AnalyticsSender.prototype.send = function(params) {
        var label = this.getProductParams().name + ' - ' +
            this.getProductParams().brand;

        var data = {
            'hitType': 'event',
            'eventCategory': params.category,
            'eventAction': params.action,
            'eventLabel': params.name || label
        };

        Analytics.getInstance().send(data);
    };
});  // goog.scope
