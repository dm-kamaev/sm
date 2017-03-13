goog.provide('sm.lSearch.bTooltip.View');

goog.require('cl.iControl.View');
goog.require('goog.style');



/**
 * Filter balloon View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSearch.bTooltip.View =
    function(opt_params, opt_template, opt_modifier) {
        sm.lSearch.bTooltip.View.base(
            this, 'constructor', opt_params, opt_template, opt_modifier
        );


        /**
         * Last selected class
         * @type {?sm.lSearch.bTooltip.View.CssClass}
         * @private
         */
        this.lastSpeed_ = null;
    };
goog.inherits(sm.lSearch.bTooltip.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.lSearch.bTooltip.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-tooltip',
        TEXT: 'b-tooltip__text',
        BUTTON: 'b-tooltip__button',
        BUTTON_WRAP: 'b-tooltip__button-wrap',
        HIDDEN: 'i-utils__hidden'
    };


    /**
     * Css class enum for speed of show/hide
     * @enum {string}
     */
    View.Speed = {
        SLOW: 'b-tooltip_disappear_slow'
    };


    /**
     * show root element for specified time
     * @param {?View.Speed} speed
     * @public
     */
    View.prototype.display = function(speed) {
        this.removeDefaultState_();
        goog.dom.classlist.remove(this.getElement(), this.lastSpeed_);
        goog.style.getPageOffset(this.getElement()); //magic for restart animate

        if (speed) {
            goog.dom.classlist.add(this.getElement(), speed);
        }

        this.lastSpeed_ = speed;
    };


    /**
     * Show button
     * @public
     */
    View.prototype.showButton = function() {
        goog.dom.classlist.remove(this.dom.button_wrap, View.CssClass.HIDDEN);
    };


    /**
     * Hide button
     * @public
     */
    View.prototype.hideButton = function() {
        goog.dom.classlist.add(this.dom.button_wrap, View.CssClass.HIDDEN);
    };


    /**
     * Set text
     * @param {string} text
     * @public
     */
    View.prototype.setText = function(text) {
        goog.dom.setTextContent(
            this.dom.text,
            text ? text : this.getParams().defaultText
        );
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.button = goog.dom.getElementByClass(View.CssClass.BUTTON);
        this.dom.text = goog.dom.getElementByClass(View.CssClass.TEXT);
        this.dom.button_wrap =
            goog.dom.getElementByClass(View.CssClass.BUTTON_WRAP);
    };


    /**
     * Remove default class for hide this element
     * @private
     */
    View.prototype.removeDefaultState_ = function() {
        goog.dom.classlist.remove(this.getElement(), View.CssClass.HIDDEN);
    };

}); // goog.scope