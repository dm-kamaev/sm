goog.provide('sm.bAuthorizationLink.AuthorizationLink');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bAuthorizationLink.View');



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


    /**
     * Event enum
     * @enum {String}
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

        this.autoDispatch(
            View.Event.LOGIN
        );

        this.autoDispatch(
            View.Event.LOGOUT
        );
    };
});  // goog.scope
