goog.provide('sm.iAnalytics.Analytics');

/**
 * Google Analytics
 * @constructor
 */
sm.iAnalytics.Analytics = function() {

    /**
     * Client Id
     * @type {String}
     * @private
     */
    this.clientId_ = null;
};
goog.addSingletonGetter(sm.iAnalytics.Analytics);

goog.scope(function() {
    var Analytics = sm.iAnalytics.Analytics;


    /**
     * Init analytics
     * @param {String} clientId
     * @public
     */
    Analytics.prototype.init = function(clientId) {
        this.clientId_ = clientId;

        this.loadingLibrary_();
        this.create_();
        this.send('pageview');
    };


    /**
     * Sent to Google Analytics information on the treatment
     * @param {String/Object} params
     * @public
     */
    Analytics.prototype.send = function(params) {
        ga('send', params);
    };


    /**
     * Creates a counter for the resource
     * @private
     */
    Analytics.prototype.create_ = function() {
        ga('create', this.clientId_, 'auto');
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
});
