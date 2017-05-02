goog.provide('sm.bAuthorizationLink.AuthorizationLink');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bAuthorizationLink.Template');
goog.require('sm.bAuthorizationLink.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * AuthorizationLink
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bAuthorizationLink.AuthorizationLink = function(view, opt_domHelper) {
    sm.bAuthorizationLink.AuthorizationLink.base(this, 'constructor',
        view, opt_domHelper);

    /**
     * Link instance to login
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.linkLogin_ = null;


    /**
     * Link instance to logout
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.linkLogout_ = null;
};
goog.inherits(sm.bAuthorizationLink.AuthorizationLink, cl.iControl.Control);


goog.scope(function() {
    var AuthorizationLink = sm.bAuthorizationLink.AuthorizationLink,
        View = sm.bAuthorizationLink.View;

    var Authorization = sm.iAuthorization.Authorization;

    /**
     * Name of this element in factory
     */
    AuthorizationLink.NAME = sm.bAuthorizationLink.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        AuthorizationLink.NAME, {
            control: AuthorizationLink,
            view: View
        }
    );


    /**
     * @override
     */
    AuthorizationLink.prototype.enterDocument = function() {
        AuthorizationLink.base(this, 'enterDocument');

        this.initLinksListeners_();
    };


    /**
     * Initializes listeners for links
     * @private
     */
    AuthorizationLink.prototype.initLinksListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.linkLogin_,
            sm.bSmLink.SmLink.Event.CLICK,
            this.onLoginClick_
        );

        handler.listen(
            this.linkLogout_,
            sm.bSmLink.SmLink.Event.CLICK,
            this.onLogoutClick_
        );
    };


    /**
     * @param {Element} element
     * @override
     */
    AuthorizationLink.prototype.decorateInternal = function(element) {
        AuthorizationLink.base(this, 'decorateInternal', element);

        this.initLinks_();
    };


    /**
     * Login Click
     * @private
     */
    AuthorizationLink.prototype.onLoginClick_ = function() {
        Authorization.getInstance().authorize();
    };


    /**
     * Logout Click
     * @private
     */
    AuthorizationLink.prototype.onLogoutClick_ = function() {
        Authorization.getInstance().unauthorize();
    };


    /**
     * Initializes link instances
     * @private
     */
    AuthorizationLink.prototype.initLinks_ = function() {
        var dom = this.getView().getDom();

        this.linkLogin_ = this.decorateChild(
            sm.bSmLink.SmLink.NAME,
            dom.linkLogin
        );

        this.linkLogout_ = this.decorateChild(
            sm.bSmLink.SmLink.NAME,
            dom.linkLogout
        );
    };
});  // goog.scope
