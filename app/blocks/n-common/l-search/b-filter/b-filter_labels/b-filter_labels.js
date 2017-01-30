goog.provide('sm.lSearch.bFilter.FilterLabels');

goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.TemplateLabels');
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
     * Name of this element in factory
     */
    FilterLabels.NAME = sm.lSearch.bFilter.TemplateLabels.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(FilterLabels.NAME, {
        control: FilterLabels,
        view: View
    });

    /**
     * Event enum
     * @enum {string}
     */
    FilterLabels.Event = {
        CHECK_OPTION: sm.lSearch.bFilter.Filter.Event.CHECK_OPTION,
        UNCHECK_OPTION: sm.lSearch.bFilter.Filter.Event.UNCHECK_OPTION,
        CHECK: sm.lSearch.bFilter.Filter.Event.CHECK,
        UNCHECK: sm.lSearch.bFilter.Filter.Event.UNCHECK
    };


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
     * @return {Array<sm.lSearch.bLabel.Label.Params>}
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
     * Check option
     * @param {sm.lSearch.bLabel.Label.Params} data
     */
    FilterLabels.prototype.checkOption = function(data) {
        this.createOption(data);
    };


    /**
     * Uncheck option
     * @param {sm.lSearch.bLabel.Label.Params} data
     */
    FilterLabels.prototype.uncheckOption = function(data) {
        var option = this.findOption(data);

        if (option) {
            this.removeOption(option);
        }
    };


    /**
     * Remove option
     * @param {sm.lSearch.bLabel.Label} option
     * @override
     */
    FilterLabels.prototype.removeOption = function(option) {
        FilterLabels.base(this, 'removeOption', option);

        this.getView().showLastHiddenOption();
        this.getView().changeButtonMoreState();
    };


    /**
     * Create option
     * @param {sm.lSearch.bLabel.Label.Params} data
     * @override
     */
    FilterLabels.prototype.createOption = function(data) {
        this.getView().addOption(data, 0);

        this.initOptions();
        this.initOptionsListeners();

        this.getView().hideLastShownOption();
        this.getView().changeButtonMoreState();
    };


    /**
     * Update list options
     * @param {Array<{sm.lSearch.bLabel.Label.Params}>} data
     * @override
     */
    FilterLabels.prototype.updateOptions = function(data) {
        FilterLabels.base(this, 'updateOptions', data);

        this.getView().changeButtonMoreState();
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
