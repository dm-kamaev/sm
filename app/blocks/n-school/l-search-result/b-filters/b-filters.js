goog.provide('sm.lSearchResult.bFilters.Filters');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('sm.lSearchResult.bFilter.Filter');
goog.require('sm.lSearchResult.bFilter.FilterClasses');
goog.require('sm.lSearchResult.bFilter.FilterExtended');
goog.require('sm.lSearchResult.bFilters.Template');



/**
 * Filters component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bFilters.Filters = function(opt_params) {
    goog.base(this);


    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};


    /**
     * Dom elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};


    /**
     * Instance filter classes
     * @type {sm.lSearchResult.bFilter.FilterClasses}
     * @private
     */
     this.filterClasses_ = null;


    /**
     * Array instances filters
     * @type Array {sm.lSearchResult.bFilter.Filter}
     * @private
     */
     this.filters_ = [];

};
goog.inherits(sm.lSearchResult.bFilters.Filters, goog.ui.Component);


goog.scope(function() {
    var Filters = sm.lSearchResult.bFilters.Filters,
        Filter = sm.lSearchResult.bFilter.Filter,
        FilterExtended = sm.lSearchResult.bFilter.FilterExtended,
        FilterClasses = sm.lSearchResult.bFilter.FilterClasses;


    /**
     * CSS-class enum
     * @enum {string}
     */
    Filters.CssClass = {
        ROOT: 'b-filters',
        STATE_EXPANDED: 'b-filters_state_expanded',
        STATE_COLLAPSED: 'b-filters_state_collapsed',
        EXPANDER: 'b-filters__expander',
        COLLAPSER: 'b-filters__collapser',
        CONTENT: 'b-filters__content',
        SUBMIT_BUTTON: 'b-filters__submit-button',
        RESET_FILTER: 'b-filters__reset',
        HIDDEN: cl.iUtils.Utils.CssClass.HIDDEN
    };


    /**
     * Event enum
     * @enum {string}
     */
    Filters.Event = {
        SUBMIT: 'filters-submit',
        SHOW_SEARCH_FILTER_CLICK: Filter.Event.SHOW_SEARCH_FILTER_CLICK
    };


    /**
     * Filter type enum
     * @enum {string}
     */
    Filters.Type = {
        EGE: 'ege',
        GIA: 'gia',
        OLIMP: 'olimp',
        SCHOOL_TYPE: 'schoolType',
        CLASSES: 'classes',
        SPECIALIZED_CLASS_TYPE: 'specializedClassType',
        ACTIVITY_SPHERE: 'activitySphere'
    };


    /**
     * @override
     */
    Filters.prototype.decorate = function(element) {
        goog.base(this, 'decorate', element);

        this.params_ = jQuery(element).data('params') || {};
    };


    /**
     * @override
     */
    Filters.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bFilters.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };


    /**
     * @override
     * @param {Element} element
     */
    Filters.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_();
        this.initFilters_();
    };


    /**
     * @override
     */
    Filters.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initElementsListeners_();
        this.initFiltersListeners_();
    };


    /**
     * Init elements
     * @private
     */
    Filters.prototype.initElements_ = function() {
        var element = this.getElement();

        this.elements_.filters = goog.dom.getElementsByClass(
            Filter.CssClass.ROOT,
            element
        );

        this.elements_.content = goog.dom.getElementByClass(
            Filters.CssClass.CONTENT,
            element
        );

        this.elements_.expander = goog.dom.getElementByClass(
            Filters.CssClass.EXPANDER,
            element
        );

        this.elements_.collapser = goog.dom.getElementByClass(
            Filters.CssClass.COLLAPSER,
            element
        );

        this.elements_.submit = goog.dom.getElementByClass(
            Filters.CssClass.SUBMIT_BUTTON,
            element
        );

        this.elements_.reset = goog.dom.getElementByClass(
            Filters.CssClass.RESET_FILTER,
            element
        );
    };


    /**
     * Init filters
     * @private
     */
    Filters.prototype.initFilters_ = function() {
        var filters = this.elements_.filters,
            elem,
            filter;

        for (var i = 0; i < filters.length; i++) {
            elem = filters[i];

            if (goog.dom.classes.has(elem, FilterClasses.CssClass.ROOT)) {
                this.filterClasses_ = new FilterClasses();
                this.addChild(this.filterClasses_);
                this.filterClasses_.decorate(elem);
            }
            else if (goog.dom.classes.has(elem, FilterExtended.CssClass.ROOT)) {
                filter = new FilterExtended();
                this.addChild(filter);
                filter.decorate(elem);
                this.filters_.push(filter);
            }
            else {
                filter = new Filter();
                this.addChild(filter);
                filter.decorate(elem);
                this.filters_.push(filter);
            }
        }
    };


    /**
     * Initializes listeners for Elements
     * @private
     */
    Filters.prototype.initElementsListeners_ = function() {
        this.getHandler().listen(
            this.elements_.submit,
            goog.events.EventType.CLICK,
            this.onSubmit_
        );

        this.getHandler().listen(
            this.elements_.expander,
            goog.events.EventType.CLICK,
            this.onExpanderClick_
        );

        this.getHandler().listen(
            this.elements_.collapser,
            goog.events.EventType.CLICK,
            this.onCollapserClick_
        );

        this.getHandler().listen(
            this.elements_.reset,
            goog.events.EventType.CLICK,
            this.onResetFiltersClick_
        );
    };


    /**
     * Initializes listeners for Filters
     * @private
     */
    Filters.prototype.initFiltersListeners_ = function() {
        this.getHandler().listen(
            this.filterClasses_,
            Filter.Event.CHECKED_FILTER,
            this.onCheckedFilter_
        );

        this.getHandler().listen(
            this.filterClasses_,
            Filter.Event.UNCHECKED_FILTER,
            this.onUncheckedFilter_
        );

        for (var i = 0; i < this.filters_.length; i++) {
            var filter = this.filters_[i];

            this.getHandler().listen(
                filter,
                Filter.Event.CHECKED_FILTER,
                this.onCheckedFilter_
            );

            this.getHandler().listen(
                filter,
                Filter.Event.UNCHECKED_FILTER,
                this.onUncheckedFilter_
            );

            this.getHandler().listen(
                filter,
                FilterExtended.Event.APPLY_CLICK,
                this.onSubmit_
            );
        }
    };


    /**
     * Expand filters
     */
    Filters.prototype.expand = function() {
        goog.dom.classes.swap(
            this.getElement(),
            Filters.CssClass.STATE_COLLAPSED,
            Filters.CssClass.STATE_EXPANDED
        );
    };


    /**
     * Collapse filters
     */
    Filters.prototype.collapse = function() {
        goog.dom.classes.swap(
            this.getElement(),
            Filters.CssClass.STATE_EXPANDED,
            Filters.CssClass.STATE_COLLAPSED
        );
    };


    /**
     * Reset filters
     */
    Filters.prototype.reset = function() {
        this.filterClasses_.reset();

        for (var i = 0; i < this.filters_.length; i++) {
            this.filters_[i].reset();
            this.filters_[i].hideFilter_();
        }

        this.hideButtonReset_();
    };


    /**
     * Is checked input
     * @return {boolean}
     */
    Filters.prototype.isChecked = function() {
        var res = false;

        for (var i = 0; i < this.filters_.length; i++) {
            if (this.filters_[i].isCheckedInputs()) {
                res = true;
            }
        }

        if (this.filterClasses_.isCheckedInputs()) {
            res = true;
        }
        return res;
    };


    /**
     * Serialize form to object
     * @public
     * @return {Object}
     */
    Filters.prototype.getData = function() {
        var form = jQuery(this.getElement());
        var data = form.serializeArray();

        return this.processingSerializeArray_(data);
    };


    /**
     * shows the button Reset filters
     * @private
     */
    Filters.prototype.onCheckedFilter_ = function() {
        this.showButtonReset_();
    };


    /**
     * shows the button Reset filters
     * @private
     */
    Filters.prototype.onUncheckedFilter_ = function() {
        if (!this.isChecked()) {
            this.hideButtonReset_();
        }
    };


    /**
     * Reset filters
     * @private
     */
    Filters.prototype.onResetFiltersClick_ = function() {
        this.reset();
    };


    /**
     * Submit handler
     * @private
     */
    Filters.prototype.onSubmit_ = function() {
        var data = this.getData();
        this.dispatchEvent({
            'type': Filters.Event.SUBMIT,
            'data': data
        });
    };


    /**
     * Expand handler
     * @param {Object} event
     * @private
     */
    Filters.prototype.onExpanderClick_ = function(event) {
        this.expand();
    };


    /**
     * Collapse handler
     * @param {Object} event
     * @private
     */
    Filters.prototype.onCollapserClick_ = function(event) {
        this.collapse();
    };


    /**
     * Hide button reset
     * @private
     */
    Filters.prototype.hideButtonReset_ = function() {
        goog.dom.classlist.add(
            this.elements_.reset,
            Filter.CssClass.HIDDEN
        );
    };


    /**
     * Show button reset
     * @private
     */
    Filters.prototype.showButtonReset_ = function() {
        goog.dom.classlist.remove(
            this.elements_.reset,
            Filter.CssClass.HIDDEN
        );
    };


    /**
     * Processing serialize array
     * @param {Array.<Object>} array
     * @return {Object}
     * @private
     */
    Filters.prototype.processingSerializeArray_ = function(array) {
        var result = {};

        goog.object.forEach(Filters.Type, function(value, key, object) {
            result[value] = [];
        });

        for (var i = 0, item; i < array.length; i++) {
            item = array[i];

            result[item.name].push(item.value);
        }

        return result;
    };
});  // goog.scope
