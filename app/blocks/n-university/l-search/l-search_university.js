/**
 * @fileoverview Search page with filters and results of search for
 * universities module
 */
goog.module('sm.lSearch.SearchUniversity');


const Search = goog.require('sm.lSearch.SearchUniversity');
const View = goog.require('sm.lSearch.View');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const Template = goog.require('sm.lSearch.Template');
const ILayout = goog.require('sm.iLayout.LayoutStendhal');

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
         * @type {sm.lSearch.bFilterPanel.FilterPanel}
         * @protected
         */
        this.filterPanel = null;


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
    }

    /**
     * Name of this element in factory
     * @const {string}
     */
    static get NAME() {
        return Template.NAME();
    }


    /**
     * Search params names, which exclude when built url
     * @const {Array<string>}
     */
    static get URL_PARAMS_TO_EXCLUDE() {
        return ['sortType', 'page', 'categoryId'];
    };


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
     * Make all actions to update information on page
     * @protected
     * @override
     */
    updatePage() {
        this.resetSecondarySearchParams_();
        this.updateParams_();

        this.searchResults.setStatus(
            sm.lSearch.bSearchResults.SearchResults.Status.SEARCH_IN_PROGRESS
        );

        this.makeSearch_();
        this.updateUrl_();
    }


    /**
     * Init left menu instances
     * @return {sm.lSearch.SearchUniversity}
     * @protected
     * @override
     */
    initLeftMenuInstances() {
        this.filterPanel = this.decorateChild(
            sm.lSearch.bFilterPanel.FilterPanel.NAME,
            this.getView().getDom().filterPanel
        );

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
Factory.getInstance().register({
    control: SearchUniversity,
    view: View
});


/**
 * creates sm.lSearch.SearchUniversityUniversity instance
 */
ILayout.autoInstance(SearchUniversity.NAME, View.CssClass.ROOT);

exports = SearchUniversity;
