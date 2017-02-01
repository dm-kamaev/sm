goog.provide('sm.lSearch.bSuggestFilter.SuggestFilter');

goog.require('cl.gButton.Button');
goog.require('cl.iControl.Control');
goog.require('gorod.gSuggest.Suggest');
goog.require('gorod.iUIInstanceStorage.UIInstanceStorage');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.FilterLabels');
goog.require('sm.lSearch.bSuggestFilter.Template');
goog.require('sm.lSearch.bSuggestFilter.View');



/**
 * Suggest Filter
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSearch.bSuggestFilter.SuggestFilter = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


    /**
     * Instance suggest
     * @type {gorod.gSuggest.Suggest}
     * @private
     */
    this.suggest_ = null;


    /**
     * Instance filter
     * @type {sm.lSearch.bFilter.Filter}
     * @private
     */
    this.filter_ = null;


    /**
     * Instance selected filters
     * @type {sm.lSearch.bFilter.FilterLabels}
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
        sm.lSearch.bSuggestFilter.SuggestFilter.numberSymbolsToStartSearch;
};
goog.inherits(sm.lSearch.bSuggestFilter.SuggestFilter, cl.iControl.Control);


goog.scope(function() {
    var SuggestFilter = sm.lSearch.bSuggestFilter.SuggestFilter,
        View = sm.lSearch.bSuggestFilter.View,
        UIInstanceStorage = gorod.iUIInstanceStorage.UIInstanceStorage,
        Suggest = gorod.gSuggest.Suggest;

    /**
     * Name of this element in factory
     */
    SuggestFilter.NAME = sm.lSearch.bSuggestFilter.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(SuggestFilter.NAME, {
        control: SuggestFilter,
        view: View
    });

    /**
     * Event enum
     * @enum {String}
     */
    SuggestFilter.Event = {
        BUTTON_CLICK: 'button-click'
    };


    /**
     * Number symbols to start search
     * @const {number}
     */
    SuggestFilter.numberSymbolsToStartSearch = 3;


    /**
     * @override
     * @param {Element} element
     */
    SuggestFilter.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSuggest_();
        this.initFilter_();
        this.initSelected_();
        this.initButton_();
    };


     /**
     * @override
     */
    SuggestFilter.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initSuggestListeners_();
        this.initFilterListeners_();
        this.initSelectedListeners_();
        this.initButtonListeners_();
    };


    /**
     * Clean up the Component.
     */
    SuggestFilter.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        this.destroySuggestListeners_();
    };


    /**
     * Clean up the Component.
     */
    SuggestFilter.prototype.disposeInternal = function() {
        this.destroySuggest_();

        goog.base(this, 'disposeInternal');
    };


    /**
     * Init Suggest Listeners
     * @private
     */
    SuggestFilter.prototype.initSuggestListeners_ = function() {
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
    SuggestFilter.prototype.initFilterListeners_ = function() {
        this.getHandler().listen(
            this.filter_,
            sm.lSearch.bFilter.Filter.Event.CHECK_OPTION,
            this.onFilterOptionCheck_
        );

        this.getHandler().listen(
            this.filter_,
            sm.lSearch.bFilter.Filter.Event.UNCHECK_OPTION,
            this.onFilterOptionUncheck_
        );
    };


    /**
     * Init Selected Filters Listeners
     * @private
     */
    SuggestFilter.prototype.initSelectedListeners_ = function() {
        this.getHandler().listen(
            this.selected_,
            sm.lSearch.bFilter.FilterLabels.Event.UNCHECK_OPTION,
            this.onSelectedOptionUncheck_
        );
    };


    /**
     * Init Button Listeners
     * @private
     */
    SuggestFilter.prototype.initButtonListeners_ = function() {
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
    SuggestFilter.prototype.destroySuggestListeners_ = function() {
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
     * Check Filter Option Handler
     * @param {Object} event
     * @private
     */
    SuggestFilter.prototype.onFilterOptionCheck_ = function(event) {
        this.selected_.checkOption(event.data);
    };


    /**
     * Uncheck Filter Option Handler
     * @param {Object} event
     * @private
     */
    SuggestFilter.prototype.onFilterOptionUncheck_ = function(event) {
        this.selected_.uncheckOption(event.data);
    };


    /**
     * Uncheck Selected Option Handler
     * @param {Object} event
     * @private
     */
    SuggestFilter.prototype.onSelectedOptionUncheck_ = function(event) {
        this.filter_.uncheckOption(event.data);
    };


    /**
     * Button handler
     * @private
     */
    SuggestFilter.prototype.onButtonClick_ = function() {
        this.dispatchEvent({
            type: SuggestFilter.Event.BUTTON_CLICK,
            data: {
                filters: this.selected_.getCheckedData()
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
    SuggestFilter.prototype.onSearch_ = function(event, data) {
        var filters = data.result;

        if (filters.length) {
            this.updateFilterOptions_(filters);
            this.filter_.hideHeader();

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
    SuggestFilter.prototype.onChangeSearchText_ = function(event, data) {
        var numberSymbols = this.numberSymbolsToStartSearch_;

        if (data.text.length <= (numberSymbols - 1)) {
            var popular = this.filter_.getAllData();

            this.updateFilterOptions_(popular);
            this.filter_.showHeader();

            this.showFilter_();
        }
    };


    /**
     * Show filter and hide placeholder filter
     * @private
     */
    SuggestFilter.prototype.showFilter_ = function() {
        this.getView().setPlaceholderVisibility(false);
        this.getView().setFilterVisibility(true);
    };


    /**
     * Show placeholder filter and hide filter
     * @private
     */
    SuggestFilter.prototype.showPlaceholder_ = function() {
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
    SuggestFilter.prototype.updateFilterOptions_ = function(data) {
        var selected = this.selected_.getCheckedData(),
            filters = this.filter_.setChecked(data, selected);

        this.filter_.updateOptions(filters);
    };


    /**
     * Initialize suggest
     * @private
     */
    SuggestFilter.prototype.initSuggest_ = function() {

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
    SuggestFilter.prototype.initFilter_ = function() {
        this.filter_ = this.decorateChild(
            sm.lSearch.bFilter.Filter.NAME,
            this.getView().getDom().filter
        );
    };


    /**
     * Initialize filter labels
     * @private
     */
    SuggestFilter.prototype.initSelected_ = function() {
        this.selected_ = this.decorateChild(
            sm.lSearch.bFilter.FilterLabels.NAME,
            this.getView().getDom().selected
        );
    };


    /**
     * Initialize button
     * @private
     */
    SuggestFilter.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            cl.gButton.Button.NAME,
            this.getView().getDom().button
        );
    };


    /**
     * Destroy Suggest
     * @private
     */
    SuggestFilter.prototype.destroySuggest_ = function() {
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
