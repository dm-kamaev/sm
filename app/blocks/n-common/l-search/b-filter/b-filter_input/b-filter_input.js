goog.provide('sm.lSearch.bFilter.FilterInput');

goog.require('sm.lSearch.bFilter.Filter');
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
};
goog.inherits(sm.lSearch.bFilter.FilterInput, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterInput = sm.lSearch.bFilter.FilterInput,
        View = sm.lSearch.bFilter.ViewInput;


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
     * @return {{}}
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
                cl.gInput.Input.Event.INPUT,
                this.onOptionChange_
            );
        }
    };


    /**
     * Initializes listeners for view
     * @protected
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
     */
    FilterInput.prototype.initOptions = function() {
        this.getView().initOptions();

        var elements = this.getView().getDom().options,
            instance;

        for (var i = 0; i < elements.length; i++) {
            instance = this.decorateChild(
                'input',
                elements[i]
            );
            this.options.push(instance);
        }
    };


    /**
     * Handler for option change
     * @private
     */
    FilterInput.prototype.onOptionChange_ = function() {
        this.getView().setButtonResetVisibility(this.isChecked());

        this.dispatchEventChangeOptions();
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
