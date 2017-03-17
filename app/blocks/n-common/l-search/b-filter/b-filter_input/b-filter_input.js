goog.provide('sm.lSearch.bFilter.FilterInput');

goog.require('sm.gInput.InputStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.TemplateInput');
goog.require('sm.lSearch.bFilter.ViewInput');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.Filter}
 */
sm.lSearch.bFilter.FilterInput = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterInput.base(this, 'constructor',
        view, opt_domHelper);

    /**
     * id of setTimeout
     * @type {?number}
     */
    this.inputTimer = null;
};
goog.inherits(sm.lSearch.bFilter.FilterInput, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterInput = sm.lSearch.bFilter.FilterInput,
        View = sm.lSearch.bFilter.ViewInput;

    /**
     * Name of this element in factory
     */
    FilterInput.NAME = sm.lSearch.bFilter.TemplateInput.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(FilterInput.NAME, {
        control: FilterInput,
        view: View
    });

    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterInput.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * @override
     */
    FilterInput.prototype.enterDocument = function() {
        FilterInput.base(this, 'enterDocument');

        this.initViewListeners();
    };


    /**
     * Reset filter
     */
    FilterInput.prototype.reset = function() {
        this.resetInputs_();
        this.getView().setButtonResetVisibility(false);
        this.collapse();
    };


    /**
     * Return true if not empty at least one option, else return false
     * @return {boolean}
     */
    FilterInput.prototype.isChecked = function() {
        var isChecked = false;

        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].getValue()) {
                isChecked = true;
            }
        }
        return isChecked;
    };


    /**
     * Get data of not empty options
     * @return {Array<{
     *     value: string
     * }>}
     */
    FilterInput.prototype.getCheckedData = function() {
        var result = [];

        this.options.forEach(function(option) {
            if (option.getValue()) {
                result.push({
                    value: option.getValue()
                });
            }
        }, this);

        return result;
    };


    /**
     * Get all options data
     * @return {Object}
     */
    FilterInput.prototype.getAllData = function() {
        return this.allOptionsData;
    };


    /**
     * Set all options data
     * @protected
     */
    FilterInput.prototype.setAllData = function() {
        this.allOptionsData = {};
    };


    /**
     * Initializes listeners for options
     * @protected
     */
    FilterInput.prototype.initOptionsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.options.length; i++) {
            handler.listen(
                this.options[i],
                sm.gInput.InputStendhal.Event.INPUT,
                this.onOptionInput_.bind(this, this.options[i])
            ).listen(
                this.options[i],
                sm.gInput.InputStendhal.Event.ENTER_PRESS,
                this.onSubmit
            );
        }
    };


    /**
     * Initializes listeners for view
     * @protected
     * @override
     */
    FilterInput.prototype.initViewListeners = function() {
        this.viewListen(
            View.Event.RESET_CLICK,
            this.onResetClick_
        );
    };


    /**
     * Initializes options
     * @protected
     * @override
     */
    FilterInput.prototype.initOptions = function() {
        this.getView().initOptions();

        var elements = this.getView().getDom().options,
            instance;

        this.options = [];

        for (var i = 0; i < elements.length; i++) {
            instance = this.decorateChild(
                sm.gInput.InputStendhal.NAME,
                elements[i]
            );
            this.options.push(instance);
        }
    };


    /**
     * Dispatch event if check option
     * @param {Object} option
     * @override
     * @protected
     */
    FilterInput.prototype.dispatchEventCheckOption = function(option) {
        this.dispatchEvent({
            'type': sm.lSearch.bFilter.Filter.Event.CHECK_OPTION,
            'data': option.getValue(),
            'position': this.getView().getOptionOffset(option)
        });
    };


    /**
     * Dispatch event if uncheck option
     * @param {Object} option
     * @override
     * @protected
     */
    FilterInput.prototype.dispatchEventUncheckOption = function(option) {
        this.dispatchEvent({
            'type': sm.lSearch.bFilter.Filter.Event.UNCHECK_OPTION,
            'data': option.getValue(),
            'position': this.getView().getOptionOffset(option)
        });
    };


    /**
     * Handler for option input
     * @param {sm.gInput.InputStendhal} option
     * @private
     */
    FilterInput.prototype.onOptionInput_ = function(option) {
        this.getView().setButtonResetVisibility(this.isChecked());

        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(
            this.onOptionInputCompleted_.bind(this, option),
            500
        );

        this.dispatchEventChangeOptions();
    };


    /**
     * Function for option input completed
     * @param {sm.gInput.InputStendhal} option
     * @private
     */
    FilterInput.prototype.onOptionInputCompleted_ = function(option) {
        if (option.getValue() == '') {
            this.dispatchEventUncheckOption(option);
        } else {
            this.dispatchEventCheckOption(option);
        }
    };


    /**
     * Handler for button reset
     * @private
     */
    FilterInput.prototype.onResetClick_ = function() {
        this.resetInputs_();
        this.getView().setButtonResetVisibility(false);

        this.dispatchEventChangeOptions();
    };


    /**
     * Reset options filters
     * @private
     */
    FilterInput.prototype.resetInputs_ = function() {
        for (var i = 0; i < this.options.length; i++) {
            this.options[i].clear();
        }
    };
});  // goog.scope
