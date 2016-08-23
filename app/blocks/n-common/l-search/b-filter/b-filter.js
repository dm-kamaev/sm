goog.provide('sm.lSearch.bFilter.Filter');

goog.require('cl.iControl.Control');
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
     * Event enum
     * @enum {string}
     */
    Filter.Event = {
        CHECK: goog.events.getUniqueId('check'),
        UNCHECK: goog.events.getUniqueId('uncheck')
    };


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
     * @return {Array<sm.bSmCheckbox.SmCheckbox.Params>}
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
     * @return {Array<sm.bSmCheckbox.SmCheckbox.Params>}
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
     * Handler for option check
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onOptionCheck = function(event) {
        this.dispatchEventChangeOptions();
    };


    /**
     * Handler for option uncheck
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onOptionUnheck = function(event) {
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
