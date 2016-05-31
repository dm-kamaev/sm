goog.provide('sm.bAuthorizationLink.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * AuthorizationLink View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bAuthorizationLink.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);

    /**
     * hide or show hint
     * @type {boolean}
     * @private
     */
    this.isHintVisible_ = false;
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
        ICON: 'b-authorization-link__icon-wrap',
        HINT: 'b-authorization-link__hint-content',
        LOGIN_LINK: 'b-authorization-link__link_login',
        LOGOUT_LINK: 'b-authorization-link__link_logout'
    };


    /**
     * Event enum
     * @enum {String}
     */
    View.Event = {
        LOGIN: 'login-click',
        LOGOUT: 'logout-click'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.icon,
            goog.events.EventType.CLICK,
            this.onIconClick_
        );

        this.getHandler().listen(
            document,
            goog.events.EventType.CLICK,
            this.onDocumentClick_
        );

        this.getHandler().listen(
            this.dom.loginLink,
            goog.events.EventType.CLICK,
            this.onLoginLinkClick_
        );
        this.getHandler().listen(
            this.dom.logoutLink,
            goog.events.EventType.CLICK,
            this.onLogoutLinkClick_
        );
    };


    /**
     * show Hint
     */
    View.prototype.showHint = function() {
        this.setHintVisibility_(true);
    };


    /**
     * hide Hint
     */
    View.prototype.hideHint = function() {
        this.setHintVisibility_(false);
    };


    /**
     * Login Link Click
     * @private
     */
    View.prototype.onLoginLinkClick_ = function() {
        this.hideHint();

        this.dispatchEvent({
            'type': View.Event.LOGIN
        });
    };


    /**
     * Logout Link Click
     * @private
     */
    View.prototype.onLogoutLinkClick_ = function() {
        this.hideHint();

        this.dispatchEvent({
            'type': View.Event.LOGOUT
        });
    };


    /**
     * If click was not in Element and hint is visible, then hide the hint
     * @param  {Object} event
     * @private
     */
    View.prototype.onDocumentClick_ = function(event) {
        var isContaints = goog.dom.contains(
            this.getElement(),
            event.target
        );

        if (this.isHintVisible_ && !isContaints) {
            this.hideHint();
        }
    };


    /**
     * If click was not in hint and hint is visible, then hide the hint or
     * show hint
     * @private
     */
    View.prototype.onIconClick_ = function() {
        if (this.isHintVisible_) {
            this.hideHint();
        }
        else {
            this.showHint();
        }
    };


    /**
     * adds or deletes class to show hint
     * @param {bool} visible
     * @private
     */
    View.prototype.setHintVisibility_ = function(visible) {
        visible ?
            goog.dom.classlist.add(
                this.getElement(),
                cl.gHint.View.CssClass.INCLUDE_CLICK_MODE
            ) :
            goog.dom.classlist.remove(
                this.getElement(),
                cl.gHint.View.CssClass.INCLUDE_CLICK_MODE
            );

        this.isHintVisible_ = visible;
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            icon: this.getElementByClass(
                View.CssClass.ICON
            ),
            hint: this.getElementByClass(
                View.CssClass.HINT
            ),
            loginLink: this.getElementByClass(
                View.CssClass.LOGIN_LINK
            ),
            logoutLink: this.getElementByClass(
                View.CssClass.LOGOUT_LINK
            )
        };
    };
});  // goog.scope
