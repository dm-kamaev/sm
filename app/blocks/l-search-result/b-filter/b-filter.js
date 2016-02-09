goog.provide('sm.lSearchResult.bFilter.Filter');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');

/**
 * Filter component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bFilter.Filter = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Handler
     * @type {!goog.events.EventHandler.<T>}
     * @private
     */
    this.handler_ = this.getHandler();

    /**
     * Filters element
     * @type {Element}
     * @private
     */
    this.filtersElement_ = null;

    /**
     * Show button element
     * @type {Element}
     * @private
     */
    this.showHiddenFiltersButtonElement_ = null;

    /**
     * Show filter button element
     * @type {Element}
     * @private
     */
    this.showFiltersButtonElement_ = null;

    /**
     * Show filter icon element
     * @type {Element}
     * @private
     */
    this.showFiltersIconElement_ = null;

    /**
     * Filters element
     * @type {Element}
     * @private
     */
    this.filterSectionElements_ = null;

    /**
     * Reset button
     * @type {Element}
     * @private
     */
    this.filterResetElement_ = null;

    /**
     * Classes input
     * @type {Element}
     * @private
     */
    this.inputClassesElements_ = null;

    /**
     * Ordinary classes input
     * @type {Element}
     * @private
     */
    this.inputClassesOrdinaryElement_ = null;
};
goog.inherits(sm.lSearchResult.bFilter.Filter, goog.ui.Component);

goog.scope(function() {
    var Filter = sm.lSearchResult.bFilter.Filter;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Filter.CssClass = {
        ROOT: 'b-filter',
        HEADER: 'b-filter__header',
        FILTERS: 'b-filter__filters',
        SHOW_HIDDEN_FILTERS_BUTTON: 'b-filter__show-button',
        SHOW_FILTERS_BUTTON: 'b-filter__show-filters-button',
        SHOW_FILTERS_ICON: 'b-filter__show-filters-icon',
        ICON_ARROW_DOWN: 'b-icon_img_filter-arrow-down',
        ICON_ARROW_UP: 'b-icon_img_filter-arrow-up',
        FILTER_SECTION: 'b-filter__section',
        FILTER_RESET: 'b-filter__reset',
        INPUT_CLASSES: 'b-filter__input',
        INPUT_CLASSES_ORDINARY: 'b-filter__input-ordinary',
        HIDDEN: cl.iUtils.Utils.CssClass.HIDDEN
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Filter.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bFilter.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Filter.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.filtersElement_ = goog.dom.getElementByClass(
            Filter.CssClass.FILTERS,
            element
        );

        this.showFiltersIconElement_ = goog.dom.getElementByClass(
            Filter.CssClass.SHOW_FILTERS_ICON,
            element
        );

        this.showFiltersButtonElement_ = goog.dom.getElementByClass(
            Filter.CssClass.SHOW_FILTERS_BUTTON,
            element
        );

        this.showHiddenFiltersButtonElement_ = goog.dom.getElementByClass(
            Filter.CssClass.SHOW_HIDDEN_FILTERS_BUTTON,
            element
        );

        this.filterSectionElements_ = goog.dom.getElementsByClass(
            Filter.CssClass.FILTER_SECTION,
            element
        );

        this.filterResetElement_ = goog.dom.getElementByClass(
            Filter.CssClass.FILTER_RESET,
            element
        );

        this.inputClassesElements_ = goog.dom.getElementsByClass(
            Filter.CssClass.INPUT_CLASSES,
            element
        );

        this.inputClassesOrdinaryElement_ = goog.dom.getElementByClass(
            Filter.CssClass.INPUT_CLASSES_ORDINARY,
            element
        );
    };

    /**
     * @override
     */
    Filter.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        if (this.showHiddenFiltersButtonElement_) {
            handler.listen(
                this.showHiddenFiltersButtonElement_,
                goog.events.EventType.CLICK,
                this.showHiddenFilters_
            );
        }

        if (this.showFiltersButtonElement_) {
            var header = this.getElementByClass(Filter.CssClass.HEADER);
            handler.listen(
                header,
                goog.events.EventType.CLICK,
                this.toggleFiltersVisibility_
            );
        }

        if (this.filterResetElement_) {
            handler.listen(
                this.filterResetElement_,
                goog.events.EventType.CLICK,
                this.resetFilter_
            );
        }

        if (this.inputClassesOrdinaryElement_) {
            handler.listen(
                this.inputClassesOrdinaryElement_,
                goog.events.EventType.CLICK,
                this.showResetButton_
            );
        }

        if (this.inputClassesElements_.length > 0) {
            for (var i = 0; i < this.inputClassesElements_.length; i++) {
                handler.listen(
                    this.inputClassesElements_[i],
                    goog.events.EventType.CHANGE,
                    this.showResetButton_
                );
            }
        }
    };

    /**
     * Show hidden filters
     * @private
     */
    Filter.prototype.showHiddenFilters_ = function() {
        for (var i = 0; i < this.filterSectionElements_.length; i++) {
            goog.dom.classlist.remove(
                this.filterSectionElements_[i],
                Filter.CssClass.HIDDEN
            );
        }

        goog.dom.classlist.add(
            this.showHiddenFiltersButtonElement_,
            Filter.CssClass.HIDDEN
        );
    };

    /**
     * Checks for checked radio
     * @return {boolean}
     * @private
     */
    Filter.prototype.hasCheckedInputClasses_ = function() {
        var result = false;

        for (var i = 0; i < this.inputClassesElements_.length; i++) {
            if (this.inputClassesElements_[i].checked) {
                result = true;
            }
        }

        return result;
    };

    /**
     * Show reset button
     * @param {Object} event
     * @private
     */
    Filter.prototype.showResetButton_ = function(event) {
        if (this.filterResetElement_) {
            if (event.currentTarget.checked || this.hasCheckedInputClasses_()) {
                goog.dom.classlist.remove(
                    this.filterResetElement_,
                    Filter.CssClass.HIDDEN
                );
            } else {
                goog.dom.classlist.add(
                    this.filterResetElement_,
                    Filter.CssClass.HIDDEN
                );
            }
        }
    };

    /**
     * Reset filter
     * @private
     */
    Filter.prototype.toggleFiltersVisibility_ = function() {
        goog.dom.classlist.toggle(
            this.filtersElement_,
            Filter.CssClass.HIDDEN
        );

        goog.dom.classlist.toggle(
            this.showFiltersIconElement_,
            Filter.CssClass.ICON_ARROW_UP
        );

        goog.dom.classlist.toggle(
            this.showFiltersIconElement_,
            Filter.CssClass.ICON_ARROW_DOWN
        );
    };

    /**
     * Reset filter
     * @private
     */
    Filter.prototype.resetFilter_ = function() {
        if (this.inputClassesElements_.length > 0) {
            for (var i = 0; i < this.inputClassesElements_.length; i++) {
                this.inputClassesElements_[i].checked = false;
            }
        }
        if (this.inputClassesOrdinaryElement_) {
            this.inputClassesOrdinaryElement_.checked = false;
        }

        if (this.filterResetElement_) {
            goog.dom.classlist.add(
                this.filterResetElement_,
                Filter.CssClass.HIDDEN
            );
        }
    };
});
