goog.provide('sm.lSearch.bFilter.ViewInput');

goog.require('sm.lSearch.bFilter.View');



/**
 * Filter input View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewInput = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewInput.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSearch.bFilter.ViewInput, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewInput,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_input',
        BUTTON_RESET: 'b-sm-filter__button_reset'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        RESET_CLICK: goog.events.getUniqueId('reset-click')
    };


    /**
     * Initializes options
     * @param {Element=} opt_element
     */
    View.prototype.initOptions = function(opt_element) {
        var element = opt_element || this.getElement();

        this.dom.wrapOptionsHidable = goog.dom.getElementsByClass(
            View.CssClass.OPTION_HIDABLE,
            element
        );

        this.dom.options = goog.dom.getElementsByClass(
            sm.gInput.ViewStendhal.CssClass.ROOT,
            element
        );
    };


    /**
     * Initializes buttons
     * @param {Element} element
     * @override
     */
    View.prototype.initButtons = function(element) {
        this.dom.buttonReset = goog.dom.getElementByClass(
            View.CssClass.BUTTON_RESET,
            element
        );
    };


    /**
     * Adds or deletes class to show button reset
     * @override
     */
    View.prototype.setButtonResetVisibility = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.buttonReset,
                Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.buttonReset,
                Utils.CssClass.HIDDEN
            );
    };


    /**
     * Initializes listeners for buttons
     * @override
     */
    View.prototype.initButtonsListeners = function() {
        var handler = this.getHandler();

        handler.listen(
            this.dom.buttonReset,
            goog.events.EventType.CLICK,
            this.onButtonResetClick_
        );
    };


    /**
     * Button reset handler
     * @private
     */
    View.prototype.onButtonResetClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.RESET_CLICK
        });
    };
});  // goog.scope
