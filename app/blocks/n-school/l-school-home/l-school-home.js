/**
 * @fileoverview SchoolHome home page control
 */
goog.provide('sm.lSchoolHome.SchoolHome');

goog.require('cl.iFactory.FactoryManager');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearchPanel.View');
goog.require('sm.bSmFooter.View');
goog.require('sm.bSmHeader.View');
goog.require('sm.bSmSideMenu.SideMenu');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCarrotquest.Carrotquest');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.iFactory.TemplateFactoryStendhal');
goog.require('sm.iMetrika.Metrika');



/**
 * SchoolHome Home component
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


    /**
     * Header instance
     * @type {sm.bSmHeader.SmHeader}
     * @private
     */
    this.header_ = null;


    /**
     * Sub header instance
     * @type {sm.bSmSubheader.SmSubheader}
     * @private
     */
    this.subHeader_ = null;


    /**
     * Side menu instance
     * @type {sm.bSmSideMenu.SideMenu}
     * @private
     */
    this.sideMenu_ = null;


    /**
     * Footer instance
     * @type {sm.bSmFooter.SmFooter}
     * @private
     */
    this.footer_ = null;


    /**
     * Current factory name
     * @type {string}
     * @private
     */
    this.factory_ = 'stendhal';
};
goog.inherits(sm.lSchoolHome.SchoolHome, goog.ui.Component);


goog.scope(function() {
    var SchoolHome = sm.lSchoolHome.SchoolHome,
        Utils = cl.iUtils.Utils;

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

        this.listenSubheader_();
        this.listenSideMenu_();
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
            .initPopularSchools_()
            .intHeader_()
            .initSubHeader_()
            .initSideMenu_()
            .initFooter_();
    };


    /**
     * Sends pageview analytics
     * @private
     */
    SchoolHome.prototype.sendAnalyticsPageview_ = function() {
        Analytics.send('pageview');
    };


    /**
     * Init side menu listeners
     * @private
     */
    SchoolHome.prototype.listenSubheader_ = function() {
        this.getHandler().listen(
            this.subHeader_,
            sm.bSmSubheader.SmSubheader.Event.HAMBURGER_MENU_CLICK,
            this.onHamburgerMenuClick_
        );
    };


    /**
     * Init side menu listeners
     * @private
     */
    SchoolHome.prototype.listenSideMenu_ = function() {
        this.getHandler().listen(
                this.sideMenu_,
                sm.bSmSideMenu.SideMenu.Event.MENU_IS_OPENED,
                this.sideMenuIsOpenedHandler_
            )
            .listen(
                this.sideMenu_,
                sm.bSmSideMenu.SideMenu.Event.MENU_IS_CLOSED,
                this.sideMenuIsClosedHandler_
            );
    };


    /**
     * Subheader hamburger icon click handler
     * @private
     */
    SchoolHome.prototype.onHamburgerMenuClick_ = function() {
        this.sideMenu_.showMenu();
    };


    /**
     * Side menu opened event handler
     * @private
     */
    SchoolHome.prototype.sideMenuIsOpenedHandler_ = function() {
        this.addOverflowHidden_();
    };


    /**
     * Side menu closed event handler
     * @private
     */
    SchoolHome.prototype.sideMenuIsClosedHandler_ = function() {
        this.removeOverflowHidden_();
    };


    /**
     * Add overflow hidden
     * @private
     */
    SchoolHome.prototype.addOverflowHidden_ = function() {
        goog.dom.classlist.add(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
        );

        goog.dom.classlist.add(
            this.getElement(),
            Utils.CssClass.OVERFLOW_HIDDEN
        );

        goog.dom.classlist.add(
            document.body,
            Utils.CssClass.OVERFLOW_HIDDEN
        );
    };


    /**
     * Remove overflow hidden
     * @private
     */
    SchoolHome.prototype.removeOverflowHidden_ = function() {
        goog.dom.classlist.remove(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
        );

        goog.dom.classlist.remove(
            this.getElement(),
            Utils.CssClass.OVERFLOW_HIDDEN
        );

        goog.dom.classlist.remove(
            document.body,
            Utils.CssClass.OVERFLOW_HIDDEN
        );
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
            factoryType: this.factory_
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
     * Init popular SchoolHome instance
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

    /**
     * Init header
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.intHeader_ = function() {
        var header = goog.dom.getElementByClass(
           sm.bSmHeader.View.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.subHeader_ = cl.iFactory.FactoryManager.getInstance().decorate(
            this.factory_,
            'smHeader',
            header,
            this
        );

        return this;
    };


    /**
     * Init sub header
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.initSubHeader_ = function() {
        var subHeader = goog.dom.getElementByClass(
            sm.bSmSubheader.SmSubheader.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.subHeader_ = cl.iFactory.FactoryManager.getInstance().decorate(
            this.factory_,
            'smSubheader',
            subHeader,
            this
        );

        return this;
    };


    /**
     * Init side menu
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.initSideMenu_ = function() {
        var sideMenu = goog.dom.getElementByClass(
            sm.bSmSideMenu.View.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.sideMenu_ = cl.iFactory.FactoryManager.getInstance().decorate(
            this.factory_,
            'smSideMenu',
            sideMenu,
            this
        );

        return this;
    };


    /**
     * Init footer
     * @return {sm.lSchoolHome.SchoolHome}
     * @private
     */
    SchoolHome.prototype.initFooter_ = function() {
        var footer = goog.dom.getElementByClass(
            sm.bSmFooter.View.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.footer_ = cl.iFactory.FactoryManager.getInstance().decorate(
            this.factory_,
            'smFooter',
            footer,
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
