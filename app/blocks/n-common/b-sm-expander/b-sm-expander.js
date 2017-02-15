/**
 * @fileoverview Expander component
 * Dispatch event about changing state
 * When expanded change theme and hoverability of link in title
 *
 * When take empty content in template disable expand behaviour
 */
goog.provide('sm.bSmExpander.SmExpander');

goog.require('cl.iControl.Control');
goog.require('sm.bSmExpander.Template');
goog.require('sm.bSmExpander.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iCloblFactory.FactoryStendhal');


goog.scope(function() {
    var View = sm.bSmExpander.View;
    var Link = sm.bSmLink.SmLink;




    /**
     * Expander block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmExpander.SmExpander = function(view, opt_domHelper) {
        sm.bSmExpander.SmExpander.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Current state
         * @type {?sm.bSmExpander.SmExpander.State}
         * @private
         */
        this.state_ = null;


        /**
         * Link component instance
         * @type {sm.bSmLink.SmLink}
         * @private
         */
        this.link_ = null;


        /** Disable all states for goog.ui.component */
        this.setSupportedState(goog.ui.Component.State.ALL, false);

        /** Disable text selection */
        this.setAllowTextSelection(false);
    };
    goog.inherits(sm.bSmExpander.SmExpander, cl.iControl.Control);
    var Expander = sm.bSmExpander.SmExpander;

    /**
     * Name of this element in factory
     */
    Expander.NAME = sm.bSmExpander.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Expander.NAME, {
        control: Expander,
        view: View
    });

    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    Expander.CssClass = {
        ROOT: 'b-sm-expander'
    };


    /**
     * List of Expander block events
     * @enum {string}
     * @const
     */
    Expander.Event = {
        EXPAND: goog.events.getUniqueId('expand'),
        FOLD: goog.events.getUniqueId('fold')
    };


    /**
     * List of possible states
     * @enum {string}
     */
    Expander.State = View.State;


    /**
     * @typedef {sm.bSmExpander.View.RenderParams}
     */
    sm.bSmExpander.SmExpander.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmExpander.View.RenderParams}
     */
    Expander.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * Set state
     * @param {sm.bSmExpander.SmExpander.State} state
     * @public
     */
    Expander.prototype.setState = function(state) {
        if (this.isValidState_(state) && state != this.state_) {
            this.state_ = state;

            this.getView().setState(state);
        }
    };


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    Expander.prototype.decorateInternal = function(element) {
        Expander.base(this, 'decorateInternal', element);

        this.initState_();
        this.initLink_();
    };


    /**
     * @override
     * @protected
     */
    Expander.prototype.enterDocument = function() {
        Expander.base(this, 'enterDocument');

        this.viewListen(
            View.Event.EXPAND_BUTTON_CLICK,
            this.onExpandButtonClick_
        );
    };


    /**
     * Expand button click handler
     * @private
     */
    Expander.prototype.onExpandButtonClick_ = function() {
        if (!this.params.isEmptyContent) {
            this.switchState_();
        }
    };


    /**
     * Switches current state to another
     * @private
     */
    Expander.prototype.switchState_ = function() {
        switch (this.state_) {
            case Expander.State.EXPANDED:
                this.setFoldedState_();
                break;

            case Expander.State.FOLDED:
                this.setExpandedState_();
                break;
        }
    };


    /**
     * Set folded state
     * @private
     */
    Expander.prototype.setFoldedState_ = function() {
        this.setState(Expander.State.FOLDED);

        this.link_.setTheme(Link.Theme.DEFAULT);
        this.link_.enableHover();

        this.dispatchEvent(Expander.Event.FOLD);
    };


    /**
     * Set expanded state
     * @private
     */
    Expander.prototype.setExpandedState_ = function() {
        this.setState(Expander.State.EXPANDED);

        this.link_.setTheme(Link.Theme.DARK);
        this.link_.disableHover();

        this.dispatchEvent(Expander.Event.EXPAND);
    };


    /**
     * Check is given state is valid
     * @param {string} state
     * @return {boolean}
     * @private
     */
    Expander.prototype.isValidState_ = function(state) {
        return goog.object.contains(Expander.State, state);
    };


    /**
     * Initialize state
     * @return {sm.bSmExpander.SmExpander}
     * @private
     */
    Expander.prototype.initState_ = function() {
        this.state_ = this.params.isExpanded ?
            Expander.State.EXPANDED :
            Expander.State.FOLDED;

         return this;
    };


    /**
     * Link init
     * @private
     */
    Expander.prototype.initLink_ = function() {
        this.link_ = this.decorateChild(
            sm.bSmLink.SmLink.NAME,
            this.getView().getDom().link
        );
    };
});  // goog.scope
