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
     * Instance search
     * @type {sm.bSearch.Search}
     * @private
     */
    this.search_ = null;


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
};
goog.inherits(sm.lSearchResult.bFilterSearch.FilterSearch, cl.iControl.Control);


goog.scope(function() {
    var FilterSearch = sm.lSearchResult.bFilterSearch.FilterSearch,
        View = sm.lSearchResult.bFilterSearch.View,
        UIInstanceStorage = gorod.iUIInstanceStorage.UIInstanceStorage,
        Suggest = gorod.gSuggest.Suggest,
        Search = sm.bSearch.Search,
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
     * @override
     * @param {Element} element
     */
    FilterSearch.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSearch_();
        this.initFilter_();
        this.initSelected_();
        this.initButton_();
    };


     /**
     * @override
     */
    FilterSearch.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initFilterListeners_();
        this.initSelectedListeners_();
        this.initButtonListeners_();
    };


    /**
     * Check Filter Item
     * @param {Object} event
     * @private
     */
    FilterSearch.prototype.onFilterItemCheck_ = function(event) {
        this.selected_.addItem(event.data);
    };


    /**
     * Uncheck Filter Item
     * @param {Object} event
     * @private
     */
    FilterSearch.prototype.onFilterItemUncheck_ = function(event) {
        this.selected_.removeItem(event.data);
    };


    /**
     * Uncheck Selected Item
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
     * Initialize search
     * @private
     */
    FilterSearch.prototype.initSearch_ = function() {

        var suggest = new Suggest('.' + Suggest.Css.ROOT);

        UIInstanceStorage.getInstance().addInstance(
            suggest,
            this.getView().getDom().suggest
        );

        this.search_ = new Search();
        this.addChild(this.search_);
        this.search_.decorate(this.getView().getDom().search);
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
});  // goog.scope
