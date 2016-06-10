goog.provide('sm.lSearch.Search');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearchPanel.View');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.iFactory.TemplateFactoryStendhal');
goog.require('sm.iMetrika.Metrika');



/**
 * Search result component
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearch.Search = function() {
    goog.base(this);


    /**
     * Parameters
     * @private
     * @type {sm.iAuthorization.Authorization.InitParams}
     */
    this.authParams_ = {};


    /**
     * Search Panel instance
     * @type {sm.bSearchPanel.SearchPanel}
     * @private
     */
    this.searchPanel_ = null;


    /**
     * instance popular Schools
     * @type {sm.bPopularSchools.PopularSchools}
     * @private
     */
    this.popularSchools_ = null;
};
goog.inherits(sm.lSearch.Search, goog.ui.Component);


goog.scope(function() {
    var Search = sm.lSearch.Search,
        PopularSchools = sm.bPopularSchools.PopularSchools;

    var Analytics = sm.iAnalytics.Analytics.getInstance();


    /**
     * CSS-class enum
     * @enum {string}
     */
    Search.CssClass = {
        ROOT: 'l-search'
    };


    /**
     * Template-based dom element creation.
     * @public
     */
    Search.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearch.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };


    /**
     * Sets up the Component.
     */
    Search.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.sendAnalyticsPageview_();
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Search.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initParams_()
            .initAuthorization_()
            .initSearchPanel_()
            .initPopularSchools_();
    };


    /**
     * Sends pageview analytics
     * @private
     */
    Search.prototype.sendAnalyticsPageview_ = function() {
        Analytics.send('pageview');
    };


    /**
     * Get data params from dom element and put it to corresponding params
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initParams_ = function() {
        var dataParams = JSON.parse(
            goog.dom.dataset.get(this.getElement(), 'params')
        );

        this.authParams_ = {
            isUserAuthorized: dataParams['isUserAuthorized'],
            authSocialLinks: {
                fb: dataParams['authSocialLinks']['fb'],
                vk: dataParams['authSocialLinks']['vk']
            },
            factoryType: 'stendhal'
        };

        return this;
    };


    /**
     * Init authorization
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initAuthorization_ = function() {
        var authorization = sm.iAuthorization.Authorization.getInstance();
        authorization.init(this.authParams_);
        return this;
    };

    /**
     * Init search panel instance
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initSearchPanel_ = function() {
        var bSearchPanel = goog.dom.getElementByClass(
            sm.bSearchPanel.View.CssClass.ROOT,
            this.getElement()
        );

        this.searchPanel_ =
            sm.iFactory.FactoryStendhal.getInstance().decorate(
                'search-panel',
                bSearchPanel,
                this
            );

        return this;
    };


    /**
     * Init popular school instance
     * @return {sm.lSearch.Search}
     * @private
     */
    Search.prototype.initPopularSchools_ = function() {
        var bPopularSchools = goog.dom.getElementByClass(
            sm.bPopularSchools.View.CssClass.ROOT,
            this.getElement()
        );

        this.popularSchools_ =
            sm.iFactory.FactoryStendhal.getInstance().decorate(
                'popular-schools',
                bPopularSchools,
                this
            );

        return this;
    };
});  // goog.scope


/**
 * creates sm.lSearch.Search instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lSearch.Search.CssClass.ROOT
        );

    if (root) {
        var search = new sm.lSearch.Search();
        search.decorate(root);
    }
});
