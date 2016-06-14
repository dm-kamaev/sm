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
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};



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
     * Button for the call modal
     * @type {Element}
     * @private
     */
    this.showModalButtonElement_ = null;


    /**
     * Filters element
     * @type {Element}
     * @private
     */
    this.filterSectionElements_ = null;


    /**
     * Classes input
     * @type {Element}
     * @protected
     */
    this.inputElements = null;


    /**
     * Dom Hidable elements
     * @type {Array<Element>}
     * @private
     */
    this.filterSectionHidableElements_ = [];


    /**
     * Filter name
     * @type {string}
     * @private
     */
    this.filterName_ = null;
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
        SHOW_MODAL_BUTTON: 'b-filter__button_show-modal',
        SHOW_HIDDEN_FILTERS_BUTTON: 'b-filter__button_show',
        HIDE_SHOWN_FILTERS_BUTTON: 'b-filter__button_hide',
        SHOW_FILTERS_BUTTON: 'b-filter__show-filters-button',
        SHOW_FILTERS_ICON: 'b-filter__show-filters-icon',
        ICON_ARROW_DOWN: 'g-icon_img_filter-arrow-down',
        ICON_ARROW_UP: 'g-icon_img_filter-arrow-up',
        FILTER_SECTION: 'b-filter__section',
        FILTER_SECTION_HIDABLE: 'b-filter__section_hidable',
        INPUT: 'b-filter__input',
        HIDDEN: cl.iUtils.Utils.CssClass.HIDDEN
    };


    /**
     * Event enum
     * @enum {string}
     */
    Filter.Event = {
        CHECKED_FILTER: 'checked-filter',
        UNCHECKED_FILTER: 'unchecked-filter',
        SHOW_SEARCH_FILTER_CLICK: 'show-search-filter-click'
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

        this.showModalButtonElement_ = goog.dom.getElementByClass(
            Filter.CssClass.SHOW_MODAL_BUTTON,
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

        this.hideShownFiltersButtonElement_ = goog.dom.getElementByClass(
            Filter.CssClass.HIDE_SHOWN_FILTERS_BUTTON,
            element
        );

        this.filterSectionElements_ = goog.dom.getElementsByClass(
            Filter.CssClass.FILTER_SECTION,
            element
        );

        for (var i = 0, elem; elem = this.filterSectionElements_[i]; i++) {
            var isHidable = goog.dom.classes.has(
                elem,
                Filter.CssClass.FILTER_SECTION_HIDABLE
            );
            if (isHidable) {
                this.filterSectionHidableElements_.push(elem);
            }
        }

        this.inputElements = goog.dom.getElementsByClass(
            Filter.CssClass.INPUT,
            element
        );

        this.getFilterName_();
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

        if (this.hideShownFiltersButtonElement_) {
            handler.listen(
                this.hideShownFiltersButtonElement_,
                goog.events.EventType.CLICK,
                this.hideShownFilters_
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

        if (this.showModalButtonElement_) {
            handler.listen(
                this.showModalButtonElement_,
                goog.events.EventType.CLICK,
                this.onShowModalButtonClick_
            );
        }

        for (var i = 0; i < this.inputElements.length; i++) {
            handler.listen(
                this.inputElements[i],
                goog.events.EventType.CLICK,
                this.onChangeFilterItem
            );
        }
    };


    /**
     * Reset filter
     * @protected
     */
    Filter.prototype.reset = function() {
        for (var i = 0; i < this.inputElements.length; i++) {
            this.inputElements[i].checked = false;
        }
    };


    /**
     * Checks for checked radio
     * @return {boolean}
     * @protected
     */
    Filter.prototype.isCheckedInput = function() {
        var result = false;

        for (var i = 0; i < this.inputElements.length; i++) {
            if (this.inputElements[i].checked) {
                result = true;
            }
        }
        return result;
    };


    /**
     * Handler button for show modal
     * @private
     */
    Filter.prototype.onShowModalButtonClick_ = function() {
        this.dispatchEvent({
            type: Filter.Event.SHOW_SEARCH_FILTER_CLICK,
            data: {
                name: this.filterName_
            }
        });
    };


    /**
     * Handler change the filter
     * @protected
     */
    Filter.prototype.onChangeFilterItem = function() {
        var type = this.isCheckedInput() ? Filter.Event.CHECKED_FILTER :
            Filter.Event.UNCHECKED_FILTER;

        this.dispatchEvent({
            'type': type
        });
    };


    /**
     * Hide filter
     * @private
     */
    Filter.prototype.hideFilter_ = function() {
        goog.dom.classlist.add(
            this.filtersElement_,
            Filter.CssClass.HIDDEN
        );

        goog.dom.classlist.remove(
            this.showFiltersIconElement_,
            Filter.CssClass.ICON_ARROW_UP
        );

        goog.dom.classlist.add(
            this.showFiltersIconElement_,
            Filter.CssClass.ICON_ARROW_DOWN
        );
    };


    /**
     * Show hidden filters
     * @private
     */
    Filter.prototype.showHiddenFilters_ = function() {
        for (var i = 0; i < this.filterSectionHidableElements_.length; i++) {
            goog.dom.classlist.remove(
                this.filterSectionHidableElements_[i],
                Filter.CssClass.HIDDEN
            );
        }

        goog.dom.classlist.add(
            this.showHiddenFiltersButtonElement_,
            Filter.CssClass.HIDDEN
        );
        goog.dom.classlist.remove(
            this.hideShownFiltersButtonElement_,
            Filter.CssClass.HIDDEN
        );
    };


    /**
     * Hide shown filters
     * @private
     */
    Filter.prototype.hideShownFilters_ = function() {
        for (var i = 0; i < this.filterSectionHidableElements_.length; i++) {
            goog.dom.classlist.add(
                this.filterSectionHidableElements_[i],
                Filter.CssClass.HIDDEN
            );
        }

        goog.dom.classlist.add(
            this.hideShownFiltersButtonElement_,
            Filter.CssClass.HIDDEN
        );
        goog.dom.classlist.remove(
            this.showHiddenFiltersButtonElement_,
            Filter.CssClass.HIDDEN
        );
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
     * Get filter name
     * @private
     */
    Filter.prototype.getFilterName_ = function() {
        var data = JSON.parse(
            this.getElement().getAttribute('data-params')
        );
        this.filterName_ = data.name;
    };
});  // goog.scope
