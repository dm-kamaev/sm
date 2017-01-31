goog.provide('sm.lSearch.bFilter.FilterDropdown');

goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.TemplateDropdown');
goog.require('sm.lSearch.bFilter.ViewDropdown');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.Filter}
 */
sm.lSearch.bFilter.FilterDropdown = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterDropdown.base(this, 'constructor',
        view, opt_domHelper);

    /**
     * Instances dropdown-select
     * @type {sm.gDropdown.ViewSelect}
     * @private
     */
    this.list_ = null;


    /**
     * Options params
     * @type {Array<{Object}>}
     * @protected
     */
    this.allOptionsData = [];
};
goog.inherits(sm.lSearch.bFilter.FilterDropdown, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterDropdown = sm.lSearch.bFilter.FilterDropdown,
        View = sm.lSearch.bFilter.ViewDropdown;

    /**
     * Name of this element in factory
     */
    FilterDropdown.NAME = sm.lSearch.bFilter.TemplateDropdown.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(FilterDropdown.NAME, {
        control: FilterDropdown,
        view: View
    });

    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterDropdown.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * Event enum
     * @enum {string}
     */
    FilterDropdown.Event = {
        CHECK_OPTION: sm.lSearch.bFilter.Filter.Event.CHECK_OPTION,
        UNCHECK_OPTION: sm.lSearch.bFilter.Filter.Event.UNCHECK_OPTION,
        CHECK: sm.lSearch.bFilter.Filter.Event.CHECK,
        UNCHECK: sm.lSearch.bFilter.Filter.Event.UNCHECK
    };


    /**
     * Reset options filters
     * @override
     * @public
     */
    FilterDropdown.prototype.reset = function() {
        this.list_.reset();
    };


    /**
     * Return true if selected at least one option, else return false
     * @return {boolean}
     * @override
     * @public
     */
    FilterDropdown.prototype.isChecked = function() {
        return this.list_.isSelected();
    };


    /**
     * Check option
     * @param {{
     *     value: (string|number),
     *     label: string,
     *     name: string,
     *     isChecked: boolean
     * }} data
     * @override
     * @public
     */
    FilterDropdown.prototype.checkOption = function(data) {
        var itemId = this.list_.getItemId(data.value);

        this.list_.selectItem(itemId);
    };


    /**
     * Get data of checked options
     * @return {Array<{
     *     value: (string|number),
     *     label: string,
     *     name: string,
     *     isChecked: boolean
     * }>}
     * @override
     * @public
     */
    FilterDropdown.prototype.getCheckedData = function() {
        var itemData = this.list_.getSelectedItemData();

        itemData.isChecked = true;
        itemData.name = this.getName();

        return [itemData];
    };


    /**
     * Set all options data
     * @override
     * @protected
     */
    FilterDropdown.prototype.setAllData = function() {
        this.allOptionsData = [];
    };


    /**
     * Initializes listeners for options
     * @override
     * @protected
     */
    FilterDropdown.prototype.initOptionsListeners = function() {
        this.getHandler().listen(
            this.list_,
            sm.gDropdown.DropdownSelect.Event.ITEM_SELECT,
            this.onListItemChange
        );
    };


    /**
     * Handler for option check
     * @param {Object} event
     * @override
     * @protected
     */
    FilterDropdown.prototype.onListItemChange = function(event) {
        if (this.isChecked()) {
            this.dispatchEventCheckOption(event.data);
        } else {
            this.dispatchEventUncheckOption(event.data);
        }
        this.dispatchEventChangeOptions();
    };


    /**
     * Dispatch event if check option
     * @param {{
     *     value: (string|number),
     *     label: string
     * }} optionData
     * @override
     * @protected
     */
    FilterDropdown.prototype.dispatchEventCheckOption = function(optionData) {
        this.dispatchEvent({
            'type': FilterDropdown.Event.CHECK_OPTION,
            'data': optionData
        });
    };


    /**
     * Dispatch event if uncheck option
     * @param {{
     *     value: (string|number),
     *     label: string
     * }} optionData
     * @override
     * @protected
     */
    FilterDropdown.prototype.dispatchEventUncheckOption = function(optionData) {
        this.dispatchEvent({
            'type': FilterDropdown.Event.UNCHECK_OPTION,
            'data': optionData
        });
    };


    /**
     * Initializes list with options
     * @override
     * @protected
     */
    FilterDropdown.prototype.initOptions = function() {
        this.list_ = this.decorateChild(
            sm.gDropdown.DropdownSelect.NAME,
            this.getView().getDom().list
        );
    };
});  // goog.scope
