goog.provide('sm.bAuthorizationLink.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * AuthorizationLink View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bAuthorizationLink.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    /**
     * hide or show hint
     * @type {boolean}
     * @private
     */
    this.isHintVisibility_ = false;
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
        AUTHORIZE_LINK: 'b-authorization-link__link_authorize',
        UNAUTHORIZE_LINK: 'b-authorization-link__link_unauthorize'
    };


    /**
     * Event enum
     * @enum {String}
     */
    View.Event = {
        AUTHORIZE: 'authorize-click',
        UNAUTHORIZE: 'unauthorize-click'
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

        if (this.dom.authorizeLink) {
            this.getHandler().listen(
                this.dom.authorizeLink,
                goog.events.EventType.CLICK,
                this.onAuthorizeLinkClick_
            );
        }

        if (this.dom.unauthorizeLink) {
            this.getHandler().listen(
                this.dom.unauthorizeLink,
                goog.events.EventType.CLICK,
                this.onUnauthorizeLinkClick_
            );
        }
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
     * Authorize Link Click
     * @private
     */
    View.prototype.onAuthorizeLinkClick_ = function() {
        this.hideHint();

        this.dispatchEvent({
            'type': View.Event.AUTHORIZE
        });
    };


    /**
     * Unauthorize Link Click
     * @private
     */
    View.prototype.onUnauthorizeLinkClick_ = function() {
        this.hideHint();

        this.dispatchEvent({
            'type': View.Event.UNAUTHORIZE
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

        if (this.isHintVisibility_ && !isContaints) {
            this.hideHint();
        }
    };


    /**
     * If click was not in hint and hint is visible, then hide the hint or
     * show hint
     * @private
     */
    View.prototype.onIconClick_ = function() {
        if (this.isHintVisibility_) {
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

        this.isHintVisibility_ = visible;
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
            authorizeLink: this.getElementByClass(
                View.CssClass.AUTHORIZE_LINK
            ),
            unauthorizeLink: this.getElementByClass(
                View.CssClass.UNAUTHORIZE_LINK
            ),
            socialModal: this.getElementByClass(
                cl.gAuthSocialModal.View.CssClass.ROOT
            )
        };
    };
});  // goog.scope
