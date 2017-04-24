/**
 * @fileoverview Search page with filters and results of search for
 * universities module
 */
goog.module('sm.lSearch.SearchUniversity');


const Search = goog.require('sm.lSearch.Search');
const View = goog.require('sm.lSearch.ViewUniversity');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const Template = goog.require('sm.lSearch.Template');
const ILayout = goog.require('sm.iLayout.LayoutStendhal');
const FilterPanelGroup = goog.require('sm.bFilterPanelGroup.FilterPanelGroup');


/**
 * Search params names, which exclude when built url
 * @const {Array<string>}
 */
const URL_PARAMS_TO_EXCLUDE = ['page'];




/**
 * Search University page control
 * @class SearchUniversity
 * @extends {Search}
 */
class SearchUniversity extends Search {



    /**
     * @param {Object} view
     * @param {Object=} opt_domHelper
     */
    constructor(view, opt_domHelper) {
        super(view, opt_domHelper);

        /**
         * @type {sm.lSearch.SearchUniversity.Params}
         * @protected
         */
        this.params = null;


        /**
         * Subheader instance
         * @type {sm.bSmSubheader.SmSubheader}
         * @protected
         */
        this.subheader = null;


        /**
         * Filters Instance
         * @type {sm.bFilterPanelGroup.FilterPanelGroup}
         * @protected
         */
        this.filterPanelGroup = null;


        /**
         * List Instance
         * @type {sm.lSearch.bSearchResults.SearchResults}
         * @protected
         */
        this.searchResults = null;


        /**
         * Search service instance
         * @type {sm.lSearch.iSearchService.SearchService}
         * @protected
         */
        this.searchService = null;


        /**
         * Search parameters manager
         * @type {sm.iSearchParamsManager.SearchParamsManager}
         * @protected
         */
        this.paramsManager = null;


        /**
         * Url updater
         * @type {sm.lSearch.iUrlUpdater.UrlUpdater}
         * @protected
         */
        this.urlUpdater = null;


        /**
         * Instances analytics sender
         * @type {sm.lSearch.iAnalyticsSender.AnalyticsSender}
         * @private
         */
        this.analyticsSender = null;

        /**
         * Instances filter strip
         * @type {sm.bFilterStrip.FilterStrip}
         * @private
         */
        this.filterStrip = null;
    }

    /**
     * Name of this element in factory
     * @const {string}
     */
    static get NAME() {
        return Template.NAME();
    }


    /**
     * Entity type
     * @const {Object<string>}
     */
    static get EntityType() {
        return {
            SCHOOL: 'school',
            COURSE: 'course',
        };
    }

    /**
     * @protected
     * @override
     */
    makeSearch() {
        this.searchService.loadSearchData(
            this.paramsManager.getParams()
        );
    }


    /**
     * @protected
     * @override
     */
    clearMap() {
    }


    /**
     * @return {Array<string>}
     * @private
     * @override
     */
    getUrlParamsToExclude_() {
        return URL_PARAMS_TO_EXCLUDE;
    }


    /**
     * Init listeners for search block in menu
     * @return {sm.lSearch.SearchUniversity}
     * @protected
     * @override
     */
    initSearchListeners() {
        return this;
    }


    /**
     * Init listeners for map
     * @return {sm.lSearch.SearchUniversity}
     * @protected
     * @override
     */
    initMapListeners() {
        return this;
    }


    /**
     * Init listeners for subheader
     * @return {sm.lSearch.SearchUniversity}
     * @protected
     * @override
     */
    initSubheaderListeners() {
        return this;
    }

    /**
     * Init listeners for filter panel
     * @protected
     * @return {sm.lSearch.SearchUniversity}
     */
    initLeftMenuListeners_() {
        this.initSearchListeners();
        return this;
    }

    /**
     * Make all actions to update information on page
     * @protected
     * @override
     */
    updatePage() {
        this.resetSecondarySearchParams();
        this.updateSearchParams();

        this.searchResults.setStatus(
            sm.lSearch.bSearchResults.SearchResults.Status.SEARCH_IN_PROGRESS
        );

        this.makeSearch();
        this.updateUrl();
    }


    /**
     * Init left menu instance
     * @return {sm.lSearch.SearchUniversity}
     * @protected
     * @override
     */
    initLeftMenuInstances() {
        const dom = this.getView().getDom();

        if (dom.filterPanelGroup) {
            this.filterPanelGroup = this.decorateChild(
                FilterPanelGroup.NAME,
                dom.filterPanelGroup
            );
        }

        return this;
    }


    /**
     * Init map instance
     * @return {sm.lSearch.SearchUniversity}
     * @protected
     * @override
     */
    initMap() {
        return this;
    }
}


/**
 * Register control into factory
 */
Factory.getInstance().register(SearchUniversity.NAME, {
    control: SearchUniversity,
    view: View
});


exports = SearchUniversity;
