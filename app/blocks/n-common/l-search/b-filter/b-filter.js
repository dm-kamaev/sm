goog.provide('sm.lSearch.bFilter.Filter');

goog.require('cl.iControl.Control');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lSearch.bFilter.Template');
goog.require('sm.lSearch.bFilter.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSearch.bFilter.Filter = function(view, opt_domHelper) {
    sm.lSearch.bFilter.Filter.base(this, 'constructor',
        view, opt_domHelper);


    /**
     * Instances checkboxes
     * @type {Array<sm.bSmCheckbox.SmCheckbox>}
     * @protected
     */
    this.options = [];


    /**
     * Options params
     * @type {Array<sm.bSmCheckbox.SmCheckbox.Params>}
     * @protected
     */
    this.allOptionsData = [];
};
goog.inherits(sm.lSearch.bFilter.Filter, cl.iControl.Control);


goog.scope(function() {
    var Filter = sm.lSearch.bFilter.Filter,
        View = sm.lSearch.bFilter.View;

    /**
     * Name of this element in factory
     */
    Filter.NAME = sm.lSearch.bFilter.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Filter.NAME, {
        control: Filter,
        view: View
    });

    /**
     * Event enum
     * @enum {string}
     */
    Filter.Event = {
        CHECK_OPTION: goog.events.getUniqueId('check_on'),
        UNCHECK_OPTION: goog.events.getUniqueId('uncheck_on'),
        CHECK: goog.events.getUniqueId('check'),
        UNCHECK: goog.events.getUniqueId('uncheck'),
        SUBMIT: goog.events.getUniqueId('submit')
    };


    /**
     * @typedef {Array<sm.bSmCheckbox.SmCheckbox.Params>}
     */
    Filter.Data;


    /**
     * @override
     * @param {Element} element
     */
    Filter.prototype.decorateInternal = function(element) {
        Filter.base(this, 'decorateInternal', element);

        this.initOptions();
        this.setAllData();
    };


    /**
     * @override
     */
    Filter.prototype.enterDocument = function() {
        Filter.base(this, 'enterDocument');

        this.initOptionsListeners();
        this.initViewListeners();
    };


    /**
     * Reset options filters
     */
    Filter.prototype.reset = function() {
        for (var i = 0; i < this.options.length; i++) {
            this.options[i].uncheck();
        }

        this.collapse();
    };


    /**
     * Expand filter
     */
    Filter.prototype.expand = function() {
        this.getView().expand();
    };


    /**
     * Collapse filter
     */
    Filter.prototype.collapse = function() {
        this.getView().collapse();
    };


    /**
     * Return true if selected at least one option, else return false
     * @return {boolean}
     */
    Filter.prototype.isChecked = function() {
        var isChecked = false;

        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].isChecked()) {
                isChecked = true;
            }
        }
        return isChecked;
    };


    /**
     * Get data of checked options
     * @return {sm.lSearch.bFilter.Filter.Data}
     */
    Filter.prototype.getCheckedData = function() {
        var result = [];

        this.options.forEach(function(option) {
            if (option.isChecked()) {
                result.push(option.getData());
            }
        }, this);

        return result;
    };


    /**
     * Get all options data
     * @return {sm.lSearch.bFilter.Filter.Data}
     */
    Filter.prototype.getAllData = function() {
        return this.allOptionsData;
    };


    /**
     * Get filter name
     * @return {string}
     */
    Filter.prototype.getName = function() {
        return this.params.name;
    };


    /**
     * Get filter type
     * @return {string}
     */
    Filter.prototype.getType = function() {
        return this.params.type;
    };


    /**
     * In first array is set to isChecked true
     * according to the value of the second array
     * @param {Array<{
     *     value: string,
     *     label: string,
     *     name: string,
     *     isChecked: boolean
     * }>} options
     * @param {Array<{Object}>} checkedOptions like options
     * @return {Array<{Object}>} like options
     */
    Filter.prototype.setChecked = function(options, checkedOptions) {
        return options.map(function(item) {
            var itemClone = goog.object.clone(item);

            itemClone.isChecked = checkedOptions.some(function(checked) {
                return itemClone.value == checked.value;
            });

            return itemClone;
        });
    };


    /**
     * Check option
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     */
    Filter.prototype.checkOption = function(data) {
        var option = this.findOption(data);

        if (option) {
            option.check();
        }
    };


    /**
     * Uncheck option
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     */
    Filter.prototype.uncheckOption = function(data) {
        var option = this.findOption(data);

        if (option) {
            option.uncheck();
        }
    };


    /**
     * Remove option
     * @param {sm.bSmCheckbox.SmCheckbox} option
     */
    Filter.prototype.removeOption = function(option) {
        this.removeChild(option);
        this.getView().removeOption(option.getElement());

        this.initOptions();
        this.initOptionsListeners();
    };


    /**
     * Create option
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     */
    Filter.prototype.createOption = function(data) {
        this.getView().addOption(data);

        this.initOptions();
        this.initOptionsListeners();
    };


    /**
     * Update list options
     * @param {Array<{sm.bSmCheckbox.SmCheckbox.Params}>} data
     */
    Filter.prototype.updateOptions = function(data) {
        this.removeOptions();
        this.createOptions(data);
    };


    /**
     * Show header filter
     */
    Filter.prototype.showHeader = function() {
        this.getView().setHeaderVisibility(true);
    };


    /**
     * Hide header filter
     */
    Filter.prototype.hideHeader = function() {
        this.getView().setHeaderVisibility(false);
    };


    /**
     * Find option
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     * @return {sm.bSmCheckbox.SmCheckbox}
     * @protected
     */
    Filter.prototype.findOption = function(data) {
        return goog.array.find(this.options, function(option) {
            return option.getData().value == data.value;
        });
    };


    /**
     * Remove list options
     * @protected
     */
    Filter.prototype.removeOptions = function() {
        this.options.forEach(function(option) {
            this.removeChild(option);
            this.getView().removeOption(option.getElement());
        }, this);

        this.initOptions();
        this.initOptionsListeners();
    };


    /**
     * Update list options
     * @param {Array<{sm.bSmCheckbox.SmCheckbox.Params}>} params
     * @protected
     */
    Filter.prototype.createOptions = function(params) {
        params.forEach(function(data) {
            this.getView().addOption(data);
        }, this);

        this.initOptions();
        this.initOptionsListeners();
    };


    /**
     * Set all options data
     * @protected
     */
    Filter.prototype.setAllData = function() {
        this.options.forEach(function(option) {
            this.allOptionsData.push(option.getData());

        }, this);
    };


    /**
     * Initializes listeners for view
     * @protected
     */
    Filter.prototype.initViewListeners = function() {
    };


    /**
     * Initializes listeners for options
     * @protected
     */
    Filter.prototype.initOptionsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.options.length; i++) {
            handler.listen(
                this.options[i],
                sm.bSmCheckbox.SmCheckbox.Event.CHECK,
                this.onOptionCheck
            );

            handler.listen(
                this.options[i],
                sm.bSmCheckbox.SmCheckbox.Event.UNCHECK,
                this.onOptionUnheck
            );
        }
    };


    /**
     * Handler for submit
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onSubmit = function(event) {
        this.dispatchEventSubmit();
    };


    /**
     * Handler for option check
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onOptionCheck = function(event) {
        this.dispatchEventCheckOption(event.target);
        this.dispatchEventChangeOptions();
    };


    /**
     * Handler for option uncheck
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onOptionUnheck = function(event) {
        this.dispatchEventUncheckOption(event.target);
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
     * @param {sm.bSmCheckbox.SmCheckbox} option
     * @protected
     */
    Filter.prototype.dispatchEventCheckOption = function(option) {
        this.dispatchEvent({
            'type': Filter.Event.CHECK_OPTION,
            'data': option.getData()
        });
    };


    /**
     * Dispatch event if uncheck option
     * @param {sm.bSmCheckbox.SmCheckbox} option
     * @protected
     */
    Filter.prototype.dispatchEventUncheckOption = function(option) {
        this.dispatchEvent({
            'type': Filter.Event.UNCHECK_OPTION,
            'data': option.getData()
        });
    };


    /**
     * Dispatch event if submit filter
     * @protected
     */
    Filter.prototype.dispatchEventSubmit = function() {
        this.dispatchEvent({
            'type': Filter.Event.SUBMIT
        });
    };


    /**
     * Initializes options
     * @protected
     */
    Filter.prototype.initOptions = function() {
        this.getView().initOptions();

        var elements = this.getView().getDom().options,
            instance;

        this.options = [];

        for (var i = 0; i < elements.length; i++) {
            instance = this.decorateChild(
                'smCheckbox',
                elements[i]
            );

            this.options.push(instance);
        }
    };
});  // goog.scope
