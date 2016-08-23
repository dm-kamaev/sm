goog.provide('sm.lSearch.bFilter.FilterLabels');

goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.ViewLabels');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.Filter}
 */
sm.lSearch.bFilter.FilterLabels = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterLabels.base(this, 'constructor',
        view, opt_domHelper);
};
goog.inherits(sm.lSearch.bFilter.FilterLabels, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterLabels = sm.lSearch.bFilter.FilterLabels,
        View = sm.lSearch.bFilter.ViewLabels;


    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterLabels.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * @override
     */
    FilterLabels.prototype.enterDocument = function() {
        FilterLabels.base(this, 'enterDocument');
    };


    /**
     * Reset options filters
     * @override
     */
    FilterLabels.prototype.reset = function() {
        this.updateOptions(this.getAllData());

        this.collapse();
    };


    /**
     * Return true if selected at least one option, else return false
     * @return {boolean}
     * @override
     */
    FilterLabels.prototype.isChecked = function() {
        return this.options.length ? true : false;
    };


    /**
     * Get data of checked options
     * @return {Array<sm.bSmCheckbox.SmCheckbox.Params>}
     * @override
     */
    FilterLabels.prototype.getCheckedData = function() {
        var result = [];

        this.options.forEach(function(option) {
            result.push(option.getData());
        }, this);

        return result;
    };


    /**
     * Remove option
     * @param {sm.bSmCheckbox.SmCheckbox} option
     * @override
     */
    FilterLabels.prototype.removeOption = function(option) {
        FilterLabels.base(this, 'removeOption', option);

        this.getView().showLastHiddenItem();
        this.getView().changeButtonState();
    };


    /**
     * Create option
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     * @override
     */
    FilterLabels.prototype.createOption = function(data) {
        FilterLabels.base(this, 'createOption', data);

        this.getView().hideLastShownItem();
        this.getView().changeButtonState();
    };


    /**
     * Update list options
     * @param {Array<{sm.bSmCheckbox.SmCheckbox.Params}>} data
     * @override
     */
    FilterLabels.prototype.updateOptions = function(data) {
        FilterLabels.base(this, 'updateOptions', data);

        this.getView().changeButtonState();
    };


    /**
     * Initializes listeners for options
     * @override
     */
    FilterLabels.prototype.initOptionsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.options.length; i++) {
            handler.listen(
                this.options[i],
                sm.lSearch.bLabel.Label.Event.REMOVE_CLICK,
                this.onOptionUnheck
            );
        }
    };


    /**
     * Handler for option uncheck
     * @param {Object} event
     * @override
     */
    FilterLabels.prototype.onOptionUnheck = function(event) {
        FilterLabels.base(this, 'onOptionUnheck', event);

        this.removeOption(event.target);
    };


    /**
     * Initializes options
     * @override
     */
    FilterLabels.prototype.initOptions = function() {
        this.getView().initOptions();

        var elements = this.getView().getDom().options,
            instance;

        this.options = [];

        for (var i = 0; i < elements.length; i++) {
            instance = this.decorateChild(
                'lSearch-label',
                elements[i]
            );
            this.options.push(instance);
        }
    };
});  // goog.scope
