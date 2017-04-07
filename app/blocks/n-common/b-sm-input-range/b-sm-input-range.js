goog.provide('sm.bSmInputRange.SmInputRange');

goog.require('cl.iControl.Control');
goog.require('sm.bSmInputRange.Template');
goog.require('sm.bSmInputRange.View');
goog.require('sm.bSmRange.SmRange');
goog.require('sm.gInput.InputStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



goog.scope(function() {
    var View = sm.bSmInputRange.View;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmInputRange.SmInputRange = function(view, opt_domHelper) {
        sm.bSmInputRange.SmInputRange.base(this, 'constructor', view,
            opt_domHelper);


        /**
         * @type {sm.bSmInputRange.View.Params}
         * @override
         * @protected
         */
        this.params = view.getParams() || {};


        /**
         * Input instance
         * @type {sm.gInput.InputStendhal}
         * @private
         */
        this.input_ = null;

        /**
         * Range instance
         * @type {sm.bSmRange.SmRange}
         * @private
         */
        this.range_ = null;
    };
    goog.inherits(sm.bSmInputRange.SmInputRange, cl.iControl.Control);
    var InputRange = sm.bSmInputRange.SmInputRange;

    /**
     * Name of this element in factory
     */
    InputRange.NAME = sm.bSmInputRange.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(InputRange.NAME, {
        control: InputRange,
        view: View
    });


    /**
     * @typedef {sm.bSmInputRange.View.Params}
     */
    sm.bSmInputRange.SmInputRange.Params;


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    InputRange.Event = {
        CHANGE: goog.events.getUniqueId('change')
    };


    /**
     * @override
     */
    InputRange.prototype.enterDocument = function() {
        InputRange.base(this, 'enterDocument');

        this.initViewListeners_();

        this.initInputListeners_();
        this.initRangeListeners_();
    };


    /**
     * Set defaul value
     * @public
     */
    InputRange.prototype.reset = function() {
        var value = this.params.defaultValue;

        this.setValue(value);
    };


    /**
     * Get value
     * @return {number}
     * @public
     */
    InputRange.prototype.getValue = function() {
        return this.range_.getValue();
    };


    /**
     * Set value
     * @param {number} value
     * @public
     */
    InputRange.prototype.setValue = function(value) {
        var normalizedValue = this.normalizeValue_(value);

        this.setInputValue_(normalizedValue);
        this.setRangeValue_(normalizedValue);
    };


    /**
     * Get data
     * @return {sm.bSmInputRange.SmInputRange.Params}
     * @public
     */
    InputRange.prototype.getData = function() {
        var params = this.params;
        params.value = this.getValue();

        return params;
    };


    /**
     * Check is it reset or set default value
     * @return {boolean}
     * @public
     */
    InputRange.prototype.isDefaultState = function() {
        return this.getValue() == this.params.defaultValue ? true : false;
    };


    /**
     * Get name
     * @return {string}
     * @public
     */
    InputRange.prototype.getName = function() {
        return this.params.name || null;
    };


    /**
     * @override
     * @protected
     */
    InputRange.prototype.decorateInternal = function(element) {
        InputRange.base(this, 'decorateInternal', element);

        this.initInput_();
        this.initRange_();
    };


    /**
     * Initializes listeners for input
     * @private
     */
    InputRange.prototype.initInputListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.input_,
            sm.gInput.InputStendhal.Event.CHANGE,
            this.onInputChange_
        );

        handler.listen(
            this.input_,
            sm.gInput.InputStendhal.Event.BLUR,
            this.onInputBlur_
        );
    };


    /**
     * Initializes listeners for range
     * @private
     */
    InputRange.prototype.initRangeListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.range_,
            sm.bSmRange.SmRange.Event.CHANGE,
            this.onRangeChange_
        );
    };


     /**
     * Initializes listeners for view
     * @private
     */
    InputRange.prototype.initViewListeners_ = function() {
        this.viewListen(
            View.Event.FIELD_CLICK,
            this.onFieldClick_
        );
    };


    /**
     * Field click handler
     * @private
     */
    InputRange.prototype.onFieldClick_ = function() {
        this.input_.focus();
    };


    /**
     * Input blur handler
     * @private
     */
    InputRange.prototype.onInputBlur_ = function() {
        this.getView().activatePlaceholder();
    };


    /**
     * Input change handler
     * @private
     */
    InputRange.prototype.onInputChange_ = function() {
        if (this.input_.validate()) {
            var value = this.input_.getValue();
            this.setValue(value);

        } else {
            var value = this.range_.getValue();
            this.setInputValue_(value);
        }

        this.dispatchEvent(InputRange.Event.CHANGE);
    };


    /**
     * Range change handler
     * @private
     */
    InputRange.prototype.onRangeChange_ = function() {
        var value = this.range_.getValue();
        this.setInputValue_(value);

        this.dispatchEvent(InputRange.Event.CHANGE);
    };


    /**
     * Set input and placeholder value
     * @param {number} value
     * @private
     */
    InputRange.prototype.setInputValue_ = function(value) {
        this.input_.setValue(value);
        this.getView().updatePlaceholder(value);
    };


    /**
     * Set range value
     * @param {number} value
     * @private
     */
    InputRange.prototype.setRangeValue_ = function(value) {
        this.range_.setValue(value);
    };


    /**
     * Normalize value in range values
     * @param {(number|string)} value
     * @return {number}
     * @private
     */
    InputRange.prototype.normalizeValue_ = function(value) {
        var result = Number(value);

        if (this.params.maxValue < result) {
            result = this.params.maxValue;
        } else if (this.params.minValue > result) {
            result = this.params.minValue;
        }

        return result;
    };


    /**
     * Initializes input instance
     * @private
     */
    InputRange.prototype.initInput_ = function() {
        this.input_ = this.decorateChild(
            sm.gInput.InputStendhal.NAME,
            this.getView().getDom().input
        );
    };


    /**
     * Initializes range instance
     * @private
     */
    InputRange.prototype.initRange_ = function() {
        this.range_ = this.decorateChild(
            sm.bSmRange.SmRange.NAME,
            this.getView().getDom().range
        );
    };
});  // goog.scope
