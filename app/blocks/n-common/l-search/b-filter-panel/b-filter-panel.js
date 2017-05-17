goog.provide('sm.lSearch.bFilterPanel.FilterPanel');

goog.require('cl.iControl.Control');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iSmViewport.SmViewport');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.FilterClasses');
goog.require('sm.lSearch.bFilter.FilterDropdown');
goog.require('sm.lSearch.bFilter.FilterExtended');
goog.require('sm.lSearch.bFilter.FilterInput');
goog.require('sm.lSearch.bFilter.FilterRange');
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
     * Count of search results
     * @type {?number}
     * @private
     */
    this.countResults_ = null;
};
goog.inherits(sm.lSearch.bFilterPanel.FilterPanel, cl.iControl.Control);


goog.scope(function() {
    var FilterPanel = sm.lSearch.bFilterPanel.FilterPanel,
        View = sm.lSearch.bFilterPanel.View,
        viewport = sm.iSmViewport.SmViewport.getInstance();

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
        COLLAPSE: View.Event.COLLAPSE,
        CHECK: goog.events.getUniqueId('check'),
        UNCHECK: goog.events.getUniqueId('uncheck'),
        RESET: goog.events.getUniqueId('reset'),
        FILTER_OPTION_CHECK: sm.lSearch.bFilter.Filter.Event.CHECK_OPTION,
        FILTER_OPTION_UNCHECK: sm.lSearch.bFilter.Filter.Event.UNCHECK_OPTION,
        FILTER_COLLAPSE: sm.lSearch.bFilter.Filter.Event.COLLAPSE,
        FILTER_EXPAND: sm.lSearch.bFilter.Filter.Event.EXPAND,
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
        this.initViewportListener_();
    };


    /**
     * Reset filters
     */
    FilterPanel.prototype.reset = function() {
        this.filters_.forEach(function(filter) {
            filter.reset();
        });

        this.getView().setResetButtonVisibility(false);
        this.getView().setButtonFixability(false);
        this.updateButton();
        this.countResults_ = null;
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
     * set count results
     * @param {number|string|undefined} opt_count
     * @public
     */
    FilterPanel.prototype.showCountResults = function(opt_count) {
        if (opt_count !== undefined) {
            this.countResults_ = opt_count;
        }

        var text = this.countResults_ ?
            'Найдено' + ': ' + this.countResults_ :
            'Ничего не найдено';
        var isEmptyResults = !this.countResults_;


        if(viewport.getSize() <= sm.iSmViewport.SmViewport.Size.M) {
            this.updateButton(text, isEmptyResults);
        } else {
            this.showTooltip(text, isEmptyResults);
        }

        this.updateButtonFixability();
    };

    /**
     * show tooltip with value
     * @param {string|number} value
     * @param {boolean=} opt_hideButton
     * @public
     */
    FilterPanel.prototype.showTooltip = function(value, opt_hideButton) {
        this.tooltip_.setText(value);
        if (opt_hideButton) {
            this.tooltip_.hideButton();
        } else {
            this.tooltip_.showButton();
        }
        this.tooltip_.display(
            sm.lSearch.bTooltip.Tooltip.Animation.DISAPPEAR_SLOW
        );
    };


    /**
     * set position of tooltip
     * @param {{
     *     top: number,
     *     height: number
     * }} bounds
     * @public
     */
    FilterPanel.prototype.positioningTooltip = function(bounds) {
        this.getView().positioningTooltip(bounds);
    };


    /**
     * set text and disable status for button
     * @param {string|number|undefined} opt_text
     * @param {boolean=} opt_disable
     * @public
     */
    FilterPanel.prototype.updateButton = function(opt_text, opt_disable) {
        this.button_.setText(opt_text);
        if (opt_disable) {
            this.button_.disable();
        } else {
            this.button_.enable();
        }
    };

    /**
     * Return true if selected least one filter
     * @return {boolean}
     */
    FilterPanel.prototype.isChecked = function() {
        return this.filters_.some(function(filter) {
            return filter.isChecked();
        });
    };


    /**
     * Shows option by data in filter with name - filterName
     * @param {string} filterName
     * @param {{
     *     name: (string|number),
     *     value: ?(string|number),
     *     id: ?string,
     *     label: ?string,
     *     isChecked: ?boolean
     * }} optionData
     */
    FilterPanel.prototype.showFilterOption = function(filterName, optionData) {
        var filter = this.getFilter_(filterName);
        filter.showOption(optionData);
    };


    /**
     * Hides option by data in filter with name - filterName
     * @param {string} filterName
     * @param {{
     *     name: (string|number),
     *     value: ?(string|number),
     *     id: ?string,
     *     label: ?string,
     *     isChecked: ?boolean
     * }} optionData
     */
    FilterPanel.prototype.hideFilterOption = function(filterName, optionData) {
        var filter = this.getFilter_(filterName);
        filter.hideOption(optionData);
    };


    /**
     * Checks option by data in filter with name - filterName
     * @param {string} filterName
     * @param {{
     *     name: (string|number),
     *     value: ?(string|number),
     *     id: ?string,
     *     label: ?string,
     *     isChecked: ?boolean
     * }} optionData
     */
    FilterPanel.prototype.checkFilterOption = function(filterName, optionData) {
        var filter = this.getFilter_(filterName);
        filter.checkOption(optionData);
    };


    /**
     * Unchecks option by data in filter with name - filterName
     * @param {string} filterName
     * @param {{
     *     name: (string|number),
     *     value: ?(string|number),
     *     id: ?string,
     *     label: ?string,
     *     isChecked: ?boolean
     * }} optionData
     */
    FilterPanel.prototype.uncheckFilterOption = function(filterName,
        optionData) {

        var filter = this.getFilter_(filterName);
        filter.uncheckOption(optionData);
    };


    /**
     * fix button if set count results and required viewport size
     * @public
     */
    FilterPanel.prototype.updateButtonFixability = function() {
        if (this.countResults_ !== null) {
            this.getView().updateButtonFixability();
        }
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

        this.viewListen(
            View.Event.SCROLL,
            this.onScroll_
        );

        this.autoDispatch(FilterPanel.Event.COLLAPSE);
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
            ).listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.EXPAND,
                this.onFilterExpand_
            ).listen(
                filter,
                sm.lSearch.bFilter.Filter.Event.COLLAPSE,
                this.onFilterCollapse_
            );
        }
    };


    /**
     * Initializes listeners for button submit
     * @private
     */
    FilterPanel.prototype.initButtonListeners_ = function() {
        if (this.button_) {
            this.getHandler().listen(
                this.button_,
                cl.gButton.Button.Event.CLICK,
                this.onSubmit_
            );
        }

        this.getHandler().listen(
            this.button_,
            sm.gButton.ButtonStendhal.Event.CLICK,
            this.onSubmit_
        );
    };


    /**
     * checkOption/uncheckOption handler
     * @param {sm.lSearch.bFilter.CheckOptionEvent|
     *         sm.lSearch.bFilter.UncheckOptionEvent} event
     * @private
     */
    FilterPanel.prototype.onOption_ = function(event) {
        this.positioningTooltip(event.bounds);
        this.dispatchEvent(FilterPanel.Event.CHANGE);
    };


    /**
     * filter expand handler
     * @private
     */
    FilterPanel.prototype.onFilterExpand_ = function() {
        this.updateButtonFixability();
    };


    /**
     * filter collapse handler
     * @private
     */
    FilterPanel.prototype.onFilterCollapse_ = function() {
        this.updateButtonFixability();
    };


    /**
     * Initializes listeners for tooltip
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
     * Initializes listeners for viewport
     * @private
     */
    FilterPanel.prototype.initViewportListener_ = function() {
        this.getHandler().listen(
            viewport,
            sm.iSmViewport.SmViewport.Event.RESIZE,
            this.onResize_
        );
    };


    /**
     * Resize handler
     * @param {Object} event
     * @private
     */
    FilterPanel.prototype.onResize_ = function(event) {
        if (event.newSize > sm.iSmViewport.SmViewport.Size.M) {
            this.getView().setButtonFixability(false);
            this.updateButton();
        } else if (this.countResults_ !== null) {
            this.showCountResults();
        }
    };


    /**
     * Reset handler
     * @private
     */
    FilterPanel.prototype.onResetClick_ = function() {
        this.dispatchEvent(FilterPanel.Event.RESET);
        this.reset();
    };


    /**
     * Scroll handler
     * @private
     */
    FilterPanel.prototype.onScroll_ = function() {
        this.updateButtonFixability();
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

        this.dispatchEvent(FilterPanel.Event.CHECK);
    };


    /**
     * Handler for uncheck filters
     * @private
     */
    FilterPanel.prototype.onFilterUncheck_ = function() {
        if (!this.isChecked()) {
            this.getView().setResetButtonVisibility(false);
            this.dispatchEvent(FilterPanel.Event.UNCHECK);
        }
    };


    /**
     * Returns filter by name
     * @param {string} filterName
     * @return {(
     *     sm.lSearch.bFilter.Filter|
     *     sm.lSearch.bFilter.FilterClasses|
     *     sm.lSearch.bFilter.FilterDropdown|
     *     sm.lSearch.bFilter.FilterExtended|
     *     sm.lSearch.bFilter.FilterInput|
     *     sm.lSearch.bFilter.FilterRange|
     *     sm.lSearch.bFilter.FilterSwitch|
     *     sm.lSearch.bFilter.FilterSwitchLabels
     * )}
     * @private
     */
    FilterPanel.prototype.getFilter_ = function(filterName) {
        return goog.array.find(this.filters_, function(filter) {
            return filter.getName() == filterName;
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
        case sm.lSearch.bFilter.FilterRange.isControl(element) :
            type = sm.lSearch.bFilter.FilterRange.NAME;
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
        var button = this.getView().getDom().button;
        if (button) {
            this.button_ = this.decorateChild(
                sm.gButton.ButtonStendhal.NAME,
                button
            );
        }
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
