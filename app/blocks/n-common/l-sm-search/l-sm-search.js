/**
 * @fileoverview Page with filters and results of search
 */
goog.provide('sm.lSmSearch.SmSearch');

goog.require('cl.iRequest.Request');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lSmSearch.View');
goog.require('sm.lSmSearch.iSearchService.SearchService');


goog.scope(function() {
    var Request = cl.iRequest.Request;
    var SearchService = sm.lSmSearch.iSearchService.SearchService;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lSmSearch.SmSearch = function(view, opt_domHelper) {
        sm.lSmSearch.SmSearch.base(this, 'constructor', view, opt_domHelper);

        /**
         * Sort control
         * @type {sm.gDropdown.DropdownSelect}
         * @private
         */
        this.sort_ = null;


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
         * Search service instance
         * @type {sm.lSmSearch.iSearchService.SearchService}
         */
        this.searchService = null;
    };
    goog.inherits(sm.lSmSearch.SmSearch, sm.iLayout.LayoutStendhal);
    var Search = sm.lSmSearch.SmSearch;


    /**
     * @param {Element} element
     * @override
     */
    Search.prototype.decorateInternal = function(element) {
        Search.base(this, 'decorateInternal', element);

        this.sort_ = this.decorateChild(
            'dropdown-select',
            this.getView().getDom().sort
        );

        this.resultsList_ = this.decorateChild(
            'smItemList',
            this.getView().getDom().resultsList
        );

        this.filterPanel_ = this.decorateChild(
            'lSearch-filterPanel',
            this.getView().getDom().filterPanel
        );
    };


    /**
     * Init data loading services
     * @return {sm.lSmSearch.SmSearch}
     */
    Search.prototype.initServices = function() {
        /** IRequest init **/
        Request.getInstance().init(window.location.pathname);

        /** Search searvice init **/
        this.searchService = new SearchService();
        this.searchService.init(this.params.type);

        return this;
    };
});  // goog.scope


/**
 * creates sm.lSmSearch.SmSearch instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lSmSearch.View.CssClass.ROOT
    );

    var view = new sm.lSmSearch.View(null, null, 'stendhal');
    var instance = new sm.lSmSearch.SmSearch(view);

    instance.decorate(domElement);
});
