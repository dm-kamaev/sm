goog.provide('sm.bAuthorizationLink.View');

goog.require('cl.iControl.View');



/**
 * AuthorizationLink View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bAuthorizationLink.View = function(opt_params, opt_type, opt_modifier) {
    sm.bAuthorizationLink.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);
};
goog.inherits(sm.bAuthorizationLink.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bAuthorizationLink.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-authorization-link',
        LINK_LOGIN: 'b-authorization-link__link-login',
        LINK_LOGOUT: 'b-authorization-link__link-logout'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            linkLogin: this.getElementByClass(
                View.CssClass.LINK_LOGIN
            ),
            linkLogout: this.getElementByClass(
                View.CssClass.LINK_LOGOUT
            )
        };
    };
});  // goog.scope
