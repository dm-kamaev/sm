goog.provide('sm.lSearchResult.bFilter.Filter');

goog.require('cl.iUtils.Utils');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.object');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.iAnalytics.Analytics');



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
     * Type filter
     * @type {Element}
     * @protected
     */
    this.type = null;


    /**
     * Filter name
     * @type {string}
     * @protected
     */
    this.filterName = null;


    /**
     * full Data Filter List
     * @type {Object}
     * @protected
     */
    this.allFiltersData = {};


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
     * Header (Dom elements)
     * @type {Element}
     * @private
     */
    this.header_ = null;
};
goog.inherits(sm.lSearchResult.bFilter.Filter, goog.ui.Component);

goog.scope(function() {
    var Filter = sm.lSearchResult.bFilter.Filter,
        Analytics = sm.iAnalytics.Analytics;


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
        this.initFilterComponents_(element);
        this.initButtons(element);

        this.setParams_();
        this.setAllFiltersData();
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
     * update content (inputs and labels)
     * @param {Array<{
     *     value: string,
     *     label: string,
     *     isChecked: bool
     * }>} filters
     */
    Filter.prototype.updateListFilters = function(filters) {
        goog.soy.renderElement(
            this.wrapperListFilters,
            sm.lSearchResult.bFilter.Template.listFilters, {
                params: {
                    data: {
                        name: this.filterName,
                        filters: filters
                    },
                    config: {
                        type: this.type
                    }
                }
            }
        );

        this.initFilterItems();
        this.initFilterItemsListeners();
    };


    /**
     * adds or deletes class to show header
     * @param {bool} visible
     */
    Filter.prototype.setHeaderVisibility = function(visible) {
        var isContains = goog.dom.classlist.contains(
            this.header_,
            Filter.CssClass.HIDDEN
        );

        if (visible && isContains) {
            goog.dom.classlist.remove(
                this.header_,
                Filter.CssClass.HIDDEN
            );
        }
        else if (!visible && !isContains) {
            goog.dom.classlist.add(
                this.header_,
                Filter.CssClass.HIDDEN
            );
        }
    };


    /**
     * In first array is set to isChecked true
     * according to the value of the second array
     * @param {Array<{
     *     value: string,
     *     label: string,
     *     name: string,
     *     isChecked: bool
     * }>} filters
     * @param {Array<{Object}>} selectedFilters like filters
     * @return {Array<{Object}>} like filters
     */
    Filter.prototype.setSelected = function(filters, selectedFilters) {
        return filters.map(function(item) {
            var itemClone = goog.object.clone(item);

            itemClone.isChecked = selectedFilters.some(function(selected) {
                return itemClone.value == selected.value;
            });

            return itemClone;
        });
    };


    /**
     * Get default filters data
     * @return {Array<{
     *     label: string,
     *     value: string
     * }>}
     */
    Filter.prototype.getAllFiltersData = function() {
        return this.allFiltersData;
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

        if (item) {
            item.checked = false;
        }
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
     * Find an input
     * @param {string} value
     * @return {Element}
     * @protected
     */
    Filter.prototype.findInput = function(value) {
        return goog.array.find(this.inputElements, function(input) {
            return input.value == value;
        });
    };


    /**
     * Get filter section
     * @param {Element} childNodeFilterSection
     * @return {Element} filter section
     * @protected
     */
    Filter.prototype.getFilterSection = function(childNodeFilterSection) {
        return goog.dom.getAncestorByClass(
            childNodeFilterSection,
            Filter.CssClass.FILTER_SECTION
        );
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
     * set default filters data
     * @protected
     */
    Filter.prototype.setAllFiltersData = function() {
        this.allFiltersData = this.getFiltersData();
    };


    /**
     * Handler change item
     * @param {Object} event
     * @protected
     */
    Filter.prototype.onChangeItem = function(event) {
        var isChecked = this.isCheckedInput(event.target);

        var filterSection = this.getFilterSection(event.target);
        var params = this.getDataParams(filterSection);

        this.dispatchEventChangeItem_(isChecked, params);
        this.sendAnalyticsItemData_(isChecked, params.label);
    };


    /**
     * Handler change the filter
     * @param {goog.events.Event} event
     * @protected
     */
    Filter.prototype.onChangeFilter = function(event) {
        this.dispatchChangedFilterEvent();
    };


    /**
     * dispatch Changed Filter Event
     * @protected
     */
    Filter.prototype.dispatchChangedFilterEvent = function() {
        var type = this.isCheckedInputs() ? Filter.Event.CHECKED_FILTER :
            Filter.Event.UNCHECKED_FILTER;

        this.dispatchEvent({
            'type': type
        });
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
            handler.listen(
                this.header_,
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
     * Send label and action on click on the filter item
     * @param {bool} isAdded
     * @param {string} label
     * @private
     */
    Filter.prototype.sendAnalyticsItemData_ = function(isAdded, label) {
        var dataAnalytics = {
            'hitType': 'event',
            'eventCategory': this.filterName,
            'eventAction': isAdded ? 'add' : 'delete',
            'eventLabel': label
        };

        Analytics.getInstance().send(dataAnalytics);
    };


    /**
     * dispatch Event Change State Item
     * @param {bool} isChecked
     * @param {{
     *     label: string,
     *     value: string,
     *     name: string
     * }} params
     * @private
     */
    Filter.prototype.dispatchEventChangeItem_ = function(isChecked, params) {
        var type = isChecked ?
            Filter.Event.CHECKED_ITEM :
            Filter.Event.UNCHECKED_ITEM;

        this.dispatchEvent({
            'type': type,
            'data': params
        });
    };


    /**
     * set params
     * @private
     */
    Filter.prototype.setParams_ = function() {
        var data = JSON.parse(
            this.getElement().getAttribute('data-params')
        );
        this.filterName = data.name;
        this.type = data.type;
    };


    /**
     * Init Filter Components
     * @param {Element} element
     * @private
     */
    Filter.prototype.initFilterComponents_ = function(element) {
        this.header_ = this.getElementByClass(
            Filter.CssClass.HEADER,
            element
        );
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
