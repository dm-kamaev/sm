/**
 * @fileoverview Class to send Analytics about the entity (product) and
 * actions with the entity (product)
 *
 * It check supportion of html5 history api,
 * then create new url from given not-empty parameters,
 * then update url with reloading page or not (depends of supportion html5
 * history api)
 */
goog.provide('sm.lSearch.iAnalyticsSender.AnalyticsSender');

goog.require('sm.iAnalytics.Analytics');


goog.scope(function() {



    /**
     * Analytics Sender
     * @param {string} list
     * @constructor
     */
    sm.lSearch.iAnalyticsSender.AnalyticsSender = function(list) {

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
    var AnalyticsSender = sm.lSearch.iAnalyticsSender.AnalyticsSender,
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
     * Add impressions
     * @param {sm.bSmMap.Event.PinClick.Data} data
     */
    AnalyticsSender.prototype.addImpressions = function(data) {

        data.map(function(item) {
            var impressionParams =
                Analytics.getInstance().transformImpressionParams(item);

            Analytics.getInstance().addImpression(impressionParams);
            Analytics.getInstance().setView();
        });

    };


    /**
     * Send clicked on balloon product
     * @param {sm.bSmMap.Event.BalloonItemClick.Data} data
     */
    AnalyticsSender.prototype.sendClickedProduct = function(data) {

        var productParams =
            Analytics.getInstance().transformProductParams(data);

        Analytics.getInstance().clickProduct(productParams, 'map balloon');

        Analytics.getInstance().sendEvent(data.list, 'click', 0);
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
        var data = {
            'hitType': 'event',
            'eventCategory': params.category,
            'eventAction': params.action,
            'eventLabel': params.name || this.getProductParams().name
        };

        Analytics.getInstance().send(data);
    };
});  // goog.scope
