/**
 * @fileoverview Home page which may contain search field, popular entities,
 * links to articles to mel.fm, advertisement, related links
 */
goog.provide('sm.lHome.Home');

goog.require('sm.bSmCatalog.SmCatalog');
goog.require('sm.bSmSearchPanel.SmSearchPanel');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lHome.Template');
goog.require('sm.lHome.View');


goog.scope(function() {
    var View = sm.lHome.View;
    var Analytics = sm.iAnalytics.Analytics;




    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lHome.Home = function(view, opt_domHelper) {
        sm.lHome.Home.base(this, 'constructor', view, opt_domHelper);

        /**
         * @type {sm.lHome.Home.Params}
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
         * Search Panel Instance
         * @type {sm.bSmSearchPanel.SearchPanel}
         * @private
         */
        this.searchPanel_ = null;


        /**
         * Catalog instance
         * @type {sm.bSmCatalog.SmCatalog}
         * @private
         */
        this.catalog_ = null;
    };
    goog.inherits(sm.lHome.Home, sm.iLayout.LayoutStendhal);
    var Home = sm.lHome.Home;

    /**
     * Name of this element in factory
     */
    Home.NAME = sm.lHome.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Home.NAME, {
        control: Home,
        view: View
    });

    /**
     * @param {Element} element
     * @protected
     * @override
     */
    Home.prototype.decorateInternal = function(element) {
        Home.base(this, 'decorateInternal', element);

        this.initSectionSearch_();
        this.initSectionRecommendations_();
    };


    /**
     * Init search section instances
     * @private
     */
    Home.prototype.initSectionSearch_ = function() {
        var dom = this.getView().getDom();

        this.searchPanel_ = this.decorateChild(
            sm.bSmSearchPanel.SmSearchPanel.NAME,
            dom.searchPanel
        );
    };


    /**
     * Init recommendations section instances
     * @private
     */
    Home.prototype.initSectionRecommendations_ = function() {
        var dom = this.getView().getDom();

        if (dom.catalog) {
            this.catalog_ = this.decorateChild(
                sm.bSmCatalog.SmCatalog.NAME,
                dom.catalog
            );
        }
    };
});  // goog.scope


/**
 * creates sm.lHome.Home instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lHome.View.CssClass.ROOT
    );

    sm.iCloblFactory.FactoryStendhal.getInstance().decorate(
        sm.lHome.Home.NAME,
        domElement
    );
});
