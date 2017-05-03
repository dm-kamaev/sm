/**
 * @fileoverview SchoolHome home page control
 */
goog.provide('sm.lSchoolHome.SchoolHome');

goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bPopularSchools.PopularSchools');
goog.require('sm.bSearchPanel.SearchPanel');
goog.require('sm.bSmFooter.SmFooter');
goog.require('sm.bSmHeader.SmHeader');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.gAuthSocial.AuthSocialStendhal');
goog.require('sm.gAuthSocialModal.AuthSocialModalStendhal');
goog.require('sm.gButton.ButtonSocialStendhal');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.gModal.ModalSideMenu');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCloblFactory.FactoryStendhal');
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
     * @type {sm.gModal.ModalSideMenu}
     * @private
     */
    this.sideMenu_ = null;


    /**
     * Footer instance
     * @type {sm.bSmFooter.SmFooter}
     * @private
     */
    this.footer_ = null;
};
goog.inherits(sm.lSchoolHome.SchoolHome, goog.ui.Component);


goog.scope(function() {
    var SchoolHome = sm.lSchoolHome.SchoolHome,
        Utils = cl.iUtils.Utils,
        Factory = sm.iCloblFactory.FactoryStendhal.getInstance();

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
            },
            {
                factoryIndex: Factory.getIndex()
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
     * Subheader hamburger icon click handler
     * @private
     */
    SchoolHome.prototype.onHamburgerMenuClick_ = function() {
        this.sideMenu_.show();
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
            }
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

        this.searchPanel_ = Factory.decorate(
            sm.bSearchPanel.SearchPanel.NAME,
            bSearchPanel,
            null,
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

        this.popularSchools_ = Factory.decorate(
            sm.bPopularSchools.PopularSchools.NAME,
            bPopularSchools,
            null,
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

        this.subHeader_ = Factory.decorate(
            sm.bSmHeader.SmHeader.NAME,
            header,
            null,
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

        this.subHeader_ = Factory.decorate(
            sm.bSmSubheader.SmSubheader.NAME,
            subHeader,
            null,
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
            sm.gModal.ViewSideMenu.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.sideMenu_ = Factory.decorate(
            sm.gModal.ModalSideMenu.NAME,
            sideMenu,
            null,
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

        this.footer_ = Factory.decorate(
            sm.bSmFooter.SmFooter.NAME,
            footer,
            null,
            this
        );

        return this;
    };
});  // goog.scope
