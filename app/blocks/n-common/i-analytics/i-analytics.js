goog.provide('sm.iAnalytics.Analytics');



/**
 * Google Analytics
 * @constructor
 */
sm.iAnalytics.Analytics = function() {


    /**
     * Client Id
     * @type {string}
     * @private
     */
    this.clientId_ = null;
};
goog.addSingletonGetter(sm.iAnalytics.Analytics);


goog.scope(function() {
    var Analytics = sm.iAnalytics.Analytics;


    /**
     * To use for sending data on pageview or products in list is shown (loaded)
     * Price for example 29.20
     * @typedef {{
     *     id: string,
     *     name: string,
     *     list: (string|undefined),
     *     brand: (string|undefined),
     *     category: (string|undefined),
     *     variant: (string|undefined),
     *     position: (number|undefined),
     *     price: (number|undefined)
     * }}
     */
    sm.iAnalytics.Analytics.impressionFieldObjectParams;


    /**
     * To use for sending data about the products that were viewed,
     * added to cart
     * Price for example 29.20
     * Position - product's position in the list
     * @typedef {{
     *     id: string,
     *     name: string,
     *     brand: (string|undefined),
     *     category: (string|undefined),
     *     variant: (string|undefined),
     *     position: (number|undefined),
     *     price: (number|undefined),
     *     quantity: (number|undefined),
     *     coupon: (string|undefined)
     * }}
     */
    sm.iAnalytics.Analytics.productFieldObjectParams;


    /**
     * To use for sending data about the action
     * Revenue for example 29.20
     * @typedef {{
     *     id: string,
     *     affiliation: (string|undefined),
     *     revenue: (number|undefined),
     *     tax: (number|undefined),
     *     shipping: (number|undefined),
     *     coupon: (string|undefined),
     *     list: (string|undefined),
     *     step: (number|undefined),
     *     option: (string|undefined)
     * }}
     */
    sm.iAnalytics.Analytics.actionFieldObjectParams;


    /**
     * Init analytics
     * @param {string} clientId
     * @public
     */
    Analytics.prototype.init = function(clientId) {
        this.clientId_ = clientId;

        this.loadingLibrary_();
        this.create_();
        this.requireEc_();
        this.setCurrency_();
    };


    /**
     * Sent to Google Analytics information on the treatment
     * @param {string|Object} params
     * @public
     */
    Analytics.prototype.send = function(params) {
        ga('send', params);
    };


    /**
     * Send event
     * @param {string} name
     * @param {string} action
     * @param {boolean} nonInteraction
     * @public
     */
    Analytics.prototype.sendEvent = function(name, action, nonInteraction) {
        ga('send', 'event', name, action, {
            'nonInteraction': nonInteraction
        });
    };


    /**
     * Add item info on click
     * @param {Analytics.productFieldObjectParams} params
     * @param {string} place - where clicked the item
     */
    Analytics.prototype.clickProduct = function(params, place) {
        ga('ec:addProduct', params);
        ga('ec:setAction', 'click', {
            'list': place
        });
    };


    /**
     * Add product information in addition to favorites
     * @param {Analytics.productFieldObjectParams} params
     * @param {string} place - where clicked the item
     */
    Analytics.prototype.addProduct = function(params, place) {
        ga('ec:addProduct', params);
        ga('ec:setAction', 'add', {
            'list': place
        });
    };


    /**
     * Add information about the product by removing from favorites
     * @param {Analytics.productFieldObjectParams} params
     * @param {string} place - where clicked the item
     */
    Analytics.prototype.removeProduct = function(params, place) {
        ga('ec:addProduct', params);
        ga('ec:setAction', 'remove', {
            'list': place
        });
    };


    /**
     * Add information about checkout product
     * @param {Analytics.productFieldObjectParams} productParams
     * @param {Analytics.actionFieldObjectParams} actionParams
     */
    Analytics.prototype.checkoutProduct = function(productParams,
        actionParams) {

        ga('ec:addProduct', productParams);
        ga('ec:setAction', 'checkout', actionParams);
    };


    /**
     * Add information about purchase product
     * @param {Analytics.productFieldObjectParams} productParams
     * @param {Analytics.actionFieldObjectParams} actionParams
     */
    Analytics.prototype.purchaseProduct = function(productParams,
        actionParams) {

        ga('ec:addProduct', productParams);
        ga('ec:setAction', 'purchase', actionParams);
    };


    /**
     * Add information about view product
     * @param {Analytics.productFieldObjectParams} params
     */
    Analytics.prototype.viewProduct = function(params) {
        ga('ec:addProduct', params);
    };


    /**
     * Set view
     */
    Analytics.prototype.setView = function() {
        ga('ec:setAction', 'detail');
    };


    /**
     * Add impression about related product
     * @param {Analytics.impressionFieldObjectParams} params
     */
    Analytics.prototype.addImpression = function(params) {
        ga('ec:addImpression', params);
    };


    /**
     * Add impression about related products
     * @param {Array<Analytics.impressionFieldObjectParams>} params
     */
    Analytics.prototype.addImpressions = function(params) {
        params.forEach(function(data) {
            this.addImpression(data);
        }, this);
    };


    /**
     * Transformation impression params in not compressed params to send
     * @param {Analytics.impressionFieldObjectParams} params
     * @return {Analytics.impressionFieldObjectParams}
     */
    Analytics.prototype.transformImpressionParams = function(params) {
        return {
            'id': params.id || null,
            'name': params.name || null,
            'list': params.list || null,
            'brand': params.brand || null,
            'category': params.category || null,
            'variant': params.variant || null,
            'position': params.position || null,
            'price': this.transformCurrency_(params.price)
        };
    };


    /**
     * Transformation product params in not compressed params to send analysts
     * price and quantity of required parameters to get a report
     * from the income of the product
     * @param {Analytics.productFieldObjectParams} params
     * @return {Analytics.productFieldObjectParams}
     */
    Analytics.prototype.transformProductParams = function(params) {
        return {
            'id': params.id || null,
            'name': params.name || null,
            'brand': params.brand || null,
            'category': params.category || null,
            'variant': params.variant || null,
            'position': params.position || null,
            'price': this.transformCurrency_(params.price),
            'quantity': params.quantity || 1,
            'coupon': params.coupon || null
        };
    };


    /**
     * Transformation action params in not compressed params to send analysts
     * @param {Analytics.actionFieldObjectParams} params
     * @return {Analytics.actionFieldObjectParams}
     */
    Analytics.prototype.transformActionParams = function(params) {
        return {
            'id': params.id || null,
            'affiliation': params.affiliation || null,
            'revenue': this.transformCurrency_(params.revenue),
            'tax': params.tax || null,
            'shipping': params.shipping || null,
            'coupon': params.coupon || null,
            'list': params.list || null,
            'step': params.step || null,
            'option': params.option || null
        };
    };


    /**
     * Transformation of currency from string into the desired format
     * @param {string} currencyString
     * @return {number}
     * @private
     */
    Analytics.prototype.transformCurrency_ = function(currencyString) {
        var currency = currencyString ?
            currencyString.replace(/\D/gi, '') :
            null;

        return currency;
    };


    /**
     * Creates a counter for the resource
     * @private
     */
    Analytics.prototype.create_ = function() {
        ga('create', this.clientId_, 'auto');
    };


    /**
     * Attach ecommerce
     * @private
     */
    Analytics.prototype.requireEc_ = function() {
        ga('require', 'ec');
    };


    /**
     * Set local currency for transactions
     * @private
     */
    Analytics.prototype.setCurrency_ = function() {
        ga('set', '&cu', 'RUB');
    };


    /**
     * Asynchronous loading analytics.js library
     * @private
     */
    Analytics.prototype.loadingLibrary_ = function() {
        var win = window,
            urlLibrary = '//www.google-analytics.com/analytics.js',
            func = 'ga';

        win['GoogleAnalyticsObject'] = func;
        win[func] = win[func] || function() {
            (win[func].q = win[func].q || []).push(arguments);
        };
        win[func].l = 1 * new Date();

        var elem = document.createElement('script'),
        elemScript = document.getElementsByTagName('script')[0];

        elem.async = 1;
        elem.src = urlLibrary;
        elemScript.parentNode.insertBefore(elem, elemScript);
    };

    goog.exportSymbol(
        'sm.iAnalytics.Analytics.getInstance',
        Analytics.getInstance
    );
    goog.exportProperty(
        Analytics.prototype,
        'init',
        Analytics.prototype.init
    );
});  // goog.scope
