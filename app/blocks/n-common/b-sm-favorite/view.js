goog.provide('sm.bSmFavorite.View');

goog.require('cl.iControl.View');



/**
 * Constructor
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmFavorite.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmFavorite.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);

    /**
     * hide or show hint
     * @type {boolean}
     * @private
     */
    this.isHintVisible_ = false;
};
goog.inherits(sm.bSmFavorite.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmFavorite.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-favorite',
        ICON: 'b-sm-favorite__icon-wrap',
        HINT: 'b-sm-favorite__hint-content',
        AUTHORIZE_LINK: 'b-sm-favorite__link-authorize',
        FILLED: 'b-sm-favorite_filled',
        EMPTY: 'b-sm-favorite_empty',
        HOVERABLE: 'b-sm-favorite_hoverable',
        OPENED: 'b-sm-favorite_opened'
    };


    /**
     * Event enum
     * @type {string}
     */
    View.Event = {
        AUTHORIZE: 'authorize'
    };


    /**
     * States enum
     * @enum {string}
     */
    View.State = {
        FILLED: 'filled',
        EMPTY: 'empty'
    };

    /**
     * Sets given state
     * @param {string} state
     */
    View.prototype.setState = function(state) {
        if (this.isValidState_(state)) {
            this.switchState_(state);
        }
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_()
            .detectHoverability_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.icon,
            goog.events.EventType.CLICK,
            this.onIconClick_
        ).listen(
            this.dom.authorizeLink,
            goog.events.EventType.CLICK,
            this.onAuthorizeLinkClick_
        ).listen(
            document,
            goog.events.EventType.CLICK,
            this.onDocumentClick_
        );
    };


    /**
     * show Hint
     */
    View.prototype.setOpenedState = function() {
        this.setHintVisibility_(true);
        this.setOpenedBlockState_(true);
    };


    /**
     * hide Hint
     */
    View.prototype.unsetOpenedState = function() {
        this.setHintVisibility_(false);
        this.setOpenedBlockState_(false);
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
            this.unsetOpenedState();
        }
    };


    /**
     * If click was not in hint and hint is visible, then hide the hint or
     * show hint
     * @private
     */
    View.prototype.onIconClick_ = function() {
        if (this.isHintVisible_) {
            this.unsetOpenedState();
        }
        else {
            this.setOpenedState();
        }
    };


    /**
     * Handles event of clicking to authorization link
     * @private
     */
    View.prototype.onAuthorizeLinkClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.AUTHORIZE
        });
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
     * Set or remove opened state modifier from block
     * @param {boolean} openedState
     * @private
     */
    View.prototype.setOpenedBlockState_ = function(openedState) {
        openedState ?
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
     * Initializes dom elements
     * @return {sm.bSmFavorite.View}
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
            listPaged: this.getElementByClass(
                sm.bSmListPaged.View.CssClass.ROOT
            )
        };

        return this;
    };


    /**
     * Check hoverability for block and
     * if it hoverable, add to it corresponding modifier
     * @return {sm.bSmFavorite.View}
     * @private
     */
    View.prototype.detectHoverability_ = function() {
        if (goog.labs.userAgent.device.isDesktop()) {
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.HOVERABLE
            );
        }

        return this;
    };


    /**
     * Checks that given state is valid
     * @param {string} state
     * @return {boolean}
     * @private
     */
    View.prototype.isValidState_ = function(state) {
        return state == View.State.EMPTY ||
            state == View.State.FILLED;
    };


    /**
     * Switch state to given state
     * @param {string} state
     * @private
     */
    View.prototype.switchState_ = function(state) {
        if (state == View.State.EMPTY) {
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.EMPTY
            );
            goog.dom.classlist.remove(
                this.getElement(),
                View.CssClass.FILLED
            );
        } else if (state == View.State.FILLED) {
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.FILLED
            );
            goog.dom.classlist.remove(
                this.getElement(),
                View.CssClass.EMPTY
            );
        }
    };
});  // goog.scope
