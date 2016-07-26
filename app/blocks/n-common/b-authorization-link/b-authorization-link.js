goog.provide('sm.bAuthorizationLink.AuthorizationLink');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bAuthorizationLink.View');
goog.require('sm.iAuthorization.Authorization');



/**
 * AuthorizationLink
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bAuthorizationLink.AuthorizationLink = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.bAuthorizationLink.AuthorizationLink, cl.iControl.Control);


goog.scope(function() {
    var AuthorizationLink = sm.bAuthorizationLink.AuthorizationLink,
        View = sm.bAuthorizationLink.View;

    var Authorization = sm.iAuthorization.Authorization;


    /**
     * Event enum
     * @enum {string}
     */
    AuthorizationLink.Event = {
        LOGIN: View.Event.LOGIN,
        LOGOUT: View.Event.LOGOUT
    };


    /**
     * @override
     */
    AuthorizationLink.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.LOGIN,
            this.onLoginClick_
        );

        this.viewListen(
            View.Event.LOGOUT,
            this.onLogoutClick_
        );
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
});  // goog.scope
