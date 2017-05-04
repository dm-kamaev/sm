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
        this.lastAnimationType_ = null;
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
    View.Animation = {
        DISAPPEAR_SLOW: 'b-tooltip_disappear_slow'
    };


    /**
     * show root element for specified time
     * @param {View.Animation=} opt_animationType
     * @public
     */
    View.prototype.display = function(opt_animationType) {
        this.removeDefaultState_();
        this.clearAnimation_();

        if (opt_animationType) {
            this.playAnimation_(opt_animationType);
        }
    };


    /**
     * Show button
     * @public
     */
    View.prototype.showButton = function() {
        goog.dom.classlist.remove(this.dom.buttonWrap, View.CssClass.HIDDEN);
    };


    /**
     * Hide button
     * @public
     */
    View.prototype.hideButton = function() {
        goog.dom.classlist.add(this.dom.buttonWrap, View.CssClass.HIDDEN);
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
     * Return data-params from dom element
     * @return {sm.lSearch.bSearchResults.View.DataParams}
     * @protected
     * @override
     */
    View.prototype.getParams = function() {
        var rawParams = View.base(this, 'getParams');
        this.params = (rawParams && !goog.object.isEmpty(rawParams)) ?
            this.transformParams(rawParams) :
            {};

        return this.params;
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, string>} rawParams
     * @return {sm.bSmLink.View.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            defaultText: rawParams['defaultText']
        };
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.button = this.getElementByClass(View.CssClass.BUTTON);
        this.dom.text = this.getElementByClass(View.CssClass.TEXT);
        this.dom.buttonWrap = this.getElementByClass(View.CssClass.BUTTON_WRAP);
    };


    /**
     * Remove default class, that hides this element
     * @private
     */
    View.prototype.removeDefaultState_ = function() {
        goog.dom.classlist.remove(this.getElement(), View.CssClass.HIDDEN);
    };


    /**
     * clear animate class from this element
     * @private
     */
    View.prototype.clearAnimation_ = function() {
        goog.dom.classlist.remove(this.getElement(), this.lastAnimationType_);

        /** all manipulation with dom, that written side by side is compressed
         into one command. it's necessary to call repaint/reflow to separate
         this commands. */
        goog.style.getPageOffset(this.getElement());

        this.lastAnimationType_ = null;
    };


    /**
     * add animate class
     * @param {View.Animation} animateType
     * @private
     */
    View.prototype.playAnimation_ = function(animateType) {
        goog.dom.classlist.add(this.getElement(), animateType);
        this.lastAnimationType_ = animateType;
    };


}); // goog.scope
