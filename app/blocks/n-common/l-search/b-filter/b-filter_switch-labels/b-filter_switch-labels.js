goog.provide('sm.lSearch.bFilter.FilterSwitchLabels');

goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bFilter.FilterSwitch');
goog.require('sm.lSearch.bFilter.TemplateSwitchLabels');
goog.require('sm.lSearch.bFilter.ViewSwitchLabels');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.FilterSwitch}
 */
sm.lSearch.bFilter.FilterSwitchLabels = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterSwitchLabels.base(this, 'constructor',
        view, opt_domHelper);
};
goog.inherits(
    sm.lSearch.bFilter.FilterSwitchLabels,
    sm.lSearch.bFilter.FilterSwitch
);


goog.scope(function() {
    var FilterSwitchLabels = sm.lSearch.bFilter.FilterSwitchLabels,
        View = sm.lSearch.bFilter.ViewSwitchLabels;

    /**
     * Name of this element in factory
     */
    FilterSwitchLabels.NAME = sm.lSearch.bFilter.TemplateSwitchLabels.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        FilterSwitchLabels.NAME, {
            control: FilterSwitchLabels,
            view: View
        }
    );

    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterSwitchLabels.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * Event enum
     * @enum {string}
     */
    FilterSwitchLabels.Event = {
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
    FilterSwitchLabels.prototype.reset = function() {
        FilterSwitchLabels.base(this, 'reset');
        this.switchStatusOptions_();
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
    FilterSwitchLabels.prototype.checkOption = function(data) {
        var option = this.findOption(data);

        if (option) {
            option.check();
            this.switchStatusOptions_(option);
        }
    };


    /**
     * Handler for option check
     * @param {Object} event
     * @override
     * @protected
     */
    FilterSwitchLabels.prototype.onOptionCheck = function(event) {
        FilterSwitchLabels.base(this, 'onOptionCheck', event);
        this.switchStatusOptions_(event.target);
    };


     /**
     * Handler for option uncheck
     * @param {Object} event
     * @override
     * @protected
     */
    FilterSwitchLabels.prototype.onOptionUnheck = function(event) {
        FilterSwitchLabels.base(this, 'onOptionUnheck', event);
        this.switchStatusOptions_();
    };


    /**
     * Switch status options
     * @param {sm.bSmRadioButton.SmRadioButton=} opt_option
     * @private
     */
    FilterSwitchLabels.prototype.switchStatusOptions_ = function(opt_option) {
        var checkedOption = opt_option;

        if (checkedOption) {
            this.options.forEach(function(option) {
                option.setInactiveStatus();
            });
            checkedOption.setActiveStatus();
        } else {
            this.options.forEach(function(option) {
                option.setDefaultStatus();
            });
        }
    };
});  // goog.scope
