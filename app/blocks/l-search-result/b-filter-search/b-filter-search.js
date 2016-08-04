goog.provide('sm.lSearchResult.bFilterSearch.FilterSearch');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('gorod.gSuggest.Suggest');
goog.require('gorod.iUIInstanceStorage.UIInstanceStorage');
goog.require('sm.bSearch.Search');
goog.require('sm.lSearchResult.bFilter.Filter');
goog.require('sm.lSearchResult.bFilter.FilterLabels');
goog.require('sm.lSearchResult.bFilterSearch.View');



/**
 * FilterSearch
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSearchResult.bFilterSearch.FilterSearch = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


    /**
     * Instance suggest
     * @type {gorod.gSuggest.Suggest}
     * @private
     */
    this.suggest_ = null;


    /**
     * Instance filter
     * @type {sm.lSearchResult.bFilter.Filter}
     * @private
     */
    this.filter_ = null;


    /**
     * Instance selected filters
     * @type {sm.lSearchResult.bFilter.FilterLabels}
     * @private
     */
    this.selected_ = null;


    /**
     * Instance button
     * @type {cl.gButton.Button}
     * @private
     */
    this.button_ = null;


    /**
     * Number symbols to start search
     * @type {number}
     * @private
     */
    this.numberSymbolsToStartSearch_ =
        sm.lSearchResult.bFilterSearch.FilterSearch.numberSymbolsToStartSearch;
};
goog.inherits(sm.lSearchResult.bFilterSearch.FilterSearch, cl.iControl.Control);


goog.scope(function() {
    var FilterSearch = sm.lSearchResult.bFilterSearch.FilterSearch,
        UIInstanceStorage = gorod.iUIInstanceStorage.UIInstanceStorage,
        Suggest = gorod.gSuggest.Suggest,
        Filter = sm.lSearchResult.bFilter.Filter,
        FilterLabels = sm.lSearchResult.bFilter.FilterLabels;

    var factoryManager = cl.iFactory.FactoryManager.getInstance();


    /**
     * Event enum
     * @enum {String}
     */
    FilterSearch.Event = {
        BUTTON_CLICK: 'button-click'
    };


    /**
     * Number symbols to start search
     * @const {number}
     */
    FilterSearch.numberSymbolsToStartSearch = 3;


    /**
     * @override
     * @param {Element} element
     */
    FilterSearch.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSuggest_();
        this.initFilter_();
        this.initSelected_();
        this.initButton_();
    };


     /**
     * @override
     */
    FilterSearch.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initSuggestListeners_();
        this.initFilterListeners_();
        this.initSelectedListeners_();
        this.initButtonListeners_();
    };


    /**
     * Clean up the Component.
     */
    FilterSearch.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        this.destroySuggestListeners_();
    };


    /**
     * Clean up the Component.
     */
    FilterSearch.prototype.disposeInternal = function() {
        this.destroySuggest_();

        goog.base(this, 'disposeInternal');
    };


    /**
     * Check Filter Item Handler
     * @param {Object} event
     * @private
     */
    FilterSearch.prototype.onFilterItemCheck_ = function(event) {
        this.selected_.addItem(event.data);
    };


    /**
     * Uncheck Filter Item Handler
     * @param {Object} event
     * @private
     */
    FilterSearch.prototype.onFilterItemUncheck_ = function(event) {
        this.selected_.removeItem(event.data);
    };


    /**
     * Uncheck Selected Item Handler
     * @param {Object} event
     * @private
     */
    FilterSearch.prototype.onSelectedItemUncheck_ = function(event) {
        this.filter_.uncheckItem(event.data);
    };


    /**
     * Button handler
     * @private
     */
    FilterSearch.prototype.onButtonClick_ = function() {
        this.dispatchEvent({
            type: FilterSearch.Event.BUTTON_CLICK,
            data: {
                filters: this.selected_.getSelectedData()
            }
        });
    };


    /**
     * Handler Search data
     * @param {Object} event
     * @param {{
     *     searchString: ?string,
     *     result: Array<{
     *         label: ?string,
     *         value: string
     *     }>
     * }} data
     * @private
     */
    FilterSearch.prototype.onSearch_ = function(event, data) {
        var filters = JSON.parse(data.result);

        if (filters.length) {
            this.updateFilterItems_(filters);
            this.filter_.setHeaderVisibility(false);

            this.showFilter_();
        }
        else {
            this.showPlaceholder_();
        }
    };


    /**
     * Change Search Text Handler
     * @param {Object} event
     * @param {{
     *     text: string
     * }} data
     * @private
     */
    FilterSearch.prototype.onChangeSearchText_ = function(event, data) {
        var numberSymbols = FilterSearch.numberSymbolsToStartSearch;

        if (data.text.length <= (numberSymbols - 1)) {
            var popular = this.filter_.getAllFiltersData();

            this.updateFilterItems_(popular);
            this.filter_.setHeaderVisibility(true);

            this.showFilter_();
        }
    };


    /**
     * Show filter and hide placeholder filter
     * @private
     */
    FilterSearch.prototype.showFilter_ = function() {
        this.getView().setPlaceholderVisibility(false);
        this.getView().setFilterVisibility(true);
    };


    /**
     * Show placeholder filter and hide filter
     * @private
     */
    FilterSearch.prototype.showPlaceholder_ = function() {
        this.getView().setPlaceholderVisibility(true);
        this.getView().setFilterVisibility(false);
    };


    /**
     * update filter
     * @param {Array<{
     *     label: ?string,
     *     value: string
     * }>} data
     * @private
     */
    FilterSearch.prototype.updateFilterItems_ = function(data) {
        var selected = this.selected_.getSelectedData(),
            filters = this.filter_.setSelected(data, selected);

        this.filter_.updateListFilters(filters);
    };


    /**
     * Init Suggest Listeners
     * @private
     */
    FilterSearch.prototype.initSuggestListeners_ = function() {
        this.suggest_.addEventListener(
            Suggest.Events.SEARCH,
            this.onSearch_.bind(this)
        );

        this.suggest_.addEventListener(
            Suggest.Events.TEXT_CHANGE,
            this.onChangeSearchText_.bind(this)
        );
    };


    /**
     * Init Filter Listeners
     * @private
     */
    FilterSearch.prototype.initFilterListeners_ = function() {
        this.getHandler().listen(
            this.filter_,
            Filter.Event.CHECKED_ITEM,
            this.onFilterItemCheck_
        );

        this.getHandler().listen(
            this.filter_,
            Filter.Event.UNCHECKED_ITEM,
            this.onFilterItemUncheck_
        );
    };


    /**
     * Init Selected Filters Listeners
     * @private
     */
    FilterSearch.prototype.initSelectedListeners_ = function() {
        this.getHandler().listen(
            this.selected_,
            FilterLabels.Event.UNCHECKED_ITEM,
            this.onSelectedItemUncheck_
        );
    };


    /**
     * Init Button Listeners
     * @private
     */
    FilterSearch.prototype.initButtonListeners_ = function() {
        this.getHandler().listen(
            this.button_,
            cl.gButton.Button.Event.CLICK,
            this.onButtonClick_
        );
    };


    /**
     * Destroy Suggest Listeners
     * @private
     */
    FilterSearch.prototype.destroySuggestListeners_ = function() {
        this.suggest_.removeEventListener(
            Suggest.Events.SEARCH,
            this.onSearch_.bind(this)
        );

        this.suggest_.removeEventListener(
            Suggest.Events.TEXT_CHANGE,
            this.onChangeSearchText_.bind(this)
        );
    };


    /**
     * Initialize suggest
     * @private
     */
    FilterSearch.prototype.initSuggest_ = function() {

        var input = new gorod.bInput.Input(
            this.getView().getDom().suggestInput
        );

        var list = new gorod.bList.List(
            this.getView().getDom().suggestList
        );
        list.init();

        this.suggest_ = new Suggest(
            this.getView().getDom().suggest
        );
        this.suggest_.init();
    };


    /**
     * Initialize filter
     * @private
     */
    FilterSearch.prototype.initFilter_ = function() {
        this.filter_ = new Filter();
        this.addChild(this.filter_);
        this.filter_.decorate(this.getView().getDom().filter);
    };


    /**
     * Initialize selected filters
     * @private
     */
    FilterSearch.prototype.initSelected_ = function() {
        this.selected_ = new FilterLabels();
        this.addChild(this.selected_);
        this.selected_.decorate(this.getView().getDom().selected);
    };


    /**
     * Initialize button
     * @private
     */
    FilterSearch.prototype.initButton_ = function() {
        this.button_ = factoryManager.decorate(
            this.getView().getStylization(),
            'button',
            this.getView().getDom().button,
            this
        );
    };


    /**
     * Destroy Suggest
     * @private
     */
    FilterSearch.prototype.destroySuggest_ = function() {
        UIInstanceStorage.getInstance().removeInstance(
            this.getView().getDom().suggest
        );

        UIInstanceStorage.getInstance().removeInstance(
            this.getView().getDom().suggestInput
        );

        UIInstanceStorage.getInstance().removeInstance(
            this.getView().getDom().suggestList
        );
    };
});  // goog.scope
