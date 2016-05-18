goog.provide('sm.bAuthorizationLink.AuthorizationLink');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bAuthorizationLink.View');



/**
 * AuthorizationLink
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bAuthorizationLink.AuthorizationLink = function(view, opt_params,
    opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    /**
     * Auth modal window
     * @type {sm.gModal.ModalAuth}
     * @private
     */
    this.socialModal_ = null;
};
goog.inherits(sm.bAuthorizationLink.AuthorizationLink, cl.iControl.Control);


goog.scope(function() {
    var AuthorizationLink = sm.bAuthorizationLink.AuthorizationLink,
        View = sm.bAuthorizationLink.View,
        factoryManager = cl.iFactory.FactoryManager.getInstance();


    /**
     * @override
     * @param {Element} element
     */
    AuthorizationLink.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSocialModal_();
    };


    /**
     * @override
     */
    AuthorizationLink.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.AUTHORIZE,
            this.onAuthorizeClick_
        );

        this.viewListen(
            View.Event.UNAUTHORIZE,
            this.onUnauthorizeClick_
        );
    };


    /**
     * Authorize Click
     * @private
     */
    AuthorizationLink.prototype.onAuthorizeClick_ = function() {
        this.socialModal_.show();
    };


    /**
     * Unauthorize Click
     * @private
     */
    AuthorizationLink.prototype.onUnauthorizeClick_ = function() {
    };


    /**
     * init Social Modal
     * @private
     */
    AuthorizationLink.prototype.initSocialModal_ = function() {
        this.socialModal_ = this.decorateChild(
            'auth-social-modal',
            this.getView().getDom().socialModal
        );
    };
});  // goog.scope
