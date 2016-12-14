/**
 * @fileoverview Class to send Analytics about the entity (product) and
 * actions with the entity (product)
 *
 * It check supportion of html5 history api,
 * then create new url from given not-empty parameters,
 * then update url with reloading page or not (depends of supportion html5
 * history api)
 */
goog.provide('sm.lCourse.iAnalyticsSender.AnalyticsSender');

goog.require('sm.iAnalytics.Analytics');


goog.scope(function() {



    /**
     * Analytics Sender
     * @param {string} list
     * @constructor
     */
    sm.lCourse.iAnalyticsSender.AnalyticsSender = function(list) {

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
    var AnalyticsSender = sm.lCourse.iAnalyticsSender.AnalyticsSender,
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
     * Send analytics by checkout action
     * @param {sm.iAnalytics.Analytics.actionFieldObjectParams} actionDataEc
     * @param {{
     *     category: string,
     *     action: string,
     *     name: (string|undefined)
     * }} actionParams
     */
    AnalyticsSender.prototype.sendCheckout = function(actionDataEc,
        actionParams) {

        var params = actionDataEc;
        params.list = this.list_;
        params.step = 1;

        var productParams = this.getProductParams();
        productParams.price = actionDataEc.revenue;

        var productParamsEc = Analytics.getInstance().transformProductParams(
            productParams
        );

        var actionParamsEc = Analytics.getInstance().transformActionParams(
            params
        );

        Analytics.getInstance().checkoutProduct(
            productParamsEc, actionParamsEc
        );
        this.send(actionParams);
    };


    /**
     * Send analytics by purchase action
     * @param {sm.iAnalytics.Analytics.actionFieldObjectParams} actionDataEc
     * @param {{
     *     category: string,
     *     action: string,
     *     name: (string|undefined)
     * }} actionParams
     */
    AnalyticsSender.prototype.sendPurchase = function(actionDataEc,
        actionParams) {

        var params = actionDataEc;
        params.list = this.list_;
        params.step = 2;

        var productParams = this.getProductParams();
        productParams.price = actionDataEc.revenue;

        var productParamsEc = Analytics.getInstance().transformProductParams(
            productParams
        );

        var actionParamsEc = Analytics.getInstance().transformActionParams(
            params
        );

        Analytics.getInstance().purchaseProduct(
            productParamsEc, actionParamsEc
        );
        this.send(actionParams);
    };


    /**
     * Send analytics by map pin
     * @param {{
     *     category: string,
     *     action: string,
     *     name: (string|undefined)
     * }} actionParams
     */
    AnalyticsSender.prototype.sendMapAnalytics = function(actionParams) {

        var params = this.getProductParams();

        var impressionParams =
            Analytics.getInstance().transformImpressionParams(params);

        Analytics.getInstance().addImpression(impressionParams);
        Analytics.getInstance().setView();

        this.send(actionParams);
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
