/**
 * @fileoverview Home page which may contain search field, popular entities,
 * links to articles to mel.fm, advertisement, related links
 */
goog.provide('sm.lHome.Home');

goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iLayout.LayoutStendhal');
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
    };
    goog.inherits(sm.lHome.Home, sm.iLayout.LayoutStendhal);
    var Home = sm.lHome.Home;


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    Home.prototype.decorateInternal = function(element) {
        Home.base(this, 'decorateInternal', element);

        this.initSectionSearch_();
    };


    /**
     * Init search section instances
     * @private
     */
    Home.prototype.initSectionSearch_ = function() {
        this.searchPanel_ = this.decorateChild(
            'smSearchPanel',
            this.getView().getDom().searchPanel
        );
    };
});  // goog.scope


/**
 * creates sm.lHome.Home instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lHome.View.CssClass.ROOT
    );

    var view = new sm.lHome.View();
    var instance = new sm.lHome.Home(view);

    instance.decorate(domElement);
});
