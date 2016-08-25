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
    this.secondaryMarksVisibility_ = false;
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
        LOGOUT_LINK: 'b-authorization-link__link_logout',
        OPENED: 'b-authorization-link_opened',
        HOVERABLE: 'b-authorization-link_hoverable'
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

        this.detectHoverability_();
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
    View.prototype.setActiveState = function() {
        this.setHintVisibility_(true);
        this.setOpenedBlockState_(true);
    };


    /**
     * hide Hint
     */
    View.prototype.setInactiveState = function() {
        this.setHintVisibility_(false);
        this.setOpenedBlockState_(false);
    };


    /**
     * Login Link Click
     * @private
     */
    View.prototype.onLoginLinkClick_ = function() {
        this.setInactiveState();

        this.dispatchEvent({
            'type': View.Event.LOGIN
        });
    };


    /**
     * Logout Link Click
     * @private
     */
    View.prototype.onLogoutLinkClick_ = function() {
        this.setInactiveState();

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

        if (this.secondaryMarksVisibility_ && !isContaints) {
            this.setInactiveState();
        }
    };


    /**
     * If click was not in hint and hint is visible, then hide the hint or
     * show hint
     * @private
     */
    View.prototype.onIconClick_ = function() {
        if (this.secondaryMarksVisibility_) {
            this.setInactiveState();
        }
        else {
            this.setActiveState();
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

        this.secondaryMarksVisibility_ = visible;
    };


    /**
     * Set or remove active state class from block
     * @param {boolean} activeness
     * @private
     */
    View.prototype.setOpenedBlockState_ = function(activeness) {
        activeness ?
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.OPENED
            ) :
            goog.dom.classlist.remove(
                this.getElement(),
                View.CssClass.OPENED
            );
    };


    /**
     * Check hoverability for block and
     * if it hoverable, add to it corresponding modifier
     * @private
     */
    View.prototype.detectHoverability_ = function() {
        if (goog.labs.userAgent.device.isDesktop()) {
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.HOVERABLE
            );
        }
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
