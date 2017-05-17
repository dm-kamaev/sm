goog.provide('sm.lSearch.bFilter.FilterClasses');

goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.FilterDropdown');
goog.require('sm.lSearch.bFilter.FilterInput');
goog.require('sm.lSearch.bFilter.FilterSwitchLabels');
goog.require('sm.lSearch.bFilter.TemplateClasses');
goog.require('sm.lSearch.bFilter.ViewClasses');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.Filter}
 */
sm.lSearch.bFilter.FilterClasses = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterClasses.base(this, 'constructor',
        view, opt_domHelper);


    /**
     * Instances filters
     * @type {{
     *     optionList: sm.lSearch.bFilter.FilterDropdown,
     *     optionLabels: sm.lSearch.bFilter.FilterSwitchLabels,
     *     optionKindergarten: sm.lSearch.bFilter.Filter
     * }}
     * @protected
     * @override
     */
    this.options = {
        optionList: null,
        optionLabels: null,
        optionKindergarten: null
    };
};
goog.inherits(sm.lSearch.bFilter.FilterClasses, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterClasses = sm.lSearch.bFilter.FilterClasses,
        View = sm.lSearch.bFilter.ViewClasses;

    /**
     * Name of this element in factory
     */
    FilterClasses.NAME = sm.lSearch.bFilter.TemplateClasses.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        FilterClasses.NAME, {
            control: FilterClasses,
            view: View
        }
    );

    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterClasses.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * Event enum
     * @enum {string}
     */
    FilterClasses.Event = {
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
    FilterClasses.prototype.reset = function() {
        for (var key in this.options) {
            if (this.options.hasOwnProperty(key)) {
                this.options[key].reset();
            }
        }

        this.collapse();
    };


    /**
     * Return true if selected at least one option, else return false
     * @return {boolean}
     * @override
     * @public
     */
    FilterClasses.prototype.isChecked = function() {
        var isChecked = false;

        for (var key in this.options) {
            if (this.options[key].isChecked()) {
                isChecked = true;
            }
        }
        return isChecked;
    };


    /**
     * Get data of checked options
     * @return {sm.lSearch.bFilter.Filter.Data}
     * @override
     * @public
     */
    FilterClasses.prototype.getCheckedData = function() {
        var result = [];

        if (this.options.optionLabels.isChecked()) {
            result = result.concat(this.options.optionLabels.getCheckedData());
        }
        if (this.options.optionKindergarten.isChecked()) {
            result = result.concat(
                this.options.optionKindergarten.getCheckedData()
            );
        }

        return result;
    };


    /**
     * Set all options data
     * @override
     * @protected
     */
    FilterClasses.prototype.setAllData = function() {
        this.allOptionsData = [];
    };


    /**
     * Initializes options
     * @override
     * @protected
     */
    FilterClasses.prototype.initOptions = function() {
        this.getView().initOptions();
        var dom = this.getView().getDom();

        this.options = {};

        this.options.optionList = this.decorateChild(
            sm.lSearch.bFilter.FilterDropdown.NAME,
            dom.optionList
        );

        this.options.optionLabels = this.decorateChild(
            sm.lSearch.bFilter.FilterSwitchLabels.NAME,
            dom.optionLabels
        );

        this.options.optionKindergarten = this.decorateChild(
            sm.lSearch.bFilter.Filter.NAME,
            dom.optionKindergarten
        );
    };


    /**
     * Initializes listeners for options
     * @override
     * @protected
     */
    FilterClasses.prototype.initOptionsListeners = function() {
        this.getHandler().listen(
            this.options.optionList,
            sm.lSearch.bFilter.FilterDropdown.Event.CHECK_OPTION,
            this.onOptionListCheck_
        ).listen(
            this.options.optionLabels,
            sm.lSearch.bFilter.FilterSwitchLabels.Event.CHECK_OPTION,
            this.onOptionLabelsCheck_
        ).listen(
            this.options.optionList,
            sm.lSearch.bFilter.FilterDropdown.Event.UNCHECK_OPTION,
            this.onOptionListUncheck_
        ).listen(
            this.options.optionLabels,
            sm.lSearch.bFilter.FilterSwitchLabels.Event.UNCHECK_OPTION,
            this.onOptionLabelsUncheck_
        );
    };


    /**
     * Handler for option check
     * @param {Object} event
     * @private
     */
    FilterClasses.prototype.onOptionListCheck_ = function(event) {
        this.options.optionLabels.checkOption(event.data);
    };


    /**
     * Handler for option check
     * @param {Object} event
     * @private
     */
    FilterClasses.prototype.onOptionLabelsCheck_ = function(event) {
        this.options.optionList.checkOption(event.data);
    };


    /**
     * Handler for option uncheck
     * @private
     */
    FilterClasses.prototype.onOptionListUncheck_ = function() {
        this.options.optionLabels.reset();
    };


    /**
     * Handler for option uncheck
     * @private
     */
    FilterClasses.prototype.onOptionLabelsUncheck_ = function() {
        this.options.optionList.reset();
    };
});  // goog.scope
