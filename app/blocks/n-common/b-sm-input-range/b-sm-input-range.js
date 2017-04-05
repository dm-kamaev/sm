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
     * Event enum
     * @enum {string}
     * @const
     */
    InputRange.Event = {
        CHANGE: View.Event.CHANGE
    };


    /**
     * @protected
     * @override
     */
    InputRange.prototype.decorateInternal = function(element) {
        InputRange.base(this, 'decorateInternal', element);

        this.initInput_();
        this.initRange_();
    };


    /**
     * @override
     * @protected
     */
    InputRange.prototype.enterDocument = function() {
        InputRange.base(this, 'enterDocument');

        this.initListeners_();
    };


    /**
     * Init listeners for instances
     * @private
     */
    InputRange.prototype.initListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.input_,
            sm.gInput.InputStendhal.Event.CHANGE,
            this.onInputChange_
        );

        handler.listen(
            this.range_,
            sm.bSmRange.SmRange.Event.CHANGE,
            this.onRangeChange_
        );
    };


    /**
     * Initializes input instance
     * @private
     */
    InputRange.prototype.onInputChange_ = function() {
        if (this.input_.validate()) {

            var value = this.normalizeValue_(this.input_.getValue());

            this.range_.setValue(value);
            this.input_.setValue(value);
        } else {
            var value = this.range_.getValue();
            this.input_.setValue(value);
        }
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
    InputRange.prototype.onRangeChange_ = function() {
        var value = this.range_.getValue();

        this.input_.setValue(value);
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
