goog.provide('sm.lSearch.bFilter.FilterRange');

goog.require('sm.bSmInputRange.SmInputRange');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.TemplateRange');
goog.require('sm.lSearch.bFilter.ViewRange');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.Filter}
 */
sm.lSearch.bFilter.FilterRange = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterRange.base(this, 'constructor',
        view, opt_domHelper);
};
goog.inherits(sm.lSearch.bFilter.FilterRange, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterRange = sm.lSearch.bFilter.FilterRange,
        View = sm.lSearch.bFilter.ViewRange;

    /**
     * Name of this element in factory
     */
    FilterRange.NAME = sm.lSearch.bFilter.TemplateRange.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(FilterRange.NAME, {
        control: FilterRange,
        view: View
    });

    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterRange.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * @override
     */
    FilterRange.prototype.enterDocument = function() {
        FilterRange.base(this, 'enterDocument');

        this.initViewListeners();
    };


    /**
     * Reset filter
     * @override
     * @public
     */
    FilterRange.prototype.reset = function() {
        for (var i = 0; i < this.options.length; i++) {
            this.options[i].reset();
        }
    };


    /**
     * Return true if not empty at least one option, else return false
     * @return {boolean}
     * @override
     * @public
     */
    FilterRange.prototype.isChecked = function() {
        var isChecked = false;

        for (var i = 0; i < this.options.length; i++) {
            if (!this.options[i].isDefaultState()) {
                isChecked = true;
            }
        }
        return isChecked;
    };


    /**
     * Get data of not empty options
     * @return {Array<sm.bSmInputRange.SmInputRange.Params>}
     * @override
     * @public
     */
    FilterRange.prototype.getCheckedData = function() {
        var result = [];

        this.options.forEach(function(option) {
            if (!option.isDefaultState()) {
                result.push(option.getData());
            }
        }, this);

        return result;
    };


    /**
     * Initializes listeners for options
     * @override
     * @protected
     */
    FilterRange.prototype.initOptionsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.options.length; i++) {
            handler.listen(
                this.options[i],
                sm.bSmInputRange.SmInputRange.Event.CHANGE,
                this.onOptionChange_
            );
        }
    };


    /**
     * Initializes options
     * @override
     * @protected
     */
    FilterRange.prototype.initOptions = function() {
        this.getView().initOptions();

        this.options = this.decorateChildren(
            sm.bSmInputRange.SmInputRange.NAME,
            this.getView().getDom().options
        );
    };


    /**
     * Handler for option change
     * @param {goog.events.Event} event
     * @private
     */
    FilterRange.prototype.onOptionChange_ = function(event) {
        var option = event.target;

        if (option.isDefaultState()) {
            this.dispatchEventUncheckOption(option);
        } else {
            this.dispatchEventCheckOption(option);
        }

        this.dispatchEventChangeOptions();
    };
});  // goog.scope
