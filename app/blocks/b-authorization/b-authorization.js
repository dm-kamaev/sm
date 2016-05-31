goog.provide('sm.bAuthorization.Authorization');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.uri.utils');
goog.require('sm.bAuthorization.View');



/**
 * Authorization
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bAuthorization.Authorization = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * Auth modal window
     * @type {cl.gAuthSocialModal.AuthSocialModal}
     * @private
     */
    this.socialModal_ = null;
};
goog.inherits(sm.bAuthorization.Authorization, cl.iControl.Control);



goog.scope(function() {
    var Authorization = sm.bAuthorization.Authorization,
        View = sm.bAuthorization.View,
        factoryManager = cl.iFactory.FactoryManager.getInstance();


    /**
     * Singleton getter
     * @return {sm.bAuthorization.Authorization}
     */
    Authorization.getInstance = function() {
        if (!Authorization.instance_) {
            Authorization.instance_ = factoryManager.decorate(
                'stendhal',
                'authorization',
                goog.dom.getElementByClass(View.CssClass.ROOT)
            );
        }

        return Authorization.instance_;
    };


    /**
     * @override
     * @param {Element} element
     */
    Authorization.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSocialModal_();
    };


    /**
     * show authorization modal
     */
    Authorization.prototype.login = function() {
        this.socialModal_.show();
    };


    /**
     * Generate origin address and redirect to logout url with origin option
     */
    Authorization.prototype.logout = function() {
        var redirectPath = goog.uri.utils.buildQueryDataFromMap({
                'origin': this.generateCurrentUrl_()
            });

        window.location.replace('/unauthorize?' + redirectPath);
    };


    /**
     * init Social Modal
     * @private
     */
    Authorization.prototype.initSocialModal_ = function() {
        this.socialModal_ = this.decorateChild(
            'auth-social-modal',
            this.getView().getDom().socialModal
        );
    };


    /**
     * Generate origin address
     * @return {string}
     * @private
     */
    Authorization.prototype.generateCurrentUrl_ = function() {
        var location = document.location.href;

        var currentPath = goog.uri.utils.getPath(location),
            currentQueryParams = goog.uri.utils.getQueryData(location);

        return currentQueryParams ?
            currentPath + '?' + currentQueryParams :
            currentPath;
    };


    jQuery(function() {
        Authorization.getInstance();
    });
});  // goog.scope
