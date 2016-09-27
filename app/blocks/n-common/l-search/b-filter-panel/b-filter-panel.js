goog.provide('sm.lSearch.bFilterPanel.FilterPanel');

goog.require('cl.iControl.Control');
goog.require('sm.lSearch.bFilterPanel.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSearch.bFilterPanel.FilterPanel = function(view, opt_domHelper) {
    sm.lSearch.bFilterPanel.FilterPanel.base(this, 'constructor',
        view, opt_domHelper);

    /**
     * Array instances filters
     * @type {Array<{
     *     sm.lSearch.bFilter.Filter|
     *     sm.lSearch.bFilter.FilterExtended
     * }>}
     * @private
     */
    this.filters_ = [];


    /**
     * Instance button
     * @type {cl.gButton.Button}
     * @private
     */
    this.button_ = null;
};
goog.inherits(sm.lSearch.bFilterPanel.FilterPanel, cl.iControl.Control);


goog.scope(function() {
    var FilterPanel = sm.lSearch.bFilterPanel.FilterPanel,
        View = sm.lSearch.bFilterPanel.View;


    /**
     * Event enum
     * @enum {string}
     */
    FilterPanel.Event = {
        SUBMIT: goog.events.getUniqueId('submit')
    };


    /**
     * @typedef {Array<sm.lSearch.bFilter.Filter.Data>}
     */
    FilterPanel.FilterData;


    /**
     * @override
     * @param {Element} element
     */
    FilterPanel.prototype.decorateInternal = function(element) {
        FilterPanel.base(this, 'decorateInternal', element);

        this.initFilters_();
        this.initButton_();
    };


    /**
     * @override
     */
    FilterPanel.prototype.enterDocument = function() {
        FilterPanel.base(this, 'enterDocument');

        this.initViewListeners_();
        this.initFiltersListeners_();
        this.initButtonListeners_();
    };


    /**
     * Reset filters
     */
    FilterPanel.prototype.reset = function() {
        this.filters_.forEach(function(filter) {
            filter.reset();
        });

        this.getView().setResetButtonVisibility(false);
    };


    /**
     * Expand filter panel
     */
    FilterPanel.prototype.expand = function() {
        this.getView().expand();
    };


    /**
     * Collapse filter panel
     */
    FilterPanel.prototype.collapse = function() {
        this.getView().collapse();
    };


    /**
     * Get filters data
     * @return {Object<string, sm.lSearch.bFilterPanel.FilterPanel.FilterData>}
     */
    FilterPanel.prototype.getData = function() {
        var result = {};

        this.filters_.forEach(function(filter) {
            var name = filter.getName();
            result[name] = filter.getCheckedData();
        });

        return result;
    };


    /**
     * Initializes listeners for view
     * @private
     */
    FilterPanel.prototype.initViewListeners_ = function() {
        this.viewListen(
            View.Event.RESET,
            this.onResetClick_
        );
    };


    /**
     * Initializes listeners for filters
     * @private
     */
    FilterPanel.prototype.initFiltersListeners_ = function() {
        for (var i = 0; i < this.filters_.length; i++) {
            var filter = this.filters_[i];

            this.getHandler().listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.CHECK,
                this.onFilterCheck_
            );

            this.getHandler().listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.UNCHECK,
                this.onFilterUncheck_
            );

            this.getHandler().listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.SUBMIT,
                this.onSubmit_
            );
        }
    };


    /**
     * Initializes listeners for button submit
     * @private
     */
    FilterPanel.prototype.initButtonListeners_ = function() {
        this.getHandler().listen(
            this.button_,
            cl.gButton.Button.Event.CLICK,
            this.onSubmit_
        );
    };


    /**
     * Reset handler
     * @private
     */
    FilterPanel.prototype.onResetClick_ = function() {
        this.reset();
    };


    /**
     * Button submit handler
     * @private
     */
    FilterPanel.prototype.onSubmit_ = function() {
        this.dispatchEvent({
            'type': FilterPanel.Event.SUBMIT,
            'data': this.getData()
        });
    };


    /**
     * Handler for check filters
     * @private
     */
    FilterPanel.prototype.onFilterCheck_ = function() {
        this.getView().setResetButtonVisibility(true);
    };


    /**
     * Handler for uncheck filters
     * @private
     */
    FilterPanel.prototype.onFilterUncheck_ = function() {
        if (!this.isChecked_()) {
            this.getView().setResetButtonVisibility(false);
        }
    };


    /**
     * Return true if selected least one filter
     * @return {boolean}
     * @private
     */
    FilterPanel.prototype.isChecked_ = function() {
        return this.filters_.some(function(filter) {
            return filter.isChecked();
        });
    };


    /**
     * Get type filter control for factory
     * @param {Element} element
     * @return {string}
     * @private
     */
    FilterPanel.prototype.getFilterType_ = function(element) {
        var type;

        switch (true) {
            case sm.lSearch.bFilter.FilterExtended.isControl(element) :
                type = 'lSearch-filterExtended';
                break;
            case sm.lSearch.bFilter.FilterSwitch.isControl(element) :
                type = 'lSearch-filterSwitch';
                break;
            case sm.lSearch.bFilter.FilterInput.isControl(element) :
                type = 'lSearch-filterInput';
                break;
            default:
                type = 'lSearch-filter';
        }

        return type;
    };


    /**
     * Initializes filter array
     * @private
     */
    FilterPanel.prototype.initFilters_ = function() {
        var filters = this.getView().getDom().filters,
            instance,
            type;

        for (var i = 0; i < filters.length; i++) {
            type = this.getFilterType_(filters[i]);

            instance = this.decorateChild(
                type,
                filters[i]
            );
            this.filters_.push(instance);
        }
    };


    /**
     * Initializes button submit
     * @private
     */
    FilterPanel.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            'button',
            this.getView().getDom().button
        );
    };
});  // goog.scope
