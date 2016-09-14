goog.provide('sm.lSearch.bLabel.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Radio Button View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSearch.bLabel.View = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bLabel.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);
};
goog.inherits(sm.lSearch.bLabel.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lSearch.bLabel.View,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-label',
        CROSS: 'b-label__cross'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        REMOVE_CLICK: goog.events.getUniqueId('remove-click')
    };


    /**
     * @param {Element} element
     * @override
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
    };


    /**
     * Initializes listeners for dom elements
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.dom.cross,
            goog.events.EventType.CLICK,
            this.onCrossClick_
        );
    };


    /**
     * Cross remove handler
     * @private
     */
    View.prototype.onCrossClick_ = function() {
        this.dispatchEvent({
            type: View.Event.REMOVE_CLICK
        });
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            checkbox: goog.dom.getElementByClass(
                sm.bSmCheckbox.View.CssClass.ROOT,
                element
            ),
            cross: goog.dom.getElementByClass(
                View.CssClass.CROSS,
                element
            )
        };
    };
});  // goog.scope
