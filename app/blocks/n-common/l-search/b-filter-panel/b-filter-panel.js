goog.provide('sm.lSearch.bFilterPanel.FilterPanel');

goog.require('cl.iControl.Control');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.FilterClasses');
goog.require('sm.lSearch.bFilter.FilterDropdown');
goog.require('sm.lSearch.bFilter.FilterExtended');
goog.require('sm.lSearch.bFilter.FilterInput');
goog.require('sm.lSearch.bFilter.FilterSwitch');
goog.require('sm.lSearch.bFilter.FilterSwitchLabels');
goog.require('sm.lSearch.bFilterPanel.Template');
goog.require('sm.lSearch.bFilterPanel.View');
goog.require('sm.lSearch.bTooltip.Tooltip');



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
     * @type {Array<
     *     (sm.lSearch.bFilter.Filter|
     *     sm.lSearch.bFilter.FilterExtended)
     * >}
     * @private
     */
    this.filters_ = [];


    /**
     * Instance button
     * @type {sm.gButton.ButtonStendhal}
     * @private
     */
    this.button_ = null;


    /**
     * Instance tooltip
     * @type {cl.gButton.Button}
     * @private
     */
    this.tooltip_ = null;


    /**
     * Position of last check/uncheck option
     * @type {number}
     * @private
     */
    this.tooltipPosition_ = null;
};
goog.inherits(sm.lSearch.bFilterPanel.FilterPanel, cl.iControl.Control);


goog.scope(function() {
    var FilterPanel = sm.lSearch.bFilterPanel.FilterPanel,
        View = sm.lSearch.bFilterPanel.View;

    /**
     * Name of this element in factory
     */
    FilterPanel.NAME = sm.lSearch.bFilterPanel.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(FilterPanel.NAME, {
        control: FilterPanel,
        view: View
    });

    /**
     * Event enum
     * @enum {string}
     */
    FilterPanel.Event = {
        SUBMIT: goog.events.getUniqueId('submit'),
        CHANGE: goog.events.getUniqueId('change')
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
        this.initTooltip_();
    };


    /**
     * @override
     */
    FilterPanel.prototype.enterDocument = function() {
        FilterPanel.base(this, 'enterDocument');

        this.initViewListeners_();
        this.initFiltersListeners_();
        this.initButtonListeners_();
        this.initTooltipListeners_();
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
     * show balloon with value
     * @param {string} value
     * @public
     */
    FilterPanel.prototype.showTooltip = function(value) {
        this.getView().setTooltipPosition(this.tooltipPosition_);
        if (value==0) {
            this.tooltip_.setText();
            this.tooltip_.hideButton();
        } else {
            this.tooltip_.setText('Найдено: '+value);
            this.tooltip_.showButton();
        }
        this.tooltip_.display(sm.lSearch.bTooltip.Tooltip.Speed.SLOW);
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
            ).listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.UNCHECK,
                this.onFilterUncheck_
            ).listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.SUBMIT,
                this.onSubmit_
            ).listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.CHECK_OPTION,
                this.onOption_
            ).listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.UNCHECK_OPTION,
                this.onOption_
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
     * checkOption/uncheckOption handler
     * @param {Object} event
     * @private
     */
    FilterPanel.prototype.onOption_ = function(event) {
        this.tooltipPosition_ = event.position;
        this.dispatchEvent(FilterPanel.Event.CHANGE);
    };


    /**
     * Initializes listeners for balloon
     * @private
     */
    FilterPanel.prototype.initTooltipListeners_ = function() {
        this.getHandler().listen(
            this.tooltip_,
            sm.lSearch.bTooltip.Tooltip.Event.CLICK,
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
                type = sm.lSearch.bFilter.FilterExtended.NAME;
                break;
            case sm.lSearch.bFilter.FilterSwitchLabels.isControl(element) :
                type = sm.lSearch.bFilter.FilterSwitchLabels.NAME;
                break;
            case sm.lSearch.bFilter.FilterSwitch.isControl(element) :
                type = sm.lSearch.bFilter.FilterSwitch.NAME;
                break;
            case sm.lSearch.bFilter.FilterInput.isControl(element) :
                type = sm.lSearch.bFilter.FilterInput.NAME;
                break;
            case sm.lSearch.bFilter.FilterDropdown.isControl(element) :
                type = sm.lSearch.bFilter.FilterDropdown.NAME;
                break;
            case sm.lSearch.bFilter.FilterClasses.isControl(element) :
                type = sm.lSearch.bFilter.FilterClasses.NAME;
                break;
            default:
                type = sm.lSearch.bFilter.Filter.NAME;
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
            sm.gButton.ButtonStendhal.NAME,
            this.getView().getDom().button
        );
    };


    /**
     * Initializes button submit
     * @private
     */
    FilterPanel.prototype.initTooltip_ = function() {
        this.tooltip_ = this.decorateChild(
            'lSearch-tooltip',
            this.getView().getDom().tooltip
        );
    };
});  // goog.scope
