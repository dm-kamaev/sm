goog.provide('sm.lSearchResult.bFilterSearch.FilterSearch');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('gorod.gSuggest.Suggest');
goog.require('gorod.iUIInstanceStorage.UIInstanceStorage');
goog.require('sm.bSearch.Search');
goog.require('sm.lSearchResult.bFilter.Filter');
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
        Filter = sm.lSearchResult.bFilter.Filter;

    var factoryManager = cl.iFactory.FactoryManager.getInstance();


    /**
     * @override
     */
    FilterSearch.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bFilterSearch.Template.filterSearch, {
                params: this.params
            }
        );
    };


    /**
     * @override
     * @param {Element} element
     */
    FilterSearch.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSearch_();
        this.initFilter_();
        this.initButton_();
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
