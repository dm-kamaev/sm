goog.provide('sm.lSearch.bFilter.FilterDropdown');

goog.require('sm.lSearch.bFilter.Filter');
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
    var Filter = sm.lSearch.bFilter.FilterDropdown,
        View = sm.lSearch.bFilter.ViewDropdown;


    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    Filter.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * Event enum
     * @enum {string}
     */
    Filter.Event = {
        CHECK_OPTION: sm.lSearch.bFilter.Filter.Event.CHECK_OPTION,
        UNCHECK_OPTION: sm.lSearch.bFilter.Filter.Event.UNCHECK_OPTION,
        CHECK: sm.lSearch.bFilter.Filter.Event.CHECK,
        UNCHECK: sm.lSearch.bFilter.Filter.Event.UNCHECK,
        SUBMIT: sm.lSearch.bFilter.Filter.Event.SUBMIT
    };


    /**
     * @override
     * @param {Element} element
     */
    Filter.prototype.decorateInternal = function(element) {
        Filter.base(this, 'decorateInternal', element);
    };


    /**
     * @override
     */
    Filter.prototype.enterDocument = function() {
        Filter.base(this, 'enterDocument');
    };


    /**
     * Reset options filters
     * @public
     */
    Filter.prototype.reset = function() {
        this.list_.reset();
    };


    /**
     * Return true if selected at least one option, else return false
     * @return {boolean}
     * @public
     */
    Filter.prototype.isChecked = function() {
        return this.list_.isSelected();
    };


    /**
     * Get data of checked options
     * @return {Array<{
     *     value: (string|number),
     *     label: string,
     *     name: string,
     *     isChecked: boolean
     * }>}
     * @public
     */
    Filter.prototype.getCheckedData = function() {
        var itemData = this.list_.getSelectedItemData();

        itemData.isChecked = true;
        itemData.name = this.getName();

        return [itemData];
    };


    /**
     * Get all options data
     * @return {Array<{Object}>}
     * @public
     */
    Filter.prototype.getAllData = function() {
        return this.allOptionsData;
    };


    /**
     * Get filter name
     * @return {string}
     * @public
     */
    Filter.prototype.getName = function() {
        return this.params.name;
    };


    /**
     * Get filter type
     * @return {string}
     * @public
     */
    Filter.prototype.getType = function() {
        return this.params.type;
    };


    /**
     * Set all options data
     * @protected
     */
    Filter.prototype.setAllData = function() {
        this.allOptionsData = [];
    };


    /**
     * Initializes listeners for options
     * @protected
     */
    Filter.prototype.initOptionsListeners = function() {
        this.getHandler().listen(
            this.list_,
            sm.gDropdown.DropdownSelect.Event.ITEM_SELECT,
            this.onListItemChange
        );
    };


    /**
     * Handler for option check
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onListItemChange = function(event) {
        if (this.isChecked()) {
            this.dispatchEventCheckOption(event.data);
        } else {
            this.dispatchEventUncheckOption();
        }
        this.dispatchEventChangeOptions();
    };


    /**
     * Dispatch event if state options changed
     * @protected
     */
    Filter.prototype.dispatchEventChangeOptions = function() {
        var type = this.isChecked() ?
            Filter.Event.CHECK :
            Filter.Event.UNCHECK;

        this.dispatchEvent({
            'type': type
        });
    };


    /**
     * Dispatch event if check option
     * @param {{
     *     value: (string|number),
     *     label: string
     * }} optionData
     * @protected
     */
    Filter.prototype.dispatchEventCheckOption = function(optionData) {
        this.dispatchEvent({
            'type': Filter.Event.CHECK_OPTION,
            'data': optionData
        });
    };


    /**
     * Dispatch event if uncheck option
     * @protected
     */
    Filter.prototype.dispatchEventUncheckOption = function() {
        this.dispatchEvent({
            'type': Filter.Event.UNCHECK_OPTION
        });
    };


    /**
     * Initializes list with options
     * @protected
     */
    Filter.prototype.initOptions = function() {
        this.list_ = this.decorateChild(
            'dropdown-select',
            this.getView().getDom().list
        );
    };
});  // goog.scope
