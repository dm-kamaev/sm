goog.provide('sm.lSchoolHome.SchoolHome');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearchPanel.View');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCarrotquest.Carrotquest');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.iFactory.TemplateFactoryStendhal');
goog.require('sm.iMetrika.Metrika');



/**
 * School Home component
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchoolHome.SchoolHome = function() {
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
goog.inherits(sm.lSchoolHome.SchoolHome, goog.ui.Component);


goog.scope(function() {
    var SchoolHome = sm.lSchoolHome.SchoolHome,
        PopularSchools = sm.bPopularSchools.PopularSchools;

    var Analytics = sm.iAnalytics.Analytics.getInstance();


    /**
     * CSS-class enum
     * @enum {string}
     */
    SchoolHome.CssClass = {
        ROOT: 'l-school-home'
    };


    /**
     * Template-based dom element creation.
     * @public
     */
    SchoolHome.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSchoolHome.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };


    /**
     * Sets up the Component.
     */
    SchoolHome.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.sendAnalyticsPageview_();
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    SchoolHome.prototype.decorateInternal = function(element) {
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
    SchoolHome.prototype.sendAnalyticsPageview_ = function() {
        Analytics.send('pageview');
    };


    /**
     * Get data params from dom element and put it to corresponding params
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.initParams_ = function() {
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
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.initAuthorization_ = function() {
        var authorization = sm.iAuthorization.Authorization.getInstance();
        authorization.init(this.authParams_);
        return this;
    };

    /**
     * Init search panel instance
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.initSearchPanel_ = function() {
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
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.initPopularSchools_ = function() {
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
 * creates sm.lSchoolHome.SchoolHome instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lSchoolHome.SchoolHome.CssClass.ROOT
        );

    if (root) {
        var schoolHome = new sm.lSchoolHome.SchoolHome();
        schoolHome.decorate(root);
    }
});
