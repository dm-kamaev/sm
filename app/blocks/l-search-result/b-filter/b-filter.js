goog.provide('sm.lSearchResult.bFilter.Filter');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.object');
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
     * @protected
     */
    this.filterSectionElements = null;


    /**
     * Classes input
     * @type {Element}
     * @protected
     */
    this.inputElements = null;


    /**
     * Filters element
     * @type {Element}
     * @private
     */
    this.filtersElement_ = null;


    /**
     * List of filters element
     * @type {Element}
     * @protected
     */
    this.wrapperListFilters = null;


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
     * Dom Hidable elements
     * @type {Array<Element>}
     * @private
     */
    this.filterSectionHidableElements_ = [];


    /**
     * Filter name
     * @type {string}
     * @protected
     */
    this.filterName = null;
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
        LIST_FILTERS: 'b-filter__list-filters',
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
        CHECKED_ITEM: 'checked-item',
        UNCHECKED_ITEM: 'unchecked-item'
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

        this.initFilterItems(element);
        this.initFilterContainer_(element);
        this.initButtons(element);

        this.setName_();
    };


    /**
     * @override
     */
    Filter.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initFilterItemsListeners();
        this.initButtonsListeners();
    };


    /**
     * Reset filter
     * @public
     */
    Filter.prototype.reset = function() {
        for (var i = 0; i < this.inputElements.length; i++) {
            this.inputElements[i].checked = false;
        }
    };


    /**
     * Uncheck item
     * @param {{
     *     value: string,
     *     label: string,
     *     name: string,
     *     id: string
     * }} params
     * @public
     */
    Filter.prototype.uncheckItem = function(params) {
        var item = this.findInput(params.value);
        item.checked = false;
    };


    /**
     * Get data selected filters
     * @return {Array<{
     *     value: string,
     *     label: string,
     *     name: string,
     *     isChecked: bool
     * }>}
     * @public
     */
    Filter.prototype.getSelectedData = function() {
        return this.getFiltersData().filter(function(item) {
            return item.isChecked;
        });
    };


    /**
     * Checks for checked radio all inputs
     * @return {boolean}
     * @protected
     */
    Filter.prototype.isCheckedInputs = function() {
        var result = false;

        for (var i = 0; i < this.inputElements.length; i++) {
            if (this.inputElements[i].checked) {
                result = true;
            }
        }
        return result;
    };


    /**
     * Checks for checked radio input
     * @param {Element} input
     * @return {boolean}
     * @protected
     */
    Filter.prototype.isCheckedInput = function(input) {
        return input.checked ? true : false;
    };


    /**
     * Handler change item
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onChangeItem = function(event) {
        var type = this.isCheckedInput(event.target) ?
            Filter.Event.CHECKED_ITEM :
            Filter.Event.UNCHECKED_ITEM;

        var filterSection = goog.dom.getAncestorByClass(
            event.target,
            Filter.CssClass.FILTER_SECTION
        );

        this.dispatchEvent({
            'type': type,
            'data': this.getDataParams(filterSection)
        });
    };


    /**
     * Handler change the filter
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onChangeFilter = function(event) {
        var type = this.isCheckedInputs() ? Filter.Event.CHECKED_FILTER :
            Filter.Event.UNCHECKED_FILTER;

        this.dispatchEvent({
            'type': type
        });
    };


    /**
     * Get data params
     * @param {Element} element
     * @return {Object}
     * @protected
     */
    Filter.prototype.getDataParams = function(element) {
        return JSON.parse(
            element.getAttribute('data-params')
        );
    };


    /**
     * Find an input
     * @param {string} value
     * @return {Element}
     * @protected
     */
    Filter.prototype.findInput = function(value) {
        var inputs = Array.prototype.slice.call(this.inputElements, 0);

        return inputs.find(function(input) {
            return input.value == value;
        });
    };


    /**
     * Get data filters
     * @return {Array<{
     *     value: string,
     *     label: string,
     *     name: string
     * }>}
     * @protected
     */
    Filter.prototype.getFiltersData = function() {
        var elems = Array.prototype.slice.call(this.filterSectionElements, 0);

        return elems.map(function(elem) {
            var item = this.getDataParams(elem);

            var input = this.findInput(item.value);
            item.isChecked = this.isCheckedInput(input);

            return item;

        }, this);
    };


    /**
     * Init Filter Items
     * @param {Element=} opt_element
     * @protected
     */
    Filter.prototype.initFilterItems = function(opt_element) {
        var element = opt_element || this.getElement();

        this.filterSectionElements = goog.dom.getElementsByClass(
            Filter.CssClass.FILTER_SECTION,
            element
        );

        this.filterSectionHidableElements_ = [];

        for (var i = 0, elem; elem = this.filterSectionElements[i]; i++) {
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
    };


    /**
     * Init Filter Items Listeners
     * @protected
     */
    Filter.prototype.initFilterItemsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.inputElements.length; i++) {
            handler.listen(
                this.inputElements[i],
                goog.events.EventType.CLICK,
                this.onChangeFilter
            );

            handler.listen(
                this.inputElements[i],
                goog.events.EventType.CLICK,
                this.onChangeItem
            );
        }
    };


    /**
     * Init Buttons
     * @param {Element} element
     * @protected
     */
    Filter.prototype.initButtons = function(element) {
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

        this.hideShownFiltersButtonElement_ = goog.dom.getElementByClass(
            Filter.CssClass.HIDE_SHOWN_FILTERS_BUTTON,
            element
        );
    };


    /**
     * Init Buttons Listeners
     * @protected
     */
    Filter.prototype.initButtonsListeners = function() {
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
     * set filter name
     * @private
     */
    Filter.prototype.setName_ = function() {
        var data = JSON.parse(
            this.getElement().getAttribute('data-params')
        );
        this.filterName = data.name;
    };


    /**
     * Init Filter Container
     * @param {Element} element
     * @private
     */
    Filter.prototype.initFilterContainer_ = function(element) {
        this.filtersElement_ = goog.dom.getElementByClass(
            Filter.CssClass.FILTERS,
            element
        );

        this.wrapperListFilters = goog.dom.getElementByClass(
            Filter.CssClass.LIST_FILTERS,
            element
        );
    };
});  // goog.scope
