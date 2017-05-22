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
     * Send analytics by checkout action
     * @param {{
     *     category: string,
     *     action: string,
     *     name: (string|undefined)
     * }} actionParams
     * @param {
     *     sm.iAnalytics.Analytics.actionFieldObjectParams=
     * } opt_actionDataEc
     */
    AnalyticsSender.prototype.sendCheckout = function(actionParams,
        opt_actionDataEc) {

        var params = opt_actionDataEc || {};
        params.list = this.list_;

        var productParamsEc = Analytics.getInstance().transformProductParams(
            this.getProductParams()
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
     * Send analytics by promo action
     * @param {{
     *     category: string,
     *     action: string,
     *     name: (string|undefined)
     * }} actionParams
     * @param {sm.iAnalytics.Analytics.promoFieldObject} promoDataEc
     */
    AnalyticsSender.prototype.sendPromo = function(actionParams, promoDataEc) {
        var promoParamsEc = Analytics.getInstance().transformPromoParams(
            promoDataEc
        );

        Analytics.getInstance().promoClick(promoParamsEc);
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
