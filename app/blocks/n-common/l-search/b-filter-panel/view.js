goog.provide('sm.lSearch.bFilterPanel.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('sm.iSmViewport.SmViewport');



/**
 * Filter Panel View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSearch.bFilterPanel.View = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilterPanel.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);

    /**
     * indicator of fixed button
     * @type {boolean}
     */
    this.fixedButton_ = false;
};
goog.inherits(sm.lSearch.bFilterPanel.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lSearch.bFilterPanel.View,
        viewport = sm.iSmViewport.SmViewport.getInstance();


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-filter-panel',
        STATE_EXPANDED: 'b-filter-panel_state_expanded',
        STATE_COLLAPSED: 'b-filter-panel_state_collapsed',
        EXPANDER: 'b-filter-panel__expander',
        COLLAPSER: 'b-filter-panel__collapser',
        CONTENT: 'b-filter-panel__content',
        FILTER: 'b-filter-panel__filter',
        RESET: 'b-filter-panel__reset',
        FIXES_BUTTON: 'b-filter-panel__button-wrap_fixed',
        BUTTON_WRAP: 'b-filter-panel__button-wrap',
        BUTTON_BOX: 'b-filter-panel__button-box',
        TOOLTIP: 'b-filter-panel__tooltip',
        TOOLTIP_WRAP: 'b-filter-panel__tooltip-wrap'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        RESET: goog.events.getUniqueId('reset'),
        COLLAPSE: goog.events.getUniqueId('collapse'),
        SCROLL: goog.events.getUniqueId('scroll')
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDomListeners_();
        this.initWindowListeners_();
    };


    /**
     * Expand filters
     */
    View.prototype.expand = function() {
        goog.dom.classlist.swap(
            this.getElement(),
            View.CssClass.STATE_COLLAPSED,
            View.CssClass.STATE_EXPANDED
        );
    };


    /**
     * Collapse filters
     */
    View.prototype.collapse = function() {
        goog.dom.classlist.swap(
            this.getElement(),
            View.CssClass.STATE_EXPANDED,
            View.CssClass.STATE_COLLAPSED
        );
    };


     /**
     * Adds or deletes class to show button reset
     * @param {bool} visible
     */
    View.prototype.setResetButtonVisibility = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.reset,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.reset,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


     /**
     * Set top offset for balloon
     * @param {number} position
     */
    View.prototype.setTooltipPosition = function(position) {
        var top = position + 'px';
        goog.style.setStyle(this.dom.tooltipWrap, 'top', top);
    };


    /**
     * calculate position of button, compare it with scroll position and edit
     * button fixed status
     * @public
     */
    View.prototype.updateButtonFixability = function() {
        var isButtonNeedToBeFixed = this.isButtonNeedToBeFixed();
        this.setButtonFixability(isButtonNeedToBeFixed);
    };


    /**
     * add and remove class for fix button
     * @param {boolean} fix
     * @public
     */
    View.prototype.setButtonFixability = function(fix) {
        if (this.fixedButton_ !== fix) {
            if (fix) {
                goog.dom.classlist.add(
                    this.dom.buttonWrap,
                    View.CssClass.FIXES_BUTTON
                );
            } else {
                goog.dom.classlist.remove(
                    this.dom.buttonWrap,
                    View.CssClass.FIXES_BUTTON
                );
            }
            this.fixedButton_ = fix;
        }
    };


    /**
     * checks button to need fixed
     * @return {boolean}
     */
    View.prototype.isButtonNeedToBeFixed = function() {
        var res = false;
        if(viewport.getSize() <= sm.iSmViewport.SmViewport.Size.M) {
            var buttonBoxBound = goog.style.getBounds(this.dom.buttonBox);
            var buttonBoxBottom = 15;

            var boxBottomPositionY =
                buttonBoxBound.height + buttonBoxBound.top + buttonBoxBottom;

            var viewportHeght = goog.dom.getViewportSize().height;
            var documentScrollY = goog.dom.getDocumentScroll().y;

            res = boxBottomPositionY > viewportHeght + documentScrollY;
        }
        return res;
    };


    /**
     * Initializes listeners for dom elements
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        if (this.dom.expander) {
            this.getHandler().listen(
                this.dom.expander,
                goog.events.EventType.CLICK,
                this.onExpanderClick_
            );
        }

        if (this.dom.collapser) {
            this.getHandler().listen(
                this.dom.collapser,
                goog.events.EventType.CLICK,
                this.onCollapserClick_
            );
        }

        if (this.dom.reset) {
            this.getHandler().listen(
                this.dom.reset,
                goog.events.EventType.CLICK,
                this.onResetClick_
            );
        }
    };


    /**
     * Initializes listeners for dom elements
     * @private
     */
    View.prototype.initWindowListeners_ = function() {
        this.getHandler().listen(
            goog.dom.getWindow(),
            goog.events.EventType.SCROLL,
            this.onScroll_
        );
    };


    /**
     * Scroll handler
     * @private
     */
    View.prototype.onScroll_ = function() {
        this.dispatchEvent(View.Event.SCROLL);
    };


    /**
     * Expander handler
     * @private
     */
    View.prototype.onExpanderClick_ = function() {
        this.expand();
    };


    /**
     * Collapser handler
     * @private
     */
    View.prototype.onCollapserClick_ = function() {
        this.dispatchEvent(View.Event.COLLAPSE);
        this.collapse();
    };


    /**
     * Reset button handler
     * @private
     */
    View.prototype.onResetClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.RESET
        });
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            content: this.getElementByClass(
                View.CssClass.CONTENT
            ),
            filters: this.getElementsByClass(
                View.CssClass.FILTER
            ),
            expander: this.getElementByClass(
                View.CssClass.EXPANDER
            ),
            button: this.getElementByClass(
                cl.gButton.View.CssClass.ROOT
            ),
            buttonWrap: this.getElementByClass(
                View.CssClass.BUTTON_WRAP
            ),
            buttonBox: this.getElementByClass(
                View.CssClass.BUTTON_BOX
            ),
            reset: this.getElementByClass(
                View.CssClass.RESET
            ),
            tooltip: this.getElementByClass(
                View.CssClass.TOOLTIP
            ),
            tooltipWrap: this.getElementByClass(
                View.CssClass.TOOLTIP_WRAP
            ),
            collapser: this.getElementByClass(
                View.CssClass.COLLAPSER
            )
        };
    };
});  // goog.scope
