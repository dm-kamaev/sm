goog.provide('sm.bSmInputRange.View');

goog.require('cl.iControl.View');
goog.require('goog.style');


goog.scope(function() {



    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmInputRange.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmInputRange.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);


        /**
         * @type {sm.bSmInputRange.View.Params}
         * @protected
         */
        this.params = null;
    };
    goog.inherits(sm.bSmInputRange.View, cl.iControl.View);
    var View = sm.bSmInputRange.View;


    /**
     * @typedef {{
     *     name: ?string,
     *     label: ?string,
     *     value: ?string,
     *     minValue: number,
     *     maxValue: number,
     *     step: ?number
     * }}
     */
    sm.bSmInputRange.View.Params;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-input-range'
    };



    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CHANGE: goog.events.getUniqueId('change')
    };


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDomListeners_();
    };


    /**
     * Get value
     * @return {number}
     * @public
     */
    View.prototype.getValue = function() {
        return null;
    };


    /**
     * Set value
     * @param {number} value
     * @public
     */
    View.prototype.setValue = function(value) {
    };


    /**
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Return data-params from dom element
     * @return {sm.bSmInputRange.View.Params}
     * @override
     * @protected
     */
    View.prototype.getParams = function() {
        var rawParams = View.base(this, 'getParams');

        this.params = rawParams ? this.transformParams_(rawParams) : null;
        return this.params;
    };


    /**
     * Initializes listeners for dom element
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClick_
        );
    };


    /**
     * Range click handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onClick_ = function(event) {
    };


    /**
     * Dom elements initialization
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.input = this.getElementByClass(
            sm.gInput.ViewStendhal.CssClass.ROOT
        );

        this.dom.range = this.getElementByClass(
            sm.bSmRange.View.CssClass.ROOT
        );
    };


    /**
     * Transform params to compressed ones
     * @param {sm.bSmInputRange.View.Params} rawParams
     * @return {sm.bSmInputRange.View.Params}
     * @private
     */
    View.prototype.transformParams_ = function(rawParams) {
        return {
            name: rawParams['name'],
            label: rawParams['label'],
            value: rawParams['value'],
            minValue: rawParams['minValue'],
            maxValue: rawParams['maxValue'],
            step: rawParams['step']
        };
    };
});  // goog.scope
