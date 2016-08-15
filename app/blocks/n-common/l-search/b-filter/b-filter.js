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
     * @private
     */
    this.options_ = [];
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
        'CHECK': goog.events.getUniqueId('check'),
        'UNCHECK': goog.events.getUniqueId('uncheck')
    };


    /**
     * @override
     * @param {Element} element
     */
    Filter.prototype.decorateInternal = function(element) {
        Filter.base(this, 'decorateInternal', element);

        this.initOptions();
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
        for (var i = 0; i < this.options_.length; i++) {
            this.options_[i].uncheck();
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

        for (var i = 0; i < this.options_.length; i++) {
            if (this.options_[i].isChecked()) {
                isChecked = true;
            }
        }
        return isChecked;
    };


    /**
     * Get data of selected options
     * @return {Array<sm.bSmCheckbox.SmCheckbox.Params>}
     */
    Filter.prototype.getData = function() {
        var result = [];

        for (var i = 0; i < this.options_.length; i++) {
            if (this.options_[i].isChecked()) {
                result.push(this.options_[i].getData());
            }
        }

        return result;
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
     * Initializes listeners for options
     * @protected
     */
    Filter.prototype.initOptionsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.options_.length; i++) {
            handler.listen(
                this.options_[i],
                sm.bSmCheckbox.SmCheckbox.Event.CHECK,
                this.onOptionCheck
            );

            handler.listen(
                this.options_[i],
                sm.bSmCheckbox.SmCheckbox.Event.UNCHECK,
                this.onOptionUnheck
            );
        }
    };


    /**
     * Handler for option check
     * @protected
     */
    Filter.prototype.onOptionCheck = function() {
        this.dispatchEventChangeOptions();
    };


    /**
     * Handler for option uncheck
     * @protected
     */
    Filter.prototype.onOptionUnheck = function() {
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
        var options = this.getView().getDom().options,
            instance;

        for (var i = 0; i < options.length; i++) {
            instance = this.decorateChild(
                'smCheckbox',
                options[i]
            );

            this.options_.push(instance);
        }
    };
});  // goog.scope
