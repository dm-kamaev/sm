/**
 * @fileoverview Page with filters and results of search
 */
goog.provide('sm.lSearch.Search');


goog.require('cl.iRequest.Request');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lSearch.View');
goog.require('sm.lSearch.iSearchService.SearchService');


goog.scope(function() {
    var Request = cl.iRequest.Request;
    var SearchService = sm.lSearch.iSearchService.SearchService;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lSearch.Search = function(view, opt_domHelper) {
        sm.lSearch.Search.base(this, 'constructor', view, opt_domHelper);

        /**
         * @type {sm.lSearch.Search.Params}
         * @protected
         */
        this.params = null;


        /**
         * Sort control
         * @type {sm.gDropdown.DropdownSelect}
         * @private
         */
        this.sort_ = null;


        /**
         * Search Instance
         * @type {sm.bSearch.Search}
         * @private
         */
        this.search_ = null;


        /**
         * Filters Instance
         * @type {sm.lSearch.bFilterPanel.FilterPanel}
         * @private
         */
        this.filterPanel_ = null;


        /**
         * List Instance
         * @type {sm.bSmItemList.SmItemList}
         * @private
         */
        this.resultsList_ = null;


        /**
         * Map instance
         * @type {sm.bSmMap.SmMap}
         * @private
         */


        /**
        this.map_ = null;
         * @type {sm.lSearch.iSearchService.SearchService}
         * Search service instance
         */
        this.searchService = null;
    };
    goog.inherits(sm.lSearch.Search, sm.iLayout.LayoutStendhal);
    var Search = sm.lSearch.Search;


    /**
     * @typedef {sm.lSearch.View.Params}
     */
    Search.Params;


    /**
     * @param {Element} element
     * @override
     */
    Search.prototype.decorateInternal = function(element) {
        Search.base(this, 'decorateInternal', element);

        this.initServices_();
        this.initLeftMenuInstances_();
        this.initResultsListInstances_();
        this.initMap_();
    };


    /**
     * @override
     * @protected
     */
    Search.prototype.enterDocument = function() {
        Search.base(this, 'enterDocument');

        this.initSearchListeners_();
        this.initFilterPanelListeners_();
    };


    /**
     * Init data loading services
     * @return {sm.lSearch.SmSearch}
     * @private
     */
    Search.prototype.initServices_ = function() {
        /** IRequest init **/
        Request.getInstance().init(window.location.pathname);

        /** Search service init **/
        this.searchService = new SearchService();
        this.searchService.init(this.params.type);

        return this;
    };


    /**
     * Init listeners for search block in menu
     * @private
     */
    Search.prototype.initSearchListeners_ = function() {
        this.getHandler().listen(
            this.search_,
            sm.bSearch.Search.Event.SUBMIT,
            this.onSearchSubmit_
        ).listen(
            this.search_,
            sm.bSearch.Search.Event.ITEM_SELECT,
            this.onSearchSubmit_
        );
    };


    /**
     * Init listeners for filter panel
     * @private
     */
    Search.prototype.initFilterPanelListeners_ = function() {
        this.getHandler().listen(
            this.filterPanel_,
            sm.lSearch.bFilterPanel.FilterPanel.Event.SUBMIT,
            this.onFilterPanelSubmit_
        );
    };


    /**
     * Search submit handler
     * @private
     */
    Search.prototype.onSearchSubmit_ = function() {
        console.log(this.filterPanel_.getData());
        console.log('submit');
    };


    /**
     * Filter panel submit handler
     * @private
     */
    Search.prototype.onFilterPanelSubmit_ = function() {
        console.log(this.filterPanel_.getData());
    };


    /**
     * Init left menu instances
     * @private
     */
    Search.prototype.initLeftMenuInstances_ = function() {
        this.search_ = new sm.bSearch.Search();
        this.addChild(this.search_);
        this.search_.decorate(this.getView().getDom().search);

        this.filterPanel_ = this.decorateChild(
            'lSearch-filterPanel',
            this.getView().getDom().filterPanel
        );
    };


    /**
     * Init results list and sort instances
     * @private
     */
    Search.prototype.initResultsListInstances_ = function() {
        this.sort_ = this.decorateChild(
            'dropdown-select',
            this.getView().getDom().sort
        );

        this.resultsList_ = this.decorateChild(
            'smItemList',
            this.getView().getDom().resultsList
        );
    };


    /**
     * Init map instance
     * @private
     */
    Search.prototype.initMap_ = function() {
        this.map_ = this.decorateChild(
            'smMap',
            this.getView().getDom().map
        );
    };
});  // goog.scope


/**
 * creates sm.lSearch.Search instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lSearch.View.CssClass.ROOT
    );

    var view = new sm.lSearch.View(null, null, 'stendhal');
    var instance = new sm.lSearch.Search(view);

    instance.decorate(domElement);
});
